function Pomodoro() {
	var workTime,
		breakTime,
		timeRemaining,
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
		targetId;

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
		timer = setInterval(update, 1000);
	};

	this.pause = function() {
		clearInterval(timer);
	};

	function logEverything() {
		console.log("work time: " + toMinSec(workTime) +
			"\t\tbreak time: " + toMinSec(breakTime) +
			"\t\ttime remaining: " + toMinSec(timeRemaining) +
			"\t\tstate: " + state +
			"\t\twork cycles: " + workCycles);
	};

	function updateDom() {
		$(targetId).text(toMinSec(timeRemaining));
		if (state === 'work'){
			$(totalTimeId).text(toMinSec(totalTime));
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
		}
		else {
			targetId = breakRemainingId;
			$(targetId).css("color", "red");
			timeRemaining = breakTime;
		}

		
	}
}