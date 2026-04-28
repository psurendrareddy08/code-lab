param()
Set-StrictMode -Off

$newBase     = 'D:\train\Training\Training'
$explorerDir = 'D:\train\Training\explorer'

function ReadCodeJson([string]$path) {
    if (Test-Path $path) {
        $raw = [System.IO.File]::ReadAllText($path, [System.Text.Encoding]::UTF8)
        return ($raw | ConvertTo-Json -Compress)
    }
    return '""'
}

function FE([string]$name, [string]$lang, [string]$path) {
    $code = ReadCodeJson $path
    return "      { name: `"$name`", lang: `"$lang`", content: $code }"
}

function ME([string]$id,[string]$title,[string]$desc,[string[]]$topics,[string]$diff,[string]$folder,[string]$preview,[string[]]$fileLines) {
    $topicsJson = '["' + ($topics -join '","') + '"]'
    $filesBlock = $fileLines -join (",`n")
    $out = "  {`n    id: `"$id`", title: `"$title`",`n    description: `"$desc`",`n    topics: $topicsJson, difficulty: `"$diff`",`n    folder: `"$folder`", previewFile: `"$preview`",`n    files: [`n$filesBlock`n    ]`n  }"
    return $out
}

$entries = [System.Collections.ArrayList]@()

[void]$entries.Add((ME '01_calculator' 'Calculator' 'Interactive calculator with arithmetic operations using DOM events and eval()' @('DOM','Events','Functions') 'Beginner' '01_calculator' 'calculator.html' @(
    (FE 'calculator.html' 'html'       "$newBase\01_calculator\calculator.html"),
    (FE 'calculator.js'   'javascript' "$newBase\01_calculator\calculator.js"),
    (FE 'calculator.css'  'css'        "$newBase\01_calculator\calculator.css")
)))

[void]$entries.Add((ME '02_number_guessing_game' 'Number Guessing Game' 'Guess a number 1-10 with 5 attempts. Prize decreases per wrong guess' @('DOM','Events','Game Logic','Math.random') 'Beginner' '02_number_guessing_game' 'game.html' @(
    (FE 'game.html' 'html'       "$newBase\02_number_guessing_game\game.html"),
    (FE 'game.js'   'javascript' "$newBase\02_number_guessing_game\game.js"),
    (FE 'game.css'  'css'        "$newBase\02_number_guessing_game\game.css")
)))

[void]$entries.Add((ME '03_word_sorter' 'Word Sorter' 'Sort words alphabetically using split, sort and join' @('Arrays','String Methods','DOM') 'Beginner' '03_word_sorter' 'word-sorter.html' @(
    (FE 'word-sorter.html' 'html'       "$newBase\03_word_sorter\word-sorter.html"),
    (FE 'word-sorter.js'   'javascript' "$newBase\03_word_sorter\word-sorter.js")
)))

[void]$entries.Add((ME '04_array_filtering' 'Array Filtering by Property' 'Filter person objects to display only Telugu speakers using a for loop' @('Arrays','Objects','Loops','Conditionals') 'Beginner' '04_array_filtering' 'array-filter.html' @(
    (FE 'array-filter.html' 'html' "$newBase\04_array_filtering\array-filter.html")
)))

[void]$entries.Add((ME '05_birthday_calendar' 'Birthday Calendar' 'Personalized messages based on date using Date API and find()' @('Date API','Arrays','DOM','find()') 'Intermediate' '05_birthday_calendar' 'birthday-calendar.html' @(
    (FE 'birthday-calendar.html' 'html'       "$newBase\05_birthday_calendar\birthday-calendar.html"),
    (FE 'birthday-calendar.js'   'javascript' "$newBase\05_birthday_calendar\birthday-calendar.js")
)))

[void]$entries.Add((ME '06_dynamic_table' 'Dynamic Table Generator' 'Generate HTML table from array of objects using DOM createElement' @('DOM Manipulation','Arrays','Objects','Bootstrap') 'Intermediate' '06_dynamic_table' 'dynamic-table.html' @(
    (FE 'dynamic-table.html' 'html' "$newBase\06_dynamic_table\dynamic-table.html")
)))

[void]$entries.Add((ME '07_dom_manipulation' 'DOM Manipulation' 'Change title style, add paragraphs, remove image from DOM' @('DOM Manipulation','Events','createElement','removeElement') 'Beginner' '07_dom_manipulation' 'dom-manipulation.html' @(
    (FE 'dom-manipulation.html' 'html' "$newBase\07_dom_manipulation\dom-manipulation.html")
)))

[void]$entries.Add((ME '08_dom_playground' 'DOM Playground' 'Live text styling - change color, font, background, export as PNG via html2canvas' @('DOM','Events','Canvas API','html2canvas') 'Intermediate' '08_dom_playground' 'dom-playground.html' @(
    (FE 'dom-playground.html' 'html' "$newBase\08_dom_playground\dom-playground.html")
)))

[void]$entries.Add((ME '09_array_rendering' 'Array Rendering to DOM' 'Render supercars array as a dynamic list using map and innerHTML' @('Arrays','DOM','Template Literals','map()') 'Beginner' '09_array_rendering' 'array-rendering.html' @(
    (FE 'array-rendering.html' 'html' "$newBase\09_array_rendering\array-rendering.html")
)))

[void]$entries.Add((ME '10_mean_median_calculator' 'Mean and Median Calculator' 'Enter 5 numbers and calculate mean and median using reduce and sort' @('Arrays','Math','reduce()','sort()','Statistics') 'Intermediate' '10_mean_median_calculator' 'mean-median.html' @(
    (FE 'mean-median.html' 'html' "$newBase\10_mean_median_calculator\mean-median.html")
)))

[void]$entries.Add((ME '11_array_max_min' 'Array Max Min Age Finder' 'Find oldest and youngest person using Math.max, Math.min, spread and find()' @('Arrays','Math.max','Math.min','find()','Spread Operator') 'Beginner' '11_array_max_min' 'array-max-min.html' @(
    (FE 'array-max-min.html' 'html' "$newBase\11_array_max_min\array-max-min.html")
)))

[void]$entries.Add((ME '12_student_performance' 'Student Performance Report' 'Calculate averages with reduce, classify with filter, render table to DOM' @('Arrays','map()','filter()','reduce()','DOM') 'Intermediate' '12_student_performance' 'student-performance.html' @(
    (FE 'student-performance.html' 'html' "$newBase\12_student_performance\student-performance.html")
)))

[void]$entries.Add((ME '13_student_form' 'Student Info Form to JSON' 'Form with checkboxes that outputs data as formatted JSON with clipboard copy' @('Forms','DOM','JSON','Events','Checkboxes') 'Intermediate' '13_student_form' 'student-form.html' @(
    (FE 'student-form.html' 'html' "$newBase\13_student_form\student-form.html")
)))

$concepts = [System.Collections.ArrayList]@()

[void]$concepts.Add((ME 'concept_var_let_const' 'var vs let vs const' '7 tests covering scope, hoisting, redeclaration, TDZ and global object differences' @('var','let','const','Scope','Hoisting','TDZ') 'Intermediate' 'concepts/01_var_let_const' 'var-let-const.html' @(
    (FE 'var-let-const.html' 'html' "$newBase\concepts\01_var_let_const\var-let-const.html")
)))

[void]$concepts.Add((ME 'concept_functions' 'Functions and Callbacks' 'Examples of regular functions, arrow functions, callbacks, setTimeout and Map' @('Functions','Arrow Functions','Callbacks','Map','setTimeout') 'Beginner' 'concepts/02_functions_callbacks' 'functions-callbacks.html' @(
    (FE 'functions-callbacks.html' 'html' "$newBase\concepts\02_functions_callbacks\functions-callbacks.html")
)))

[void]$concepts.Add((ME 'concept_call_stack' 'Call Stack Demo' 'Visual demo of JavaScript call stack and nested function execution order' @('Call Stack','Function Execution','Execution Context') 'Beginner' 'concepts/03_call_stack' 'call-stack.html' @(
    (FE 'call-stack.html' 'html' "$newBase\concepts\03_call_stack\call-stack.html")
)))

$sep = ",`n"
$out  = "const PROJECTS = [`n"
$out += ($entries.ToArray() -join $sep)
$out += "`n];`n`nconst CONCEPTS = [`n"
$out += ($concepts.ToArray() -join $sep)
$out += "`n];`n"

[System.IO.File]::WriteAllText("$explorerDir\data.js", $out, [System.Text.Encoding]::UTF8)
$sz = [System.IO.FileInfo]::new("$explorerDir\data.js").Length
Write-Host "SUCCESS - data.js written ($sz bytes)" -ForegroundColor Green
