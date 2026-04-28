# Code Lab — JavaScript Training Explorer

A futuristic VS Code + GitHub-style code explorer for JavaScript training practice projects.

## 🚀 Live Explorer

Open `explorer/index.html` in your browser, or serve locally:

```bash
python -m http.server 7891 --directory .
```

Then visit: **http://localhost:7891/explorer/**

## 📁 Structure

```
Training/
├── explorer/               ← The web app
│   ├── index.html
│   ├── style.css
│   ├── script.js
│   └── data.js             ← All project code embedded
│
└── Training/               ← Reorganized source files
    ├── 01_calculator/
    ├── 02_number_guessing_game/
    ├── 03_word_sorter/
    ├── 04_array_filtering/
    ├── 05_birthday_calendar/
    ├── 06_dynamic_table/
    ├── 07_dom_manipulation/
    ├── 08_dom_playground/
    ├── 09_array_rendering/
    ├── 10_mean_median_calculator/
    ├── 11_array_max_min/
    ├── 12_student_performance/
    ├── 13_student_form/
    ├── concepts/
    │   ├── 01_var_let_const/
    │   ├── 02_functions_callbacks/
    │   └── 03_call_stack/
    └── portifolio/
```

## ✨ Features

- 🔍 **Search** — Filter by title, topic, file name (Ctrl+K)
- 🏷️ **Topic Filters** — DOM, Arrays, Forms, Events, Date API, Game Logic
- 📂 **Code Viewer** — Syntax highlighted with Prism.js, file tabs
- 👁️ **Live Preview** — Embedded iframe preview for each project
- 📚 **Concepts Section** — JS fundamentals (scope, functions, call stack)
- 🌟 **Portfolio Section** — Full portfolio website preview

## 🛠️ Topics Covered

`DOM Manipulation` `Arrays` `String Methods` `Objects` `Loops` `Events` `Date API` `Game Logic` `Forms` `JSON` `map/filter/reduce` `Scope & Hoisting` `Callbacks` `Call Stack`
