const inputEl = document.getElementById("input-el");
const btnEl1 = document.getElementById("btn-el");
const btnEl2 = document.getElementById("btn-el2");
const btnEl3 = document.getElementById("btn-el3");
const ulEl = document.getElementById("ul-el");
let inputValues = [];

let localStorageRender = JSON.parse(localStorage.getItem("inputItems"));
if (localStorageRender) {
  inputValues = localStorageRender;
  render(inputValues);
}

btnEl1.addEventListener("click", function () {
  let inputItem = inputEl.value;
  inputValues.push(inputItem);
  inputEl.value = "";
  render(inputValues);
  let localStorageSave = JSON.stringify(inputValues);
  localStorage.setItem("inputItems", localStorageSave);
});

btnEl2.addEventListener("click", function () {
  localStorage.clear();
  inputValues = [];
  ulEl.innerHTML = "";
});
btnEl3.addEventListener("click", function () {
  addURL();
});

function render(arr) {
  let items = "";
  for (let i = 0; i < arr.length; i++) {
    items += `<li><a href= "${arr[i]}" target = "_blank">${arr[i]}</a></li>`;
  }
  ulEl.innerHTML = items;
}
function addURL() {
  let queryInfo = {
    currentWindow: true,
    active: true,
  };

  chrome.tabs.query(queryInfo, function (tabs) {
    // tabs is an array so fetch the first (and only) object-elemnt in tab
    // put URL propery of tab in another variable as per: https://developer.chrome.com/extensions/tabs#type-Tab
    let url = tabs[0];
    let tabUrl = url.url;
    // put the content into the popup-window's <div>
    inputValues.push(tabUrl);
    render(inputValues);
  });
}
