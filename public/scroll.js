window.addEventListener('load',function(){
  let loader = document.getElementsByClassName('loader')[0];
  loader.classList.add('hidden');
})

async function Smoothscroll(target, duration) {
  await waitFor(200)
  
  var target = document.querySelector(target);
  var targetPosition = target.getBoundingClientRect().top;
  var startPosition = window.pageYOffset;
  var distance = targetPosition - startPosition;
  var startTime = null;

  function animation(currentTime) {
    if (startTime == null) startTime = currentTime;
    var timeElapsed = currentTime - startTime;
    var run = ease(timeElapsed, startPosition, targetPosition, duration);
    window.scrollTo(0, run);
    if (timeElapsed < duration) {
      requestAnimationFrame(animation);
    }
    // console.log(timeElapsed,duration)
  }

  function ease(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t + b;
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
  }
  requestAnimationFrame(animation);
}

let topBtn = document.getElementsByClassName("gotop")[0];
topBtn.addEventListener("click", function() {
  Smoothscroll("#world_heading", 600);
});
window.onscroll = function() {
  if (window.scrollY > 250) {
    topBtn.classList.remove("hidebtn");
  } else {
    topBtn.classList.add("hidebtn");
  }
};

function waitFor(time) {
  return new Promise((resolve,_) => {
    setTimeout(resolve, time);
  })
}