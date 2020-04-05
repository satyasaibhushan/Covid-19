let ctx = document.getElementById("chart").getContext("2d");
let ctx2 = document.getElementById("chart2").getContext("2d");
let WorldCasesDiffChart = new MakeCanvas(document.getElementById("chart3-world"));
let WorldDeathsDiffChart = new MakeCanvas(document.getElementById("chart4-world"));
var options = {
  maintainAspectRatio: false,
  scales: {
    yAxes: [
      {
        scaleLabel: {
          display: true,
          labelString: "no.of of deaths/cases",
          lineHeight: "2",
          fontSize: "16",
          fontStyle: "bold"
        }
      }
    ],
    xAxes: [
      {
        scaleLabel: {
          display: true,
          labelString: "Dates",
          lineHeight: "2",
          fontSize: "16",
          fontStyle: "bold"
        }
      }
    ]
  }
};

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
          borderWidth: 1,
          pointHitRadius:30
        }
      ]
    },
    options: options
  });
}

let WorldDataStruct = [
  {
    title: "Worldwide Cases increase per day",
    chart:WorldCasesDiffChart,
    bgColor: "rgba(255, 99, 132, 0.2)",
    postive: true,
    label:"#of cases increase per day",
    KeyName: "cases"
  },
  {
    title: "Worldwide Deaths increase per day",
    chart: WorldDeathsDiffChart,
    bgColor: "#3498db",
    label:"#of deaths increase per day",
    KeyName: "deaths"
  },
];

fetch("https://corona.lmao.ninja/v2/historical/all")
  .then(response => response.json())
  .then(x => {
     var dates= Object.keys(x.cases).map(changeDate)
    //  console.log(dates.splice(1,dates.length-1))
    console.log(dates)
     var deathDiff = getDifference(Object.values(x.deaths))
    var myChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: dates,
        datasets: [
          {
            label: "# cases",
            data: Object.values(x.cases),
            backgroundColor: ["rgba(255, 99, 132, 0.2)"],
            borderColor: ["#e74c3c"],
            borderWidth: 1,
            pointHitRadius:30
          },
          {
            label: "# of deaths",
            data: Object.values(x.deaths),
            backgroundColor: ["#3498db"],
            borderColor: ["#2980b9"],
            borderWidth: 1,
            pointHitRadius:10
          }
        ]
      },
      options: options
    });
    GetChart(
      ctx2,
      "#3498db",
      dates,
      Object.values(x.deaths),
      "# of deaths"
    );
    WorldDataStruct.forEach(entry => {
      cases =x[entry.KeyName]
      case_data=Object.values(cases);
      let caseDiff_data = getDifference(case_data)
      GetChart(
        entry.chart.getContext(),
        entry.bgColor,
        dates,
        caseDiff_data,
        entry.label
      )
    })
    
  });

function changeDate(a){
  var initial = a.split(/\//);
  return [ initial[1], initial[0], initial[2] ].join('/');
}  
function getDifference(a){
  let b=[]
  for (let k = 1; k < a.length; k++) {
      b[k-1] = a[k]-a[k-1];
      if(b[k-1]<0)
      b[k-1] = 0;
  }
  return b;
}