function Pomodoro() {
	var workTime,
		breakTime,
		timeRemaining,
		percentRemaining = 100,
		lastTime,
		timer,
		state = 'work',
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

	function setWork (time) {
		workTime = time * 60 * 1000;
		timeRemaining = workTime;
	};

	function setBreak (time) {
		breakTime = time * 60 * 1000;
	};

	function toMinSec(time)  {
		time = time / 1000;
		var sec = "0" + Math.floor(time % 60);
		var min = Math.floor(time / 60);
		sec = sec.slice(-2);
		return min + ":" + sec;
	};

	function update() {
		var currTime = Date.now();
		var timeElapsed = currTime - lastTime;
		timeRemaining -= timeElapsed;

		if (state === 'work') {
			totalTime += timeElapsed;
			percentRemaining = 100 - ((workTime - timeRemaining) / workTime * 100);
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

		logEverything();
		updateDom();
	};

	this.init = function (params) {
		setWork(params.workTime);
		setBreak(params.breakTime);
		workRemainingId = params.workRemainingId;
		breakRemainingId = params.breakRemainingId;
		totalTimeId = params.totalTimeId;
		lifeContainer = params.lifeContainer;
		targetId = workRemainingId;
		console.log("time remaining initial value: " + timeRemaining);
	};

	this.start = function() {
		lastTime = Date.now();
		update();
		timer = setInterval(update, 100);
		workAudio.play();
	};

	this.pause = function() {
		clearInterval(timer);
		workAudio.pause();
	};

	this.reset = function() {
		this.pause();
		totalTime = 0;
		changeState('work');
		$(lifeContainer).html("");
		addHeart();
	};

	function logEverything() {
		console.log("work time: " + toMinSec(workTime) +
			"\t\tbreak time: " + toMinSec(breakTime) +
			"\t\ttime remaining: " + toMinSec(timeRemaining) +
			"\t\tstate: " + state +
			"\t\twork cycles: " + workCycles +
			"\t\tpercent remaining: " + percentRemaining);
	};

	function updateDom() {
		$(targetId).text(toMinSec(timeRemaining));
		if (state === 'work'){
			$(totalTimeId).text(toMinSec(totalTime));
			clipPath = "inset(0 " + percentRemaining + "% 0 0)"
			$('.partial').css("clip-path", clipPath);
			$('.partial').css("-webkit-clip-path", clipPath);
		}
	};

	function changeState(newState) {
		$(targetId).text("--:--");
		$(targetId).css("color", "grey");

		state = newState;

		if (state === 'work') {
			targetId = workRemainingId;
			$(targetId).css("color", "green");
			timeRemaining = workTime;
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

	function addHeart() {
		$('.partial').removeClass("partial");
		$(lifeContainer).append("<div class='empty'><div class='full partial'></div></div>");
	}
}