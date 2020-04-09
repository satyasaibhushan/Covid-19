let Search_btn = document.getElementsByClassName("search-btn")[0];
let Search_box = document.getElementsByClassName("search-box")[0];
let Country_text = document.getElementById("country-name");

Country_text.addEventListener("keypress", function (e) {
  if (e.key === "Enter") clicked();
});

Country_text.addEventListener("click", function (e) {
  Smoothscroll("#Countrydiv", 800);
});

Search_btn.addEventListener("click", function (e) {
  if (Search_box.isOpened) clicked();
  else {
    // Search_box.modifySearchBox(true);
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
  if (SearchArray(Country_text.value, countryList) != -1) {
    let countryName =
      Country_text.value.charAt(0).toUpperCase() +
      Country_text.value.slice(1).toLowerCase();
    GetData(countryName);
    Gettotals(countryName);
    Smoothscroll("#Countrydiv", 750);
    Country_text.blur();
    cookie(countryName);
  } else {
    alert("Please select a country from suggested");
    // autocomplete(document.getElementById("country-name"), Countries_list);
  }
}

function autocomplete(inp, arr) {
  var currentFocus;
  inp.addEventListener("click", (e) => {
    addSuggestions(
      inp,
      0,
      searches.map((s) => s.name)
    );
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
    a.setAttribute("id", this.id + "autocomplete-list");
    a.setAttribute("class", "autocomplete-items");
    inp.parentNode.appendChild(a);

    suggestions.forEach((suggestion) => {
      b = document.createElement("DIV");
      b.innerHTML = `
    <strong>${suggestion.substr(0, length)}</strong>${suggestion.substr(length)}
    <input type='hidden' value=${suggestion}>
    `;

      b.addEventListener("click", function (e) {
        e.preventDefault();
        inp.value = this.getElementsByTagName("input")[0].value;
        closeAllLists();
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
    if(e.target.id != "country-name") closeAllLists(e.target);
    // e.preventDefault();
  });
}
