const main = document.getElementById("main");
const addUserBtn = document.getElementById("add-user");
const doubleBtn = document.getElementById("double");
const showMillionairesBtn = document.getElementById("show-millionaires");
const sortBtn = document.getElementById("sort");
const calculateWealthBtn = document.getElementById("calculate-wealth");

let data = [];
getRandomUser();
getRandomUser();
getRandomUser();
//fetch random user
async function getRandomUser() {
  const res = await fetch("https://randomuser.me/api");
  const data = await res.json();

  const user = data.results[0];
  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1900000),
  };

  addData(newUser);
}
function addData(obj) {
  data.push(obj);
  updateDom();
}

// update dom
function updateDom(providedData = data) {
  main.innerHTML = " <h2><strong>Person</strong> Wealth</h2>";
  providedData.forEach((item) => {
    const element = document.createElement("div");
    element.classList.add("person");
    let formatedMoney = formatMoney(item.money);
    element.innerHTML = `<strong>${item.name}</strong> $${formatedMoney}`;
    main.appendChild(element);
  });
}
//format number as money
function formatMoney(number) {
  return number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
}

function doubleMoney() {
  data = data.map((user) => {
    return { ...user, money: user.money * 2 };
  });
  updateDom();
}
function sortByRichest() {
  data.sort((a, b) => b.money - a.money);
  updateDom();
}
function millionairesOnly() {
  data = data.filter((person) => person.money > 1000000);
  updateDom();
}

function sumAllWealth() {
  const wealth = data.reduce((acc, user) => (acc += user.money), 0);
  //   updateDom();
  const wealthy = document.createElement("div");
  wealthy.innerHTML = `<h3>Total Wealth: ${formatMoney(wealth)}</h3>`;
  main.appendChild(wealthy);
}

//eventlisteners
addUserBtn.addEventListener("click", getRandomUser);
doubleBtn.addEventListener("click", doubleMoney);
sortBtn.addEventListener("click", sortByRichest);
showMillionairesBtn.addEventListener("click", millionairesOnly);
calculateWealthBtn.addEventListener("click", sumAllWealth);
