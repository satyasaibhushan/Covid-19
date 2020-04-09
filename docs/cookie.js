var searches = new Array;
if (getCookie('countryName') != "") searches =JSON.parse(getCookie("countryName"));
searches.forEach((element) => {
  element.timestamp = new Date(element.timestamp)
});

function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function cookie(value){
  let index = searches.findIndex(element => element.name == value)
  if(index == -1)
   {
  if(searches.length<4) searches.push(new Object());
   searches[searches.length-1].name = value;
   searches[searches.length-1].timestamp=new Date();
   }
  else searches[index].timestamp = new Date(); 
  
  searches.sort(function(a,b){
    if (a.timestamp.getTime()>b.timestamp.getTime())
    return -1;
    else return 1;
  })
 setCookie("countryName",JSON.stringify(searches),2)

}

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

