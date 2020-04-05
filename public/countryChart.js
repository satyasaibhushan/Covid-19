let countryCharts = document.getElementsByClassName(
  "chart-container-country"
)[0];

let Countries_list = [];

GetData("china");
Gettotals("china");



let casesChart = new MakeCanvas(document.getElementById("chart-country"));
let deathChart = new MakeCanvas(document.getElementById("chart2-country"));
let CountryCasesDiffChart = new MakeCanvas(document.getElementById("chart3-country"));
let CountryDeathsDiffChart = new MakeCanvas(document.getElementById("chart4-country"));

function getCountryUrl(country) {
  return `https://corona.lmao.ninja/v2/historical/${country}`;
}
function getCountryUrltotal(country) {
  return `https://corona.lmao.ninja/countries/${country}`;
}

let dataStruct = [
  {
    title: "Countrywide Cases",
    chart: casesChart,
    chart2:CountryCasesDiffChart,
    bgColor: colors[0],
    bgColor2:colors[2],
    postive: true,
    label2:"cases incerase per day",
    Ylabel2:'Cases increase',
    KeyName: "cases"
  },
  {
    title: "Countrywide deaths",
    chart: deathChart,
    chart2:CountryDeathsDiffChart,
    bgColor: colors[1],
    bgColor2:colors[3],
    label2:"deaths incerase per day",
    Ylabel2:'Deaths increase',
    KeyName: "deaths"
  },
  {
    title: "Recovered",
    KeyName: "recovered"
  },
  {
    title: "Active cases"
  }
];

function GetData(Country_name) {
  fetch(getCountryUrl(Country_name))
    .then(res =>res.json()
    .then(res => {
          if (res["country"]) return res;
          else if (res["message"]) {
            alert(res["message"]);
            throw Error("no Country exists with such name");
          }
        })
        .then(conData => conData.timeline)
        .then(data => {
          dataStruct.forEach(entry => {
            if (!entry.KeyName) return;
            let cases = data[entry.KeyName],
              a;
            if (Object.values(cases).lastIndexOf(0) != -1)
              a = Object.values(cases).lastIndexOf(0) + 1;
            else {
              a = 0;
            }
            let case_data = Object.values(cases).slice(a);
            let case_date = Object.keys(cases).slice(a);
            let caseDiff_data = getDifference(case_data)
            if (entry.chart) {
              entry.chart.clearCanvas();
              entry.chart2.clearCanvas();
              var dates= case_date.map(changeDate)
              GetChart(
                "line",
                entry.chart.getContext(),
                entry.bgColor,
                dates,
                case_data,
                entry.KeyName,
                entry.KeyName.charAt(0).toUpperCase() + entry.KeyName.slice(1)
              );
              GetChart(
                "bar",
                entry.chart2.getContext(),
                entry.bgColor2,
                dates.slice(1,dates.length),
                caseDiff_data,
                entry.label2,
                entry.Ylabel2
              );
            }
          });
        })
    )
    .catch(console.log);
}

function Getcountries() {
  fetch("https://corona.lmao.ninja/countries")
    .then(res => res.json()
    .then(x => {
      x.forEach((element, i) => {
        Countries_list[i] = element["country"];
      })
    }).catch(function(err){ console.error})
    ).catch(function(err){alert('unable to reach server')})
    
}
Getcountries();
