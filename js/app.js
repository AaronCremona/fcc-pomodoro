var p = new Pomodoro,
	paused = true,
	a = document.getElementsByTagName("audio")[0];

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
		a.play();
	}
	else {
		paused = true;
		p.pause();
		a.pause();
	}
});

$(".a").on("click", function() {
	location.reload();
});


