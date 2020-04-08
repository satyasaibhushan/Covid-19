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
  },
  {
    label:"Today added Deaths",
    apiKeyName:"todayDeaths"
  }
];
function Gettotals(Country_name) {
  api.getCountryData(Country_name)
    .then(x =>
      Countrystrings.forEach(label => {
        let element = new Intl.NumberFormat().format(x[label.apiKeyName]);
        createh(label.label, element, country);
      })
    ).catch(console.log)
  setHeading(Country_name);
}

function setHeading(Country_name){
     let heading = document.getElementById('country_heading');

     heading.innerHTML =`${(Country_name).toLowerCase()}'s Data`
}