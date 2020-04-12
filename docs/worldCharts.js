var colors = [
  "rgba(243, 156, 18, 0.5)",
  "rgba(52, 152, 219, 0.8)",
  "rgba(46, 204, 113,0.7)",
  "rgba(192, 57, 43,0.6)",
];

let worldCasesChart = document.getElementById("chart");
let worldDeathsChart = document.getElementById("chart2");
let WorldCasesDiffChart = document.getElementById("chart3-world")
let WorldDeathsDiffChart = document.getElementById("chart4-world")

let WorldDataStruct = [
  {
    chart: worldCasesChart,
    xLabel: "Dates",
    yLabel: "Cases/Deaths",
    type: "line",
    datasets: [
      {
        label: "# cases",
        keyName: "cases",
        bgColor: [colors[0]],
      },
      {
        label: "# deaths",
        keyName: "deaths",
        bgColor: [colors[1]],
        borderColor:"rgba(236, 240, 241,1.0)"
      },
    ],
  },
  {
    chart: worldDeathsChart,
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
    chart: WorldCasesDiffChart,
    xLabel: "Dates",
    yLabel: "Cases",
    type: "line",
    datasets: [
      {
        label: "#of cases per day",
        keyName: "casesDiff",
        bgColor: colors[2],
        borderColor:"rgba(236, 240, 241,1.0)"
      },
    ],
  },
  {
    chart: WorldDeathsDiffChart,
    xLabel: "Dates",
    yLabel: "Deaths",
    type: "line",
    datasets: [
      {
        label: "#of deaths per day",
        keyName: "deathsDiff",
        bgColor: colors[3],
        borderColor:"rgba(236, 240, 241,1.0)"
      },
    ],
  },
];

  api.getWorldChartData()
  .then(x => 
    WorldDataStruct.forEach((entry) => DrawCustomChart(entry, x.dates, x)))
  .catch(console.log)
