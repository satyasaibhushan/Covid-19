function MakeCanvas(parent) {
    parent.innerHTML = ""
    canvas = document.createElement("canvas");
    parent.appendChild(canvas);
    parent.canvas = canvas
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
    return new Chart(this.element.canvas.getContext("2d"), {
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

function DrawCustomChart(entry, xvalues, yvalues) {
  MakeCanvas(entry.chart)
  let chart = new CustomChart(
    entry.chart,
    entry.type,
    entry.xLabel,
    entry.yLabel,
    xvalues
  );
  entry.datasets.forEach((dataset) => {
    chart.addDataSet(dataset.label, yvalues[dataset.keyName], dataset.bgColor);
  });
  chart.drawChart();
}
