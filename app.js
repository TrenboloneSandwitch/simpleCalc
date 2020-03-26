let buffer = "",
  firstNumber = 0,
  secondNumber = 0,
  operator;

const buttons = document.querySelectorAll(".btn");
const screen = document.querySelector(".screen");

const resetProps = () => {
  buffer = "";
  firstNumber = 0;
  secondNumber = 0;
  screen.innerText = "0";
};

const evalution = (f, s, op) => {
  let res;
  switch (op) {
    case "+":
      res = f + s;
      break;
    case "x":
      res = f * s;
      break;
    case "/":
      res = f / s;
      break;
    case "-":
      res = f - s;
      break;
  }
  return res;
};

const buttonClicked = e => {
  const tar = e.target;
  const val = tar.innerText;

  if (!isNaN(parseInt(val))) {
    buffer += val;
    screen.innerText = buffer;
  } else if (
    tar.classList.contains("orange") &&
    val !== "=" &&
    firstNumber === 0 &&
    buffer !== ""
  ) {
    operator = val;
    firstNumber = parseInt(buffer);
    buffer = "";
  } else if (
    tar.classList.contains("orange") &&
    val !== "=" &&
    firstNumber !== 0
  ) {
    operator = val;
  } else if (tar.classList.contains("orange") && val === "=" && buffer !== "") {
    secondNumber = parseInt(buffer);
    buffer = "";
    let res = evalution(firstNumber, secondNumber, operator);
    resetProps();
    firstNumber = res;
    screen.innerText = res;
  } else if (val === "del" && buffer !== "" && buffer !== 0) {
    buffer = buffer.slice(0, -1);
    if (buffer === "") buffer = 0;
    screen.innerText = buffer;
  } else if (val === "AC") {
    resetProps();
  }
};

buttons.forEach(btn => {
  btn.addEventListener("click", buttonClicked);
});
