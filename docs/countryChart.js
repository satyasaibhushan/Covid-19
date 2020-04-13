let countryCharts = document.getElementsByClassName(
  "chart-container-country"
)[0];

let countryList = [];
let statesList = [];

let inp = document.getElementById("country-name")

Promise.all([
  api.getCountriesList().then(list => { countryList = list; return list }),
  api.getStates().then(list => { statesList = list; return list }),
])
.then(result => result.flat())
.then(list => autocomplete(inp , list))
.catch(console.log)

GetData("china");
Gettotals("china");

let casesChart = document.getElementById("chart-country")
let deathChart = document.getElementById("chart2-country")
let CountryCasesDiffChart = document.getElementById("chart3-country")
let CountryDeathsDiffChart = document.getElementById("chart4-country")

let countryDataStruct = [
  {
    chart: casesChart,
    xLabel: "Dates",
    yLabel: "Cases",
    type: "line",
    datasets: [
      {
        label: "# cases",
        keyName: "cases",
        bgColor: [colors[0]],
        borderColor:"rgba(236, 240, 241,1.0)"
      },
    ],
  },
  {
    chart: deathChart,
    xLabel: "Dates",
    yLabel: "Deaths",
    type: "line",
    datasets: [
      {
        label: "# deaths",
        keyName: "deaths",
        bgColor: [colors[1]],
        borderColor:"rgba(236, 240, 241,1.0)"
      },
    ],
  },
  {
    chart: CountryCasesDiffChart,
    xLabel: "Dates",
    yLabel: "Cases",
    type: "bar",
    datasets: [
      {
        label: "#of cases per day",
        keyName: "casesDiff",
        bgColor: colors[2],
        borderColor:"rgba(46, 204, 113,0.3)"
      },
    ],
  },
  {
    chart: CountryDeathsDiffChart,
    xLabel: "Dates",
    yLabel: "Deaths",
    type: "bar",
    datasets: [
      {
        label: "#of deaths per day",
        keyName: "deathsDiff",
        bgColor: colors[3],
        borderColor:"rgba(192, 57, 43,0.3)"
      },
    ],
  },
];

function GetData(Country_name) {
  api
    .getCountryChartData(Country_name)
    .then((data) => {
      countryDataStruct.forEach((entry) => {
        DrawCustomChart(entry, data.dates, data);
      });
    })
    .catch(console.log);
}