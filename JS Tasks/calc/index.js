let nums = document.querySelectorAll(".keypad .nums button");

let ops = document.querySelectorAll(".keypad .operators button");
let specialops = document.querySelectorAll(".special-ops button");

let eq = document.getElementById("opeq");
let output = document.getElementById("output")
let clear = document.getElementById("clear");

let firstnum = document.getElementById("firstnum");
let secondnum = document.getElementById("secondnum");
let opdisplay = document.getElementById("input-op");

function mapNums(textfield) {
    nums.forEach(key => {
        key.onclick = () => {
            const val = key.getAttribute("data-val");
            if (val)
                textfield.value += val;
            key.blur();
        }
    });
}

function mapOps() {
    ops.forEach(key => {
        key.onclick = () => {
            const op = key.getAttribute("data-op");

            if (!(key.textContent == "=")) {
                if (firstnum.style.display == "none")
                    firstnum.style.display = "block";
                opdisplay.textContent = op;
            }
            mapNums(secondnum);
            key.blur();
        }
    });
}

function mapNumKeys(event) {
    let key = document.querySelector(`button[data-val="${event.key}"`);
    if (key) {
        key.click();
    }
}

function mapOpKeys(event) {
    let key = document.querySelector(`button[data-op="${event.key}"`);
    if (key) {
        key.click();
    }
}

function mapEqKey(event) {
    if (event.key == "=" || event.key == "Enter")
        eq.click();
}

function mapClearKey(event) {
    if (event.key == "c" || event.key == "C") {
        clear.click();
    }
}

function mapBtntoKeypad() {
    document.addEventListener('keyup', mapNumKeys);
    document.addEventListener('keyup', mapOpKeys);
    document.addEventListener('keyup', mapEqKey);
    document.addEventListener('keyup', mapClearKey);
}

function unmapBtns() {
    document.removeEventListener('keyup', mapNumKeys);
    document.removeEventListener('keyup', mapOpKeys);
    document.removeEventListener('keyup', mapClearKey);
}

function mapOnFocus() {
    firstnum.addEventListener("focus", () => {
        mapNums(firstnum)
        unmapBtns();
    });

    firstnum.addEventListener("blur", () => {
        mapBtntoKeypad();
    });

    secondnum.addEventListener("focus", () => {
        mapNums(secondnum);
        unmapBtns();
    })

    secondnum.addEventListener("blur", () => {
        mapBtntoKeypad();
    });
}

function performCalc(num1, num2, op) {
    let a = parseFloat(num1) || 0
    let b = parseFloat(num2) || 0;
    if (isNaN(a) || isNaN(b))
        return "Invalid Inputs";
    switch (op) {
        case '+':
            return a + b;
        case '-':
            return a - b;
        case '*':
            return a * b;
        case '/':
            return a / b;
        case '^':
            return Math.pow(a, b);
        case 'sin':
            return Math.sin(b);
        case 'cos':
            return Math.cos(b);
        case 'tan':
            return Math.tan(b);
        case 'sqrt':
            return Math.sqrt(b);
        case 'log':
            return Math.log(b);
        case 'log10':
            return Math.log10(b);
        default:
            console.log(op);
            return "Invalid Operator";
    }
}

function specialOpTrigger() {
    specialops.forEach(op => {
        op.onclick = () => {
            opdisplay.textContent = op.getAttribute("data-op");
            firstnum.style.display = "none";
            mapNums(secondnum);
            op.blur();
        }
    });
}

document.addEventListener("DOMContentLoaded", () => {


    clear.addEventListener("click", () => {
        firstnum.style.display = "block";
        firstnum.value = "";
        secondnum.value = "";
        opdisplay.textContent = "?";
        output.textContent = "";
        mapNums(firstnum);
    })

    eq.addEventListener("click", () => {
        console.log(opdisplay.textContent);
        output.textContent = performCalc(firstnum.value, secondnum.value, opdisplay.textContent);
        mapNums(firstnum);
    });

    mapNums(firstnum);
    mapOps();
    mapBtntoKeypad();
    mapOnFocus();
    specialOpTrigger();

});