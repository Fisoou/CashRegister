const input = document.getElementById("cash");
const submit = document.getElementById("purchase-btn");
const buttons = document.querySelectorAll(".btns button");
const priceBackground = document.getElementById("priceBackground");
const regStatus = document.getElementById("change-due");
const money = document.getElementById("money");

let price = 0;
let cash = 0;
let strPrice = "0";

let cid = [
  ["PENNY", 0.5],
  ["NICKEL", 0],
  ["DIME", 0],
  ["QUARTER", 0],
  ["ONE", 0],
  ["FIVE", 0],
  ["TEN", 0],
  ["TWENTY", 0],
  ["ONE HUNDRED", 0],
];

const currencyUnit = {
  PENNY: 0.01,
  NICKEL: 0.05,
  DIME: 0.1,
  QUARTER: 0.25,
  ONE: 1,
  FIVE: 5,
  TEN: 10,
  TWENTY: 20,
  "ONE HUNDRED": 100,
};

// Кнопки для изменения цены
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const number = button.textContent;
    if (number === "✓") {
      check();
    } else if (number === "✗") {
      strPrice = "0";
    } else if (number === "←") {
      strPrice = strPrice.slice(0, -1);
      if (strPrice === "") strPrice = "0";
    } else if (number === ".") {
      if (!strPrice.includes(".")) {
        strPrice += ".";
      }
    } else if (!isNaN(number)) {
      if (strPrice === "0") {
        strPrice = number;
      } else if (strPrice.endsWith(".")) {
        strPrice += number;
      } else if (strPrice.length < 8) {
        strPrice += number;
      } else {
        alert("The price cannot be higher");
      }
    }
    priceBackground.textContent = `Total: $${strPrice}`;
    price = parseFloat(strPrice);
  });
});

const getChange = (changeDue, cid) => {
  let changeArr = [];
  let reverseCid = [...cid].reverse();

  for (let i = 0; i < reverseCid.length; i++) {
    let currencyName = reverseCid[i][0];
    let currencyTotal = reverseCid[i][1];
    let currencyValue = currencyUnit[currencyName];

    let toReturn = 0;

    while (changeDue >= currencyValue && currencyTotal > 0) {
      changeDue -= currencyValue;
      changeDue = Math.round(changeDue * 100) / 100;
      currencyTotal -= currencyValue;
      toReturn += currencyValue;
    }

    if (toReturn > 0) {
      changeArr.push([currencyName, toReturn]);
    }
  }

  if (changeDue > 0) {
    return { status: "INSUFFICIENT_FUNDS", change: [] };
  }

  if (price == input.value) {
    regStatus.textContent = "No change due - customer paid with exact cash";
  } else {
    return { status: "OPEN", change: changeArr };
  }
};

const check = () => {
  console.log(`price: ${price}. input.value: ${input.value}`);
  let intCash = parseFloat(input.value);
  let changeDue = intCash - price;

  let totalCash = cid.reduce((sum, item) => sum + item[1], 0);
  totalCash = Math.round(totalCash * 100) / 100;

  if (price < input.value && totalCash < changeDue) {
    regStatus.textContent = "Status: INSUFFICIENT_FUNDS";
    return;
  }

  if (input.value < price) {
    alert("Customer does not have enough money to purchase the item");
    return;
  }

  if (totalCash < changeDue) {
    regStatus.textContent = "Status: INSUFFICIENT_FUNDS";
    return;
  }

  if (totalCash === changeDue) {
    regStatus.textContent = "Status: CLOSED";

    let formattedChange = cid
      .filter(([_, amount]) => amount > 0)
      .map(([name, amount]) => `${name}: $${amount}`)
      .join("\n");

    regStatus.innerHTML += ` ${formattedChange}`;
    return { status: "CLOSED", change: cid };
  }

  let result = getChange(changeDue, cid);
  regStatus.textContent = `Status: ${result.status}`;

  if (result.status === "OPEN") {
    regStatus.innerHTML += result.change
      .map(([name, amount]) => ` ${name}: $${amount}`)
      .join("\n");

    result.change.forEach(([name, amount]) => {
      const index = cid.findIndex(([currency]) => currency === name);
      if (index !== -1) {
        cid[index][1] -= amount;
      }
    });

    updateRegisterDisplay();
  }

  return result;
};

const updateRegisterDisplay = () => {
  const moneyDiv = document.getElementById("money");
  const currencyMap = {
    PENNY: "Pennies",
    NICKEL: "Nickels",
    DIME: "Dimes",
    QUARTER: "Quarters",
    ONE: "Ones",
    FIVE: "Fives",
    TEN: "Tens",
    TWENTY: "Twenties",
    "ONE HUNDRED": "Hundreds",
  };

  moneyDiv.innerHTML = cid
    .map(
      ([name, amount]) => `<p>${currencyMap[name]}: $${amount.toFixed(2)}</p>`
    )
    .join("");
};

submit.addEventListener("click", check);
