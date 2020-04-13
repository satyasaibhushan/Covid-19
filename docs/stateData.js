getStateTotals('ap')
getStateCharts('ap')

let stateCasesChart = document.getElementById("chart-state")
let stateDeathChart = document.getElementById("chart2-state")
let stateCasesDiffChart = document.getElementById("chart3-state")
let stateDeathsDiffChart = document.getElementById("chart4-state")


let stateDataStruct = [
    {
      chart: stateCasesChart,
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
      chart: stateDeathChart,
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
      chart: stateCasesDiffChart,
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
      chart: stateDeathsDiffChart,
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

  function getStateTotals(stateCode) {
    api.getStateData(stateCode)
      .then(x =>{
        Countrystrings.forEach(label => {
          let element = new Intl.NumberFormat().format(x[label.apiKeyName]);
        //   console.log(x)
          createh(label.label, element, state);
        })}
      ).catch(console.log)
    
  }   
function getStateCharts(stateCode) {
    api
      .getStatesChartData(stateCode)
      .then((data) => {
        stateDataStruct.forEach((entry) => {
          DrawCustomChart(entry, data.dates, data);
        });
      })
      .catch(console.log);
  }

