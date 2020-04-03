function modifySearchBox() {
  if (Search_box.classList.contains("open")) {
    var tl = gsap.timeline();

    tl.fromTo(
      Search_box,
      { width: "5%" },
      { duration: 0.4, width: "30%" },
      ">"
    ).fromTo(
      Country_text,
      { width: "0%", opacity: 0 },
      { duration: 0.7, width: "80%", opacity: 1 },
      ">-0.5"
    );

    Country_text.focus();
  } else {
    var tl = gsap.timeline();

    tl.fromTo(
      Country_text,
      { width: "80%", opacity: 1 },
      { duration: 0.5, width: "0%", opacity: 0 }
    ).fromTo(
      Search_box,
      { width: "30%" },
      { duration: 0.5, width: "5%" },
      ">-0.5"
    );
  }
}
modifySearchBox();
