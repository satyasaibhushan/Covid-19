function MakeCanvas(parent) {
  parent.innerHTML = "";
  canvas = document.createElement("canvas");
  parent.appendChild(canvas);
  parent.canvas = canvas;
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

  addDataSet(label, data, colors,borderColor) {
    let dataset = {
      label: label,
      data: data,
      backgroundColor: colors,
      borderColor: borderColor,
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
  let dataSetKeys = entry.datasets.map((dataset) => dataset.keyName);
  let i = 0
  while(true){
    let allZeros = dataSetKeys.reduce((prev, curr) => prev && yvalues[curr][i] == 0, true)
    if(allZeros) {
        i++
    } else {
        break
    }
  }

  i = (i==0) ? i : i - 1
  dataSetKeys.forEach(key =>{
    yvalues[key] = yvalues[key].slice(i,yvalues[key].length)})
  xvalues = xvalues.slice(i, xvalues.length)

  MakeCanvas(entry.chart);
  let chart = new CustomChart(
    entry.chart,
    entry.type,
    entry.xLabel,
    entry.yLabel,
    xvalues
  );
  entry.datasets.forEach((dataset) => {
    chart.addDataSet(dataset.label, yvalues[dataset.keyName], dataset.bgColor,dataset.borderColor);
  });
  chart.drawChart();
}
