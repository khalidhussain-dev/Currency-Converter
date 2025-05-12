// Displays only key
// for (code in countryList) {
//   console.log(code);
// }
// Displays both key and value
// for (code in countryList) {
//   console.log(code, countryList[code]);
// }

//  Converting Objects array into 2D array. Key-Value pairs.
// const entries = Object.entries(countryList);
// console.log(entries[0][1]); // [["AED", "AE"], ["AFN", "AF"], ["XCD", "AG"], ["ALL", "AL"], ["AMD", "AM"]]

// const BASE_URL =
//   "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const BASE_URL =
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@2024-03-06/v1/currencies/eur.json";

let dropdowns = document.querySelectorAll(".dropdown select");
let selects = document.querySelectorAll("select");
let inputfield = document.querySelector("input");
let convertbtn = document.querySelector("button");
let msg = document.querySelector(".msg");

for (let select of dropdowns) {
  for (currelement in countryList) {
    let newOpt = document.createElement("option");
    newOpt.innerText = currelement;
    newOpt.value = currelement;

    if (select.name === "from" && currelement === "USD")
      newOpt.selected = "selected";
    else if (select.name === "to" && currelement === "PKR")
      newOpt.selected = "selected";

    select.append(newOpt);
  }
}

selects.forEach((select) => {
  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
});

const updateFlag = (element) => {
  let currelement = element.value;
  console.log(currelement);
  let countryCode = countryList[currelement];
  let newSrc = `https://flagsapi.com/${countryCode}/shiny/64.png`;
  // let img = element.previousElementSibling; // Method 1
  let img = element.parentElement.querySelector("img"); // Method 2 to access siblings
  img.src = newSrc;
};

convertbtn.addEventListener("click", (evt) => {
  evt.preventDefault();

  //   console.log(selects[0].selectedIndex);
  //   console.log(selects[0][selects[0].selectedIndex].value);

  // Call the function to initiate conversion
  converter();
});

// // Converter Code from GPT
async function converter() {
  const url =
    "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@2024-03-06/v1/currencies/eur.json";

  try {
    // Fetch data from the API
    const response = await fetch(url);
    const data = await response.json();

    cur1 = selects[0][selects[0].selectedIndex].value;
    cur1 = cur1.toLowerCase();

    cur2 = selects[1][selects[1].selectedIndex].value;
    cur2 = cur2.toLowerCase();

    // Extract EUR to INR and EUR to PKR rates from the response
    currency1 = inputfield.value.toLowerCase;
    const eurTocur1 = data.eur[cur1];
    const eurTocur2 = data.eur[cur2];

    // Calculate INR to PKR conversion rate
    let result = eurTocur2 / eurTocur1;

    // Log the result
    inputvalue = inputfield.value;

    if (inputvalue < 0 || inputvalue == "") inputvalue = 1;
    result = inputvalue * result;
    result = result.toFixed(4);

    // console.log(
    //   `${inputvalue} ${cur1.toUpperCase()} = ${result.toFixed(
    //     4
    //   )} ${cur2.toUpperCase()}`
    // );

    msg.innerText = `${inputvalue} ${cur1.toUpperCase()} = ${result} ${cur2.toUpperCase()}`;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

window.addEventListener("load", converter);
