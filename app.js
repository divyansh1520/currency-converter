const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "c3f3c510e6msh75d82baaa8bc8f7p109aaajsn88001d72aa2e",
    "X-RapidAPI-Host": "forex-convertor.p.rapidapi.com",
  },
};

const fetchAPI = async () => {
  let amount = document.querySelector(".amount input");
  let amtVal = amount.value;
  if (amtVal === "" || amtVal < 1) {
    amtVal = 1;
    amount.value = "1";
  }
  try {
    const url = `https://forex-convertor.p.rapidapi.com/getExchangeRate?from=${fromCurr.value}&to=${toCurr.value}`;
    const response = await fetch(url, options);
    const result = await response.json();  
    let finalAmount = amtVal * parseInt(result.exchangeRate);
    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
  } catch (error) {
    console.error(error);
  }
};

for (let select of dropdowns) {
  for (currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currCode === "INR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }

  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}
const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  console.log(countryCode)
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  fetchAPI();
});

window.addEventListener("load", () => {
  fetchAPI();
});
