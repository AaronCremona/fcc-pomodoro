function Pomodoro() {
	var workTime,
		breakTime,
		timeRemaining,
		startTime,
		state = 'work',
		workCycles = 0;

	function setWork (time) {
		workTime = time * 60 * 1000;
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
	}

	function update() {
		var timeElapsed = Date.now() - startTime;
		if (state === 'work') {
			timeRemaining = workTime - timeElapsed;
		}
		else if (state === 'break') {
			timeRemaining = breakTime - timeElapsed;
		}

		if (timeRemaining <= 0) {
			startTime = Date.now();
			if (state === 'work') {
				workCycles++;
				state = 'break';
			}
			else if (state === 'break') {
				state = 'work';
			}
		}

		logEverything();
	};

	this.init = function (workTime, breakTime) {
		setWork(workTime);
		setBreak(breakTime);
	};

	this.start = function() {
		startTime = Date.now();
		var timer = setInterval(update, 500);
	};

	function logEverything() {
		console.log("work time: " + toMinSec(workTime) +
			"\t\tbreak time: " + toMinSec(breakTime) +
			"\t\tstart time: " + startTime +
			"\t\ttime remaining: " + toMinSec(timeRemaining) +
			"\t\tstate: " + state +
			"\t\twork cycles: " + workCycles);
	};
}