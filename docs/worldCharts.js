var colors = [
  "rgba(243, 156, 18, 0.5)",
  "rgba(52, 152, 219, 0.8)",
  "rgba(46, 204, 113,0.7)",
  "rgba(192, 57, 43,0.6)",
];

let worldCasesChart = new MakeCanvas(document.getElementById("chart"));
let worldDeathsChart = new MakeCanvas(document.getElementById("chart2"));
let WorldCasesDiffChart = new MakeCanvas(document.getElementById("chart3-world"));
let WorldDeathsDiffChart = new MakeCanvas(document.getElementById("chart4-world"));

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

class CustomChart {
  constructor(element, type, xlabel, ylabel, xvalues) {
    this.element = element;
    this.type = type;
    this.xvalues = xvalues;
    this.xlabel = xlabel;
    this.ylabel = ylabel;
    this.datasets = [];
    return this;
  }

  addDataSet(label, data, colors) {
    let dataset = {
      label: label,
      data: data,
      backgroundColor: colors,
      borderColor: "rgba(236, 240, 241,1.0)",
      borderWidth: 1,
      pointHitRadius: 10,
      hoverBackgroundColor: "grey",
    };

    this.datasets.push(dataset);
    return this;
  }

  drawChart() {
    return new Chart(this.element, {
      type: this.type,
      data: {
        labels: this.xvalues,
        datasets: this.datasets,
      },
      options: {
        maintainAspectRatio: false,
        scales: {
          yAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: this.ylabel,
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
                labelString: this.xlabel,
                lineHeight: "2",
                fontSize: "16",
                fontStyle: "bold",
              },
            },
          ],
        },
      },
    });
  }
}

let WorldDataStruct = [
  {
    title: "Worldwide Cases increase per day",
    chart: WorldCasesDiffChart,
    bgColor: colors[2],
    postive: true,
    label: "#of cases per day",
    KeyName: "cases",
    yName : "Cases"
  },
  {
    title: "Worldwide Deaths increase per day",
    chart: WorldDeathsDiffChart,
    bgColor: colors[3],
    label: "#of deaths per day",
    KeyName: "deaths",
    yName : "Deaths"
  },
];

fetch("https://corona.lmao.ninja/v2/historical/all")
  .then((response) =>
    response
      .json()
      .then((x) => {
        var dates = Object.keys(x.cases).map(changeDate);
        var deathDiff = getDifference(Object.values(x.deaths));

        new CustomChart(worldCasesChart, "line", "Dates", "Cases/Deaths", dates)
          .addDataSet("# cases", Object.values(x.cases), [colors[0]])
          .addDataSet("# of deaths", Object.values(x.deaths), [colors[1]])
          .drawChart();

        new CustomChart(worldDeathsChart, "line", "Dates", "Deaths", dates)
          .addDataSet("# of deaths", Object.values(x.deaths), [colors[1]])
          .drawChart();

        WorldDataStruct.forEach((entry) => {
          cases = x[entry.KeyName];
          case_data = Object.values(cases);
          let caseDiff_data = getDifference(case_data);
          new CustomChart(
            entry.chart.getContext(),
            "line",
            "Dates",
            entry.yName,
            dates
          )
            .addDataSet(entry.label, caseDiff_data, entry.bgColor)
            .drawChart();
        });
      })
      .catch(function (err) {
        console.log(err);
      })
  )
  .catch(function (err) {
    console.error;
  });

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
