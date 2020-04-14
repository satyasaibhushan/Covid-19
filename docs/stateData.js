getStateTotals('ap')
getStateCharts('ap')

let stateCasesChart = document.getElementById("chart-state")
let stateDeathChart = document.getElementById("chart2-state")
let stateTable = document.getElementsByClassName('stateTable')[0]


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
  ];
  let Statestrings = [
    {
      label: "Statewide Cases",
      apiKeyName: "cases"
    },
    {
      label: "Statewide Deaths",
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

  function getStateTotals(stateCode) {
    api.getStateData(stateCode)
      .then(x =>{
        Statestrings.forEach(label => {
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
function getDistrictTable(stateName){
  api.getDistrictData(stateName)
    .then(data =>{
      if(data){
       stateTable.innerHTML = `<th>District Name</th>
       <th>Confirmed Cases</th>`
      data.forEach(element => {
         let tableRow = stateTable.insertRow(-1)
         let districtName = tableRow.insertCell(0)
         districtName.className = 'districtName'
         districtName.innerHTML = element['district'];
         let districtCount = tableRow.insertCell(1)
         districtCount.innerHTML += element['confirmed'];
         districtCount.className = 'districtCount'
         if(element['delta']['confirmed']!=0)
         districtCount.innerHTML += `<span class='districtIncrease'>
         <img class = 'increaseArrow'src="./src/uparrow.svg" alt="increase arrow" />
         ${element['delta']['confirmed']}  </span>`
      });}
    })
}
