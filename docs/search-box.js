let Search_btn = document.getElementsByClassName("search-btn")[0];
let Search_box = document.getElementsByClassName("search-box")[0];
let Country_text = document.getElementById("country-name");
let header = document.getElementsByClassName("head")[0];
let stateDiv = document.getElementsByClassName("stateDiv")[0];
let changeState = {
  Maharashtra: "mh",
  Delhi: "dl",
  "Tamil Nadu": "tn",
  Rajasthan: "rj",
  "Madhya Pradesh": "mp",
  Telangana: "tg",
  Gujarat: "gj",
  "Uttar Pradesh": "up",
  "Andhra Pradesh": "ap",
  Kerala: "kl",
  "Jammu And Kashmir": "jk",
  Karnataka: "ka",
  Haryana: "hr",
  Punjab: "pb",
  "West Bengal": "wb",
  Bihar: "br",
  Odisha: "or",
  Uttarakhand: "ut",
  "Himachal Pradesh": "hp",
  Assam: "as",
  Chhattisgarh: "ct",
  Chandigarh: "ch",
  Jharkhand: "jh",
  Ladakh: "la",
  "Andaman And Nicobar Islands": "an",
  Goa: "ga",
  Puducherry: "py",
  Manipur: "mn",
  Tripura: "tr",
  Mizoram: "mz",
  "Arunachal Pradesh": "ar",
  "Dadra And Nagar Haveli": "dn",
  Nagaland: "nl",
  "Daman And Diu": "dd",
  Lakshadweep: "ld",
  Meghalaya: "ml",
  Sikkim: "sk",
};

Country_text.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    clicked();
  }
});

Country_text.addEventListener("click", function (e) {
  Smoothscroll("#Countrydiv", 800);
});

Search_btn.addEventListener("click", function (e) {
  if (Country_text.value == "") Country_text.focus();
  else {
    clicked();
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "countryrequested",
      Country: `${Country_text.value}`,
      type: "clickedBtn",
    });
  }
});

function SearchArray(element, array) {
  var len = array.length,
    str = element.toLowerCase();
  for (var i = 0; i < len; i++) {
    if (array[i].toLowerCase() == str) {
      return i;
    }
  }
  return -1;
}

function clicked() {
  name = Country_text.value.toLowerCase()
    .split(' ')
    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
    .join(' ');
    
  if (changeState[name]) {
    stateCode = changeState[name];
    getStateCharts(stateCode);
    getStateTotals(stateCode);
     name = name.replace(/ And/g, " and");
    getDistrictTable(name)
    Smoothscroll(".stateDiv", 750);
    Country_text.blur();
    cookie(name);
    header.classList.add("hide");
    stateDiv.classList.remove("hide");
    setHeading(name, "state_heading");
    GetData("india");
    Gettotals("india");
  } else if (SearchArray(Country_text.value, countryList) != -1) {
        name = name.replace(/ And/g, " and");
    GetData(name);
    Gettotals(name);
    Smoothscroll("#Countrydiv", 750);
    Country_text.blur();
    cookie(name);
    header.classList.remove("hide");
    stateDiv.classList.add("hide");
  } else {
    alert("Please select a country from suggested");
  }
}

function autocomplete(inp, arr) {
  var currentFocus;
  inp.addEventListener("click", (e) => {
    if (inp.value.length == 0) {
      currentFocus = -1;
      addSuggestions(
        inp,
        0,
        searches.map((s) => s.name)
      );
    }
  });

  inp.addEventListener("input", function (e) {
    var i,
      val = this.value;

    closeAllLists();
    if (!val) {
      return false;
    }
    currentFocus = -1;

    addSuggestions(
      inp,
      val.length,
      arr.filter(
        (x) => x.substr(0, val.length).toUpperCase() == val.toUpperCase()
      )
    );
  });

  function addSuggestions(inp, length, suggestions) {
    let a = document.createElement("DIV");
    a.setAttribute("id", inp.id + "autocomplete-list");
    a.setAttribute("class", "autocomplete-items");
    inp.parentNode.appendChild(a);

    suggestions.forEach((suggestion) => {
      let b = document.createElement("DIV");
      b.innerHTML = `
    <strong>${suggestion.substr(0, length)}</strong>${suggestion.substr(length)}
    <input type='hidden' value=${suggestion}>
    `;
      b.country = suggestion;
      b.addEventListener("click", function (e) {
        e.preventDefault();
        inp.value = b.country;
        closeAllLists();
        window.dataLayer.push({
          event: "countryrequested",
          Country: `${Country_text.value}`,
          type: "ClickedSugg",
        });
        clicked();
      });
      a.appendChild(b);
    });
  }

  inp.addEventListener("keydown", function (e) {
    // e.preventDefault()
    var x = document.getElementById(this.id + "autocomplete-list");
    if (x) x = x.getElementsByTagName("div");
    if (e.keyCode == 40) {
      /*If the arrow DOWN key is pressed,increase the currentFocus variable:*/
      currentFocus++;
      addActive(x);
    } else if (e.keyCode == 38) {
      currentFocus--;
      addActive(x);
    } else if (e.keyCode == 13) {
      e.preventDefault();
      if (currentFocus > -1) {
        if (x) x[currentFocus].click();
        // clicked();
      } else {
        //for closing of suggestions if value entered is a country
        if (SearchArray(inp.value, arr) != -1) closeAllLists(e.target);
      }
      if (!(currentFocus > -1)) {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: "countryrequested",
          Country: `${Country_text.value}`,
          type: "Enter",
        });
      }
      clicked();
    }
  });

  function addActive(x) {
    /*a function to classify an item as "active":*/
    if (!x) return false;
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = x.length - 1;
    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    /*a function to remove the "active" class from all autocomplete items:*/
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    /*close all autocomplete lists in the document, except the one passed as an argument:*/
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i]) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  document.addEventListener("click", function (e) {
    if (e.target.id != "country-name") closeAllLists(e.target);
    // e.preventDefault();
  });
}
