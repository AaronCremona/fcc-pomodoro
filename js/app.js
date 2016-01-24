var p = new Pomodoro;

p.init({
	workTime: .1, 
	breakTime: .1, 
	workRemainingId: "#time-remaining", 
	breakRemainingId: "#break-remaining",
	totalTimeId: "#total",
	lifeContainer: "#hearts"
	});

p.start();
