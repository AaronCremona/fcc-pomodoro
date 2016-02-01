function Pomodoro() {
    var initWorkTime,
        timeRemaining,
        percentRemaining = 100,
        lastTime,
        timer,
        state = 'work',
        firstStart = true,
        workCycles = 0,
        workTime,
        breakTime,
        workRemainingId,
        breakRemainingId,
        totalTimeId,
        totalTime = 0,
        lifeContainer,
        targetId,
        workAudio = document.getElementsByTagName("audio")[0],
        finishedAudio = document.getElementsByTagName("audio")[1];

    function setWork(time) {
        workTime = time * 60 * 1000;
    }

    function setBreak(time) {
        breakTime = time * 60 * 1000;
    }

    function toMinSec(time) {
        time = time / 1000;
        var sec = "0" + Math.floor(time % 60),
            min = Math.floor(time / 60);
        sec = sec.slice(-2);
        return min + ":" + sec;
    }

    this.init = function (params) {
        setWork(params.workTime);
        setBreak(params.breakTime);
        workRemainingId = params.workRemainingId;
        breakRemainingId = params.breakRemainingId;
        totalTimeId = params.totalTimeId;
        lifeContainer = params.lifeContainer;
        targetId = workRemainingId;
    }

    this.changeWorkTime = function (newTime) {
        setWork(newTime);
    }

    this.changeBreakTime = function (newTime) {
        setBreak(newTime);
    }

    this.start = function() {
        if (firstStart) {
            timeRemaining = workTime;
            initWorkTime = timeRemaining;
            firstStart = false;
        }
        paused = false;
        lastTime = Date.now();
        update();
        timer = setInterval(update, 100);
        workAudio.play();
    }

    this.pause = function() {
        clearInterval(timer);
        workAudio.pause();
        paused = true;
    }

    function changeState(newState) {
        $(targetId).text("--:--");
        $(targetId).css("color", "grey");

        state = newState;

        if (state === 'work') {
            targetId = workRemainingId;
            $(targetId).css("color", "green");
            timeRemaining = workTime;
            initWorkTime = timeRemaining;
            addHeart();
            workAudio.play();
        }
        else {
            targetId = breakRemainingId;
            $(targetId).css("color", "red");
            timeRemaining = breakTime;
            workAudio.pause();
            finishedAudio.play();
        }

        updateDom();		
    }

    function update() {
        var currTime = Date.now();
        var timeElapsed = currTime - lastTime;
        timeRemaining -= timeElapsed;

        if (state === 'work') {
            totalTime += timeElapsed;
            percentRemaining = 100 - ((initWorkTime - timeRemaining) / workTime * 100);
        }

        lastTime = currTime;

        if (timeRemaining <= 0) {
            if (state === 'work') {
                workCycles++;
                changeState('break');
            }
            else if (state === 'break') {
                changeState('work');
            }
        }

        updateDom();
    }

    function updateDom() {
        $(targetId).text(toMinSec(timeRemaining));
        if (state === 'work'){
            $(totalTimeId).text(toMinSec(totalTime));
            clipPath = "inset(0 " + percentRemaining + "% 0 0)"
            $('.partial').css("clip-path", clipPath);
            $('.partial').css("-webkit-clip-path", clipPath);
        }
    }

    function addHeart() {
        $('.partial').removeClass("partial");
        $(lifeContainer).append("<div class='empty'><div class='full partial'></div></div>");
    }

}