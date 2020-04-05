var colors=["rgba(243, 156, 18, 0.5)","rgba(52, 152, 219, 0.8)","rgba(46, 204, 113,0.7)","rgba(192, 57, 43,0.6)"]



let ctx = document.getElementById("chart").getContext("2d");
let ctx2 = document.getElementById("chart2").getContext("2d");
let WorldCasesDiffChart = new MakeCanvas(
  document.getElementById("chart3-world")
);
let WorldDeathsDiffChart = new MakeCanvas(
  document.getElementById("chart4-world")
);
function options(Ylabel) {
  return {
    maintainAspectRatio: false,
    scales: {
      yAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: Ylabel,
            lineHeight: "2",
            fontSize: "16",
            fontStyle: "bold",
          },
        },
      ],
      xAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: "Dates",
            lineHeight: "2",
            fontSize: "16",
            fontStyle: "bold",
          },
        },
      ],
    },
  };
}

function MakeCanvas(parent) {
  this.parent = parent;

  this.clearCanvas = function () {
    if (this.canvas) {
      this.parent.innerHTML = "";
    }
    this.make();
  };

  this.getContext = function () {
    return this.canvas.getContext("2d");
  };

  this.make = function () {
    this.canvas = document.createElement("canvas");
    this.parent.appendChild(this.canvas);
  };

  this.make();

  return this;
}

function GetChart(type,element, color, dates, count, label,Ylabel) {
  return new Chart(element, {
    type: type,
    data: {
      labels: dates,
      datasets: [
        {
          label: label,
          data: count,
          backgroundColor: color,
          borderColor: "rgba(236, 240, 241,1.0)",
          borderWidth: 1,
          pointHitRadius: 10,
          hoverBackgroundColor: 'grey',
        },
      ],
    },
    options: options(Ylabel),
  });
}

let WorldDataStruct = [
  {
    title: "Worldwide Cases increase per day",
    chart: WorldCasesDiffChart,
    bgColor: colors[2],
    postive: true,
    label: "#of cases increase per day",
    KeyName: "cases",
  },
  {
    title: "Worldwide Deaths increase per day",
    chart: WorldDeathsDiffChart,
    bgColor: colors[3],
    label: "#of deaths increase per day",
    KeyName: "deaths",
  },
];

fetch("https://corona.lmao.ninja/v2/historical/all")
  .then((response) => response.json()
  .then((x) => {
    var dates = Object.keys(x.cases).map(changeDate);
    //  console.log(dates.splice(1,dates.length-1))
    var deathDiff = getDifference(Object.values(x.deaths));
    var myChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: dates,
        datasets: [
          {
            label: "# cases",
            data: Object.values(x.cases),
            backgroundColor: [colors[0]],
            borderColor: 'rgba(236, 240, 241,1.0)',
            borderWidth: 1,
            pointHitRadius: 10,
            hoverBackgroundColor: 'grey'
          },
          {
            label: "# of deaths",
            data: Object.values(x.deaths),
            backgroundColor: [colors[1]],
            borderColor: 'rgba(236, 240, 241,1.0)',
            borderWidth: 1,
            pointHitRadius: 10,
            hoverBackgroundColor: 'grey'
          },
        ],
      },
      options: options('Cases/Deaths'),
    })
    GetChart("line",ctx2, colors[1], dates, Object.values(x.deaths), "# of deaths",'Deaths');
    WorldDataStruct.forEach((entry) => {
      cases = x[entry.KeyName];
      case_data = Object.values(cases);
      let caseDiff_data = getDifference(case_data);
      GetChart(
        "line",
        entry.chart.getContext(),
        entry.bgColor,
        dates,
        caseDiff_data,
        entry.label,
        entry.KeyName.charAt(0).toUpperCase() + entry.KeyName.slice(1)
      );
    })}).catch(function(err){console.log(err)})
    ).catch(function(err){console.error})
  

function changeDate(a) {
  var initial = a.split(/\//);
  return [initial[1], initial[0], initial[2]].join("/");
}
function getDifference(a) {
  let b = [];
  for (let k = 1; k < a.length; k++) {
    b[k - 1] = a[k] - a[k - 1];
    if (b[k - 1] < 0) b[k - 1] = 0;
  }
  return b;
}
