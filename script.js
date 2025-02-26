const input = document.getElementById("user-input");
const submit = document.getElementById("purchase-btn");
const buttons = document.querySelectorAll(".btns button");
const priceBackground = document.getElementById("priceBackground");
const regStatus = document.getElementById("regStatus");

let price = 0;
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

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const number = button.textContent;
    strPrice = "" + price;
    if (number === "✓") {
      calculate();
    } else if (number === "✗") {
      strPrice = "0";
    } else if (number === "←") {
      strPrice = strPrice.slice(0, -1);
    } else if (number === ".") {
      if (!strPrice.includes(".")) {
        strPrice += ".";
      }
    } else if (!isNaN(number)) {
      if (strPrice === "0") {
        strPrice = number;
      } else if (strPrice.length < 8) {
        strPrice += number;
      } else {
        alert("The price cannot be higher");
      }
    }
    if (strPrice === "") {
      strPrice = "0";
    }
    priceBackground.textContent = `Total: $${strPrice}`;
    price = parseFloat(strPrice);
  });
});

const calculate = () => {
  const intCash = parseInt(input.value);
  const intPrice = parseInt(strPrice);
  if (intCash < intPrice) {
    alert("Customer does not have enough money to purchase the item");
  }
};

submit.addEventListener("click", calculate);
