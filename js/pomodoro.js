function Pomodoro() {
	var workTime,
		breakTime,
		timeRemaining,
		startTime,
		state = 'work';

	function setWork (time) {
		workTime = time * 60 * 1000;
	};

	function setBreak (time) {
		breakTime = time * 60 * 1000;
	};

	function toMinSec(time)  {
		time = time / 1000;
		var sec = Math.floor(time % 60);
		var min = Math.floor(time / 60);
		return min + ":" + sec;
	}

	function update() {
		var timeElapsed = Date.now() - startTime;
		if (state === 'work') {
			timeRemaining = workTime - timeElapsed;
		}
		if (state === 'break') {
			timeRemaining = breakTime - timeElapsed;
		}
		logEverything();
	};

	this.start = function() {
		startTime = Date.now();
		var timer = setInterval(update, 1000);
		state = 'work';
	};

	this.init = function (workTime, breakTime) {
		setWork(workTime);
		setBreak(breakTime);
	};

	function logEverything() {
		console.log("work time: " + toMinSec(workTime) +
			"\t\tbreak time: " + toMinSec(breakTime) +
			"\t\tstart time: " + startTime +
			"\t\ttime remaining: " + toMinSec(timeRemaining) +
			"\t\tstate: " + state);
	};
}