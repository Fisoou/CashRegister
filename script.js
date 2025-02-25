const input = document.getElementById("user-input");
const submit = document.getElementById("purchase-btn");
const buttons = document.querySelectorAll(".buttons button");
const priceBackground = document.getElementById("priceBackground");

let price = 1.87;
const cash = 0;
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
    if (!isNaN(number)) {
      console.log(number);
      input.value += number;
    } else if (number === "✓") {
      calculate();
    } else if (number === "✗") {
      input.value = "";
    }
  });
});

window.addEventListener("load", () => {
  console.log("loaded");
  priceBackground.textContent = `Total $${price}`;
});

const calculate = () => {
  if (cash < price) {
    alert("Customer does not have enough money to purchase the item");
  }
};
