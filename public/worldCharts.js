let ctx = document.getElementById("chart").getContext("2d");
let ctx2 = document.getElementById("chart2").getContext("2d");

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

fetch("https://corona.lmao.ninja/v2/historical/all")
  .then(response => response.json())
  .then(x => {
    var myChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: Object.keys(x.cases),
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
    var myChart = new Chart(ctx2, {
      type: "line",
      data: {
        labels: Object.keys(x.cases),
        datasets: [
          {
            label: "# of deaths",
            data: Object.values(x.deaths),
            backgroundColor: ["#3498db"],
            borderColor: ["#2980b9"],
            borderWidth: 1,
            pointHitRadius:30
          }
        ]
      },
      options: options
    });
  });
