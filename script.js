const input = document.getElementById("user-input");
const submit = document.getElementById("purchase-btn");
const buttons = document.querySelectorAll(".btns button");
const priceBackground = document.getElementById("priceBackground");
const regStatus = document.getElementById("regStatus");

let price = "0";
let cash = 0;
let cid = [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100],
];

input.value = cash;

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const number = button.textContent;
    if (number === "✓") {
      calculate();
    } else if (number === "✗") {
      price = "0";
    } else if (number === "←") {
      price = price.slice(0, -1);
    }

    if (price === "") {
      price = "0";
    }

    if (price.length <= 8 && !isNaN(number)) {
      if (price === "0") {
        price = "";
      }
      price += number;
    } else if (number === ".") {
      price += ".";
    } else if (price.length >= 8) {
      alert("The price cannot be higher");
    }

    priceBackground.textContent = `Total $${price}`;
  });
});

const calculate = () => {
  if (cash < parseInt(price)) {
    alert("Customer does not have enough money to purchase the item");
  } else if (cash === parseInt(price)) {
    regStatus.style.display = "block";
    regStatus.textContent = "Status: CLOSED";
  }
};

submit.addEventListener("click", calculate);
