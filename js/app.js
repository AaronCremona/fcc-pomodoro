var p = new Pomodoro,
	paused = true;

p.init({
	workTime: .1, 
	breakTime: .1, 
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
	p.reset();

	if (!paused) {  //if not paused
		$(".b i").toggleClass("hidden");

		paused = true;
	}

});


