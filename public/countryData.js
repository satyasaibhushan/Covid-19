let Countrystrings = [
  {
    label: "Countrywide Cases",
    apiKeyName: "cases"
  },
  {
    label: "Countrywide Deaths",
    apiKeyName: "deaths"
  },
  {
    label: "Recovered Cases",
    apiKeyName: "recovered"
  },
  {
    label: "Active Cases",
    apiKeyName: "active"
  },
  {
    label: "Today added Cases",
    apiKeyName: "todayCases"
  }
];
function Gettotals(Country_name) {
  fetch(getCountryUrltotal(Country_name))
    .then(res => res.json())
    .then(x =>
      Countrystrings.forEach(label => {
        let element = new Intl.NumberFormat().format(x[label.apiKeyName]);
        // console.log(element);
        createh(label.label, element, country);
      })
    );
  setHeading(Country_name);
}

function setHeading(Country_name){
     let heading = document.getElementById('country_heading');

     heading.innerHTML =`${(Country_name).toLowerCase()}'s Data`
}