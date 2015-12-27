function Pomodoro() {
	var workTime,
		breakTime,
		timeRemaining,
		startTime,
		state = 'paused';

	function setWork (time) {
		workTime = time * 60 * 1000;
	};

	function setBreak (time) {
		breakTime = time * 60 * 1000;
	}; 

	function update() {
		var timeElapsed = Date.now() - startTime;
		timeRemaining = workTime - timeElapsed;
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
		console.log("work time: " + workTime +
			"\t\tbreak time: " + breakTime +
			"\t\tstart time: " + startTime +
			"\t\ttime remaining: " + timeRemaining);
	};
}