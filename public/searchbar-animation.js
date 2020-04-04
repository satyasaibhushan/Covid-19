let Search_box = document.getElementsByClassName("search-box")[0];
let Country_text = document.getElementById("country-name");

// let isTab = 580 < window.innerWidth && window.innerWidth < 1128;
// if(320<window.screen.height && window.screen.height<580) isTab=false;
// Search_box.modifySearchBox = function(toOpen) { 
//   if (this.isOpened == toOpen ||!isTab) return;
//   this.isOpened = toOpen;
//   if (toOpen) {
//     var tl = gsap.timeline();

//     tl.fromTo(
//       Search_box,
//       { width: "5%" },
//       { duration: 0.4, width: "30%" },
//       ">"
//     ).fromTo(
//       Country_text,
//       { width: "0%", opacity: 0 },
//       { duration: 0.7, width: "80%", opacity: 1 },
//       ">-0.5"
//     );

//     Country_text.focus();
//   } else {
//     var tl = gsap.timeline();

//     tl.fromTo(
//       Country_text,
//       { width: "80%", opacity: 1 },
//       { duration: 0.5, width: "0%", opacity: 0 }
//     ).fromTo(
//       Search_box,
//       { width: "30%" },
//       { duration: 0.5, width: "5%" },
//       ">-0.5"
//     );
//   }
// };

// Search_box.modifySearchBox(true && !isTab);

// Search_box.addEventListener("focusout", function(e) {
// let timer=  setTimeout(() => {
//     Search_box.modifySearchBox(false);
//   }, 1000);
//   Country_text.addEventListener('focus',_=> {
//     console.log('hi')
//     clearTimeout(timer)});
// });

