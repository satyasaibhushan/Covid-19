function Smoothscroll(target , duration){
    var target = document.querySelector(target);
    var targetPosition = target.getBoundingClientRect().top;
    var startPosition = window.pageYOffset;
    var distance = targetPosition - startPosition;
    var startTime = null;

    function animation(currentTime){
        if(startTime == null) startTime = currentTime;
        var timeElapsed = currentTime-startTime;
        var run = ease(timeElapsed,startPosition,targetPosition,duration)
        window.scrollTo(0,run);
        if(timeElapsed<duration){ 
            requestAnimationFrame(animation);
            console.log('hi');
        }
        // console.log(timeElapsed,duration)
    }
 
    function ease(t,b,c,d){
        t /= d/2;
        if(t<1) return c/2 * t* t +b;
        t--;
        return -c/2 *(t*(t-2)-1)+b;
    }
    // animation();
    // if(timeElapsed<duration){ 
    //     requestAnimationFrame(animation);
    //     console.log('hi2')
    // }
    console.log(targetPosition,startPosition,distance,startTime)
    // if(distance>0)
    requestAnimationFrame(animation);
}

