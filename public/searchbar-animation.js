leftArrow = document.getElementsByClassName("leftarrow")[0];
rightArrow = document.getElementsByClassName("rightarrow")[0];

leftArrow.addEventListener("click", function(e) {
  console.log("hi");
  Search_box.classList.add("open");
  modifySearchBox();
});

rightArrow.addEventListener("click", function(e) {
  Search_box.classList.remove("open");
  modifySearchBox();
});

function modifySearchBox() {
  if (Search_box.classList.contains("open")) {
    var tl = gsap.timeline();

    tl.fromTo(
      leftArrow,
      { opacity: 1, x: -19 },
      { duration: 0.5, opacity: 0, x: 0, ease: Power2.easeInOut }
    )
      .fromTo(
        Search_box,
        { width: "5%" },
        { duration: 0.7, width: "30%", ease: Power2.easeInOut },
        ">-0.5"
      )
      .fromTo(
        Country_text,
        { width: "0%", opacity: 0 },
        { duration: 1, width: "80%", opacity: 1, ease: Power2.easeInOut },
        ">-0.5"
      )
      .fromTo(
        rightArrow,
        { opacity: 0, x: 30 },
        { duration: 0.5, opacity: 1, x: 60, ease: Power2.easeInOut },
        ">-0.5"
      );

    leftArrow.style.pointerEvents = "none";
    rightArrow.style.pointerEvents = "auto";
  } else {
    var tl = gsap.timeline();

    tl.fromTo(
      rightArrow,
      { opacity: 1, x: 19 },
      { duration: 0.5, opacity: 0, x: 30, ease: Power2.easeInOut }
    )
      .fromTo(
        Country_text,
        { width: "80%", opacity: 1 },
        { duration: 0.5, width: "0%", opacity: 0, ease: Power2.easeInOut }
      )
      .fromTo(
        Search_box,
        { width: "30%" },
        { duration: 0.7, width: "5%", ease: Power2.easeInOut },
        ">-0.5"
      )
      .fromTo(
        leftArrow,
        { opacity: 0, x: 40 },
        { duration: 0.5, opacity: 1, x: -19, ease: Power2.easeInOut },
        ">-0.5"
      );

    rightArrow.style.pointerEvents = "none";
    leftArrow.style.pointerEvents = "auto";
  }
}
modifySearchBox();
