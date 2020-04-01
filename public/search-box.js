Country_text.addEventListener("keypress", function(e) {
  if (e.key === "Enter") {
    if (SearchArray(Country_text.value, Countries_list) != -1) {
      GetData(Country_text.value);
      Gettotals(Country_text.value);
      Smoothscroll(".search-box", 500);
    } else {
      // country.innerHTML ="";
      // casesChart.clearCanvas();
      // deathChart.clearCanvas();
      alert("no Country exists with such name, Try again");
    }
  }
});

Country_text.addEventListener("click", function(e) {
  Smoothscroll(".search-box", 500);
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
