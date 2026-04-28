// Initialize Lucide Icons
lucide.createIcons();

// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.getElementById('main-navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ===== SMOOTH SCROLLING =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 75,
                behavior: 'smooth'
            });
        }
        // Close mobile nav if open
        const navCollapse = document.getElementById('navbarNav');
        if (navCollapse.classList.contains('show')) {
            const bsCollapse = bootstrap.Collapse.getInstance(navCollapse);
            if (bsCollapse) bsCollapse.hide();
        }
    });
});

// ===== SCROLL REVEAL =====
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // Stagger delay based on position among siblings
            const siblings = Array.from(entry.target.parentElement.querySelectorAll('.reveal'));
            const i = siblings.indexOf(entry.target);
            entry.target.style.transitionDelay = `${i * 80}ms`;
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.05 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ===== SKILL BAR ANIMATION =====
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.querySelectorAll('.skill-fill').forEach(bar => {
                const targetWidth = bar.getAttribute('data-width');
                setTimeout(() => {
                    bar.style.width = targetWidth + '%';
                }, 200);
            });
            skillObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

document.querySelectorAll('.skill-item').forEach(el => skillObserver.observe(el.closest('.glass-card') || el));
// Also trigger on section
const skillSection = document.getElementById('skills');
if (skillSection) skillObserver.observe(skillSection);

// ===== ACTIVE NAV LINK ON SCROLL =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
            link.style.color = '#f1f5f9';
        } else {
            link.style.color = '';
        }
    });
});

// ===== CONTACT FORM =====
const contactForm = document.getElementById('contact-form');
const submitBtn   = document.getElementById('submit-btn');
const btnText     = document.getElementById('btn-text');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        btnText.textContent = 'Sending…';
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.8';

        setTimeout(() => {
            btnText.textContent = 'Message Sent!';
            submitBtn.style.background = 'linear-gradient(135deg, #16a34a, #22c55e)';
            submitBtn.style.opacity = '1';
            contactForm.reset();

            // Reinit lucide icons (send icon may be removed on reset)
            lucide.createIcons();

            setTimeout(() => {
                btnText.textContent = 'Send Message';
                submitBtn.style.background = '';
                submitBtn.disabled = false;
            }, 3000);
        }, 1600);
    });
}
