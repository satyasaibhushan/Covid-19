let world = document.getElementsByClassName("world-data")[0];
let country = document.getElementsByClassName("country-data")[0];
let state  = document.getElementsByClassName("state-data")[0];

let strings = [
  {
    label: "Worldwide Cases",
    apiKeyName: "cases"
  },
  {
    label: "Worldwide Deaths",
    apiKeyName: "deaths"
  },
  {
    label: "Recovered Cases",
    apiKeyName: "recovered"
  },
  {
    label: "Active Cases",
    apiKeyName: "active"
  }
];
function clear(parent) {
  parent.innerHTML = "";
}

function createh(header, value, parent) {
  if (parent.children.length <= 5) {
    let obj = document.createElement("div");
    obj.innerHTML = `
      ${header} <span> : ${value}</span> 
    `;
    parent.append(obj);
  } else {
    clear(parent);
    createh(header, value, parent);
  }
}

api.getWorldData().then(data =>
    strings.forEach((label, i) => {
      let element = new Intl.NumberFormat().format(data[label.apiKeyName]);
      createh(label.label, element, world);
    })).catch(console.error)

 