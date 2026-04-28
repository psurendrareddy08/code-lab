/* ── State ──────────────────────────────────────────────────────── */
let activeSection     = 'projects';
let activeTopicFilter = 'all';
let activeDiffFilter  = null;
let searchQuery       = '';
let currentProject    = null;
let currentFileIdx    = 0;
let currentTab        = 'code';

// Base path for live preview iframes.
// Locally (python server from D:\train\Training): files are at ../Training/
// On Vercel (cp -r Training explorer/Training at build): files are at Training/
const TRAINING_PATH = (function() {
  const host = window.location.hostname;
  // If served from localhost or 127.0.0.1, use the local relative path
  if (host === 'localhost' || host === '127.0.0.1') return '../Training/';
  // On Vercel or any remote host, Training is copied into explorer/
  return 'Training/';
})();

/* ── Init ────────────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  renderProjectCards();
  renderConceptCards();
  setupKeyboard();
});

/* ── Keyboard shortcut ───────────────────────────────────────────── */
function setupKeyboard() {
  document.addEventListener('keydown', e => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      document.getElementById('searchInput').focus();
    }
    if (e.key === 'Escape') {
      const input = document.getElementById('searchInput');
      if (document.activeElement === input) { input.blur(); return; }
      closeDrawer();
    }
  });
}

/* ── Section Switching ───────────────────────────────────────────── */
function showSection(name, linkEl) {
  activeSection = name;

  // Update nav links
  document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
  if (linkEl) linkEl.classList.add('active');

  // Switch sections
  document.querySelectorAll('.content-section').forEach(s => s.classList.remove('active'));
  const sec = document.getElementById('section-' + name);
  if (sec) sec.classList.add('active');

  closeDrawer();
  return false;
}

/* ── Render Cards ────────────────────────────────────────────────── */
function renderProjectCards() {
  const grid = document.getElementById('cardsGrid');
  grid.innerHTML = '';

  const filtered = getFilteredProjects();

  document.getElementById('noResults').style.display = filtered.length === 0 ? 'flex' : 'none';
  document.getElementById('count-all').textContent = PROJECTS.length;

  filtered.forEach((p, i) => {
    grid.appendChild(createCard(p, i));
  });
}

function renderConceptCards() {
  const grid = document.getElementById('conceptsGrid');
  grid.innerHTML = '';
  CONCEPTS.forEach((c, i) => {
    grid.appendChild(createCard(c, i, true));
  });
}

function createCard(project, idx, isConcept = false) {
  const colors = ['#58a6ff','#3fb950','#ffa657','#d2a8ff','#ff7b72','#79c0ff','#56d364','#f0883e'];
  const color  = colors[idx % colors.length];

  const card = document.createElement('div');
  card.className = isConcept ? 'concept-card' : 'project-card';
  card.style.setProperty('--card-color', color);
  card.onclick = () => openDrawer(project);

  const files = project.files || [];
  const fileTypes = [...new Set(files.map(f => f.lang || f.name.split('.').pop()))];

  card.innerHTML = `
    <div class="card-header">
      <span class="card-id">${project.folder}</span>
      <span class="card-diff">
        <span class="diff-pill ${(project.difficulty||'').toLowerCase()}">${project.difficulty || ''}</span>
      </span>
    </div>
    <div class="card-title">${project.title}</div>
    <div class="card-desc">${project.description}</div>
    <div class="card-topics">
      ${(project.topics || []).slice(0, 4).map(t => `<span class="tag">${t}</span>`).join('')}
    </div>
    <div class="card-footer">
      <div class="card-files">
        ${fileTypes.map(t => `<span class="file-badge ${t}">${t}</span>`).join('')}
      </div>
      <span class="card-arrow">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="5" y1="12" x2="19" y2="12"></line>
          <polyline points="12 5 19 12 12 19"></polyline>
        </svg>
      </span>
    </div>`;

  return card;
}

/* ── Filtering ───────────────────────────────────────────────────── */
function getFilteredProjects() {
  return PROJECTS.filter(p => {
    const matchTopic = activeTopicFilter === 'all' ||
      (p.topics || []).some(t => t.toLowerCase().includes(activeTopicFilter.toLowerCase()));
    const matchDiff  = !activeDiffFilter || p.difficulty === activeDiffFilter;
    const matchSearch = !searchQuery ||
      p.title.toLowerCase().includes(searchQuery) ||
      p.description.toLowerCase().includes(searchQuery) ||
      (p.topics || []).some(t => t.toLowerCase().includes(searchQuery)) ||
      (p.files || []).some(f => f.name.toLowerCase().includes(searchQuery));
    return matchTopic && matchDiff && matchSearch;
  });
}

function filterByTopic(topic, el) {
  activeTopicFilter = topic;
  document.querySelectorAll('#topicList .topic-item').forEach(i => i.classList.remove('active'));
  if (el) el.classList.add('active');

  const bar = document.getElementById('filterBar');
  if (topic !== 'all') {
    bar.style.display = 'flex';
    document.getElementById('activeFilterChip').textContent = topic;
  } else {
    bar.style.display = 'none';
  }
  renderProjectCards();
}

function filterByDiff(diff, el) {
  if (activeDiffFilter === diff) {
    activeDiffFilter = null;
    document.querySelectorAll('#diffList .topic-item').forEach(i => i.classList.remove('active'));
  } else {
    activeDiffFilter = diff;
    document.querySelectorAll('#diffList .topic-item').forEach(i => i.classList.remove('active'));
    if (el) el.classList.add('active');
  }
  renderProjectCards();
}

function clearFilters() {
  activeTopicFilter = 'all';
  activeDiffFilter  = null;
  searchQuery       = '';
  document.getElementById('searchInput').value = '';
  document.getElementById('filterBar').style.display = 'none';
  document.querySelectorAll('.topic-item').forEach(i => i.classList.remove('active'));
  document.querySelector('[data-topic="all"]').classList.add('active');
  document.querySelectorAll('#diffList .topic-item').forEach(i => i.classList.remove('active'));
  renderProjectCards();
}

function handleSearch(val) {
  searchQuery = val.toLowerCase().trim();
  if (activeSection === 'projects') renderProjectCards();
}

/* ── Drawer ──────────────────────────────────────────────────────── */
function openDrawer(project) {
  currentProject  = project;
  currentFileIdx  = 0;
  currentTab      = 'code';

  document.getElementById('drawerTitle').textContent   = project.title;
  document.getElementById('drawerSubtitle').textContent = project.folder;

  buildFileTabs(project.files);
  switchDrawerTab('code');
  renderCodeForFile(0);

  document.getElementById('codeDrawer').classList.add('open');
  document.getElementById('drawerOverlay').classList.add('open');
  document.getElementById('mainContent').classList.add('drawer-open');
}

function closeDrawer() {
  document.getElementById('codeDrawer').classList.remove('open');
  document.getElementById('drawerOverlay').classList.remove('open');
  document.getElementById('mainContent').classList.remove('drawer-open');
  // Clear iframe to stop any loading
  document.getElementById('previewFrame').src = '';
}

function buildFileTabs(files) {
  const container = document.getElementById('fileTabs');
  container.innerHTML = '';
  files.forEach((f, i) => {
    const btn = document.createElement('button');
    btn.className = 'file-tab' + (i === 0 ? ' active' : '');
    const ext = f.name.split('.').pop();
    btn.innerHTML = `<span class="file-badge ${ext}" style="font-size:9px;padding:1px 4px;">${ext}</span> ${f.name}`;
    btn.onclick = () => selectFileTab(i);
    container.appendChild(btn);
  });
}

function selectFileTab(idx) {
  currentFileIdx = idx;
  document.querySelectorAll('.file-tab').forEach((t, i) => {
    t.classList.toggle('active', i === idx);
  });
  renderCodeForFile(idx);
  if (currentTab === 'preview') {
    loadPreview();
  }
}

function renderCodeForFile(idx) {
  const file = currentProject.files[idx];
  if (!file) return;

  const codeEl = document.getElementById('codeContent');
  const raw    = file.content || '';

  // Set language class for Prism
  const langMap = { html: 'language-html', js: 'language-javascript', javascript: 'language-javascript', css: 'language-css' };
  const lang = langMap[file.lang || file.name.split('.').pop()] || 'language-html';

  codeEl.className = lang;
  codeEl.textContent = raw;

  if (typeof Prism !== 'undefined') {
    Prism.highlightElement(codeEl);
  }
}

/* ── Drawer tabs (Code / Preview) ────────────────────────────────── */
function switchDrawerTab(tab) {
  currentTab = tab;

  document.getElementById('tabCode').classList.toggle('active', tab === 'code');
  document.getElementById('tabPreview').classList.toggle('active', tab === 'preview');

  const codeView    = document.getElementById('drawerCode');
  const previewView = document.getElementById('drawerPreview');

  if (tab === 'code') {
    codeView.style.display    = '';
    previewView.style.display = 'none';
    renderCodeForFile(currentFileIdx);
  } else {
    codeView.style.display    = 'none';
    previewView.style.display = '';
    loadPreview();
  }
}

function loadPreview() {
  if (!currentProject) return;
  const frame = document.getElementById('previewFrame');
  // Find the preview file (first HTML file or the specified previewFile)
  const previewFileName = currentProject.previewFile ||
    (currentProject.files.find(f => f.name.endsWith('.html')) || {}).name;

  if (previewFileName) {
    // Build file:// path relative to Training folder
    const absPath = TRAINING_PATH + currentProject.folder + '/' + previewFileName;
    frame.src = absPath;
  } else {
    frame.srcdoc = '<p style="padding:20px;color:#888">No HTML preview available</p>';
  }
}

/* ── Copy Code ───────────────────────────────────────────────────── */
function copyCurrentCode() {
  if (!currentProject) return;
  const raw = currentProject.files[currentFileIdx]?.content || '';
  navigator.clipboard.writeText(raw).then(() => {
    const btn = document.getElementById('copyBtn');
    btn.classList.add('copied');
    btn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg> Copied!`;
    setTimeout(() => {
      btn.classList.remove('copied');
      btn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg> Copy`;
    }, 2000);
  });
}

/* ── Portfolio ───────────────────────────────────────────────────── */
function openPortfolioPreview() {
  const wrap  = document.getElementById('portfolioIframe');
  const frame = document.getElementById('portfolioFrame');
  wrap.style.display = 'block';
  frame.src = TRAINING_PATH + 'portifolio/index.html';
  wrap.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function closePortfolioPreview() {
  document.getElementById('portfolioIframe').style.display = 'none';
  document.getElementById('portfolioFrame').src = '';
}
