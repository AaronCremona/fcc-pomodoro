var p = new Pomodoro,
	paused = true;

p.init({
	workTime: 25, 
	breakTime: 5, 
	workRemainingId: "#time-remaining", 
	breakRemainingId: "#break-remaining",
	totalTimeId: "#total",
	lifeContainer: "#hearts"
	});

$(".b").on("click", function() {
	$(".b i").toggleClass("hidden");

	if (paused) {
		paused = false;
		p.start();
	}
	else {
		paused = true;
		p.pause();
	}
});

$(".a").on("click", function() {
	// show / hide settings
});

$("#work-up").on("click", function() {
	console.log("work up");
});
$("#work-down").on("click", function() {
	console.log("work down");
});

$("#break-up").on("click", function() {
	console.log("break up");
});
$("#break-down").on("click", function() {
	console.log("break down");
});


