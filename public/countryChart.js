let countryCharts = document.getElementsByClassName(
  "chart-container-country"
)[0];


let Countries_list = [];

GetData("china");
Gettotals("china");

function MakeCanvas(parent) {
  this.parent = parent;

  this.clearCanvas = function() {
    if (this.canvas) {
      this.parent.innerHTML = "";
    }
    this.make();
  };

  this.getContext = function() {
    return this.canvas.getContext("2d");
  };

  this.make = function() {
    this.canvas = document.createElement("canvas");
    this.parent.appendChild(this.canvas);
  };

  this.make();

  return this;
}

let casesChart = new MakeCanvas(document.getElementById("chart-country"));
let deathChart = new MakeCanvas(document.getElementById("chart2-country"));

function getCountryUrl(country) {
  return `https://corona.lmao.ninja/v2/historical/${country}`;
}
function getCountryUrltotal(country) {
  return `https://corona.lmao.ninja/countries/${country}`;
}
function GetChart(element, color, dates, count, label) {
  return new Chart(element, {
    type: "line",
    data: {
      labels: dates,
      datasets: [
        {
          label: label,
          data: count,
          backgroundColor: [color],
          borderColor: ["#e74c3c"],
          borderWidth: 1
        }
      ]
    },
    options: options
  });
}

let dataStruct = [
  {
    title: "Countrywide Cases",
    chart: casesChart,
    bgColor: "rgba(255, 99, 132, 0.2)",
    postive: true,
    KeyName: "cases"
  },
  {
    title: "Countrywide deaths",
    chart: deathChart,
    bgColor: "#3498db",
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
    .then(res =>
      res
        .json()
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

            if (entry.chart) {
              entry.chart.clearCanvas();
              GetChart(
                entry.chart.getContext(),
                entry.bgColor,
                case_date,
                case_data,
                entry.KeyName
              );
            }
          });
        })
    )
    .catch(console.log);
}

function Getcountries() {
  fetch("https://corona.lmao.ninja/countries")
    .then(res => res.json())
    .then(x => {
      x.forEach((element, i) => {
        Countries_list[i] = element["country"];
      });
    });
}
Getcountries();
