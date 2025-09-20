let display = document.getElementById("display");

function appendValue(value) {
  display.value += value;
}

function clearDisplay() {
  display.value = "";
}

function deleteLast() {
  display.value = display.value.slice(0, -1);
}

function calculateResult() {
  try {
    let expr = display.value;

    // Replace symbols with JS equivalents
    expr = expr.replace(/π/g, "Math.PI");
    expr = expr.replace(/e/g, "Math.E");
    expr = expr.replace(/√\(/g, "Math.sqrt(");
    expr = expr.replace(/\^/g, "**");

    // Replace functions with degree-based versions
    expr = expr.replace(/sin\(/g, "sinDeg(");
    expr = expr.replace(/cos\(/g, "cosDeg(");
    expr = expr.replace(/tan\(/g, "tanDeg(");
    expr = expr.replace(/log\(/g, "log10(");

    // Define safe math functions
    function sinDeg(x) { return Math.sin(x * Math.PI / 180); }
    function cosDeg(x) { return Math.cos(x * Math.PI / 180); }
    function tanDeg(x) { return Math.tan(x * Math.PI / 180); }
    function log10(x) { return Math.log10(x); }

    // Evaluate the expression
    display.value = eval(expr);
  } catch (error) {
    display.value = "Error";
  }
}

// --- Keyboard Support ---
document.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    calculateResult();
  } else if (event.key === "Backspace") {
    deleteLast();
  }
});
