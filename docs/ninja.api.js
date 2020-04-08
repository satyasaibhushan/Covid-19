function changeDate(a) {
  var initial = a.split(/\//);
  return [initial[1], initial[0], initial[2]].join("/");
}

function getDifference(a) {
  let b = a.map((x, i) =>{
    let diff = x - (a[i-1]??0)
    return diff < 0 ? 0 : diff
  });

  b[0] = 0
  return b
}

let jsonErrorMessage = "unable to convert to json";

const api = {
  getWorldData() {
    return new Promise((resolve, reject) => {
      fetch("https://corona.lmao.ninja/all")
        .then((res) => {
          return res
            .json()
            .then((val) => resolve(val))
            .catch((err) => reject(jsonErrorMessage));
        })
        .catch(reject);
    });
  },

  getWorldChartData() {
    return new Promise((resolve, reject) => {
      fetch("https://corona.lmao.ninja/v2/historical/all")
        .then((res) => {
          return res
            .json()
            .then((x) => {
              let cases = x.cases;
              let deaths = x.deaths;
              x.casesDiff = getDifference(Object.values(cases));
              x.deathsDiff = getDifference(Object.values(deaths));
              x.dates = Object.keys(cases);
              x.dates = x.dates.map(changeDate);
              x.cases = Object.values(cases);
              x.deaths = Object.values(deaths);
              resolve(x);
            })
            .catch(() => reject(jsonErrorMessage));
        })
        .catch(reject);
    });
  },

  getCountryData(countryName) {
    return new Promise((resolve, reject) => {
      fetch(`https://corona.lmao.ninja/countries/${countryName}`).then((res) =>
        res
          .json()
          .then(resolve)
          .catch(() => reject(jsonErrorMessage))
          .catch(reject)
      );
    });
  },

  getCountryChartData(countryName) {
    return new Promise((resolve, reject) => {
      fetch(`https://corona.lmao.ninja/v2/historical/${countryName}`)
        .then((res) =>
          res
            .json()
            .then((res) => {
              if (res["country"]) {
                let x = res.timeline;
                let cases = x.cases;
                let deaths = x.deaths;
                x.casesDiff = getDifference(Object.values(cases));
                x.deathsDiff = getDifference(Object.values(deaths));
                x.dates = Object.keys(cases);
                x.dates = x.dates.map(changeDate);
                x.cases = Object.values(cases);
                x.deaths = Object.values(deaths);
                resolve(x);
              } else if (res["message"]) {
                reject("no Country exists with such name");
              }
            })
            .catch(() => reject(jsonErrorMessage))
        )
        .catch(reject);
    });
  },

  getCountriesList() {
    return new Promise((resolve, reject) => {
      fetch("https://corona.lmao.ninja/countries")
        .then((res) =>
          res
            .json()
            .then((x) => resolve(x.map((obj) => obj.country)))
            .catch((_) => reject(jsonErrorMessage))
        )
        .catch(reject);
    });
  },
};
