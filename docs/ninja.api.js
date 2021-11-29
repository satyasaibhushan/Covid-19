function changeDate(a) {
  var initial = a.split(/\//);
  return [initial[1], initial[0], initial[2]].join("/");
}

function getDifference(a) {
  let b = a.map((x, i) => {
    let diff = x - (a[i - 1] ? a[i - 1] : 0);
    return diff < 0 ? 0 : diff;
  });

  b[0] = 0;
  return b;
}
function addDifference(a){
  let b= [];
  for (let i = 0; i < a.length; i++) {
      b[i] = a[i] +(b[i - 1] ? b[i - 1] : 0)
  }
  return b;
}

let jsonErrorMessage = "unable to convert to json";

const api = {
  getWorldData() {
    return new Promise((resolve, reject) => {
      fetch("https://corona.lmao.ninja/v2/all")
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
      fetch("https://corona.lmao.ninja/v2/historical/all?lastdays=all")
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
    if(countryName.toUpperCase() == "INDIA"){
      return api.getIndiaData();
    }
    return new Promise((resolve, reject) => {
      fetch(`https://corona.lmao.ninja/v2/countries/${countryName}`).then((res) =>
        res
          .json()
          .then(resolve)
          .catch(() => reject(jsonErrorMessage))
          .catch(reject)
      );
    });
  },

  getCountryChartData(countryName) {
    if(countryName.toUpperCase() == "INDIA"){
      return api.getIndiaChartData();
    }
    return new Promise((resolve, reject) => {
      fetch(`https://corona.lmao.ninja/v2/historical/${countryName}?lastdays=all`)
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
      fetch("https://corona.lmao.ninja/v2/countries")
        .then((res) =>
          res
            .json()
            .then((x) => resolve(x.map((obj) => obj.country)))
            .catch((_) => reject(jsonErrorMessage))
        )
        .catch(reject);
    });
  },
  getIndiaChartData() {
    return new Promise((resolve, reject) => {
      fetch("https://data.covid19india.org/data.json").then((data) =>
        data
          .json()
          .then((x) => x.cases_time_series)
          .then((data) => {
            let x = {
              deaths : [],
              cases : [],
              dates : [],
              deathsDiff : [],
              casesDiff : []
            };

            data.forEach((element) => {
              let { dailyconfirmed, dailydeceased, date, totalconfirmed, totaldeceased  } = element
              x.casesDiff.push(parseInt(dailyconfirmed));
              x.deathsDiff.push(parseInt(dailydeceased));
              x.dates.push(date);
              x.cases.push(parseInt(totalconfirmed));
              x.deaths.push(parseInt(totaldeceased));
              resolve(x);
            });
          })
      );
    });
  },

  getIndiaData() {
    return new Promise((resolve, reject) => {
      fetch("https://data.covid19india.org/data.json").then((data) =>
        data
          .json()
          .then((x) => x.statewise)
          .then((data) => {
            let length = data.length
            let x = {
              deaths : [],
              cases : [],
              recovered :[],
              active : [],
              todayCases : [],
              todayDeaths : []
            };
              let { deltaconfirmed, deaths, recovered, confirmed, deltadeaths  } = data[0]
              x.todayCases.push(parseInt(deltaconfirmed));
              x.todayDeaths.push(parseInt(deltadeaths));
              x.recovered.push(parseInt(recovered));
              x.cases.push(parseInt(confirmed));
              x.deaths.push(parseInt(deaths));
              x.active.push(x.cases-x.deaths-x.recovered);
              resolve(x);
          })
      );
    });
  },
  getStatesChartData (stateCode){

    return new Promise((resolve, reject) => {
      fetch("https://data.covid19india.org/states_daily.json")
        .then((res) =>
          res
            .json()
            .then(x => x.states_daily)
            .then(x => {
              let object = {
                cases : [],
                deaths : [],
                dates : [],
                casesDiff : [],
                deathsDiff : []
              }
              x.forEach((element,i) => {
                 if(element.status == "Confirmed") object.casesDiff.push(parseInt(element[stateCode]))
                //  if(element.status == "Recovered") object.recovered.push(element[stateCode])
                 if(element.status == "Deceased"){ object.deathsDiff.push(parseInt(element[stateCode]))
                 object.dates.push(element['date'])}
              });
              object.cases = addDifference(object.casesDiff)
              object.deaths = addDifference(object.deathsDiff)
              resolve(object)
            })
        )
        .catch(reject);
    });
  },
  
  getStateData(stateCode) {
    return new Promise((resolve, reject) => {
      fetch("https://data.covid19india.org/data.json").then((res) =>
        res
          .json()
          .then(res => res.statewise )
          .then(x=> {
            let object = {
              deaths : [],
              cases : [],
              recovered :[],
              active : [],
              todayCases : [],
              todayDeaths : []
            };
            x.forEach(element => {
            if(element['statecode'] == stateCode.toUpperCase()){
              // console.log(x)
              object.todayCases.push(parseInt(element['deltaconfirmed']));
              object.todayDeaths.push(parseInt(element['deltadeaths']));
              object.recovered.push(parseInt(element['recovered']));
              object.cases.push(parseInt(element['confirmed']));
              object.deaths.push(parseInt(element['deaths']));
              object.active.push(element['active']);
              resolve(object);
            }    
          })})
          .catch(() => reject(jsonErrorMessage))
          .catch(reject)
      );
    });
  },
 
  getDistrictData(stateCode){
    return new Promise((resolve, reject) => {
      fetch("https://data.covid19india.org/v2/state_district_wise.json")
        .then((res) =>
          res
            .json()
            .then(x=> {x.forEach(element => {
                if(element.state == stateCode) 
                x = element
            })
            resolve(x.districtData)
          })
        )
        .catch(reject);
    });
  },

  getStates(){
    return new Promise((resolve, reject) => {
      fetch("https://data.covid19india.org/data.json")
        .then((res) =>
          res
            .json()
            .then(x=> x.statewise)
            .then(x => {
              resolve(x.map(y => y.state))
            })
        )
        .catch(reject);
    });
  },
};


