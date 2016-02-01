var p = new Pomodoro,
paused = true,
workTime = 25,
breakTime = 5,
started = false;

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

    if (started === false) {
      started = true;
    }
  }
  else {
    paused = true;
    p.pause();
  }
});

$(".a").on("click", function() {
  $(".settings").slideToggle( "fast" );
});

$("#work-up").on("click", function() {
  changeWork(1);
});

$("#work-down").on("click", function() {
  if (workTime > 1) {
    changeWork(-1);
  }
});

$("#break-up").on("click", function() {
  changeBreak(1);
});

$("#break-down").on("click", function() {
  if (breakTime > 1) {
    changeBreak(-1);
  }
});

function changeWork(change) {
  workTime += change;
  p.changeWorkTime(workTime);
  if (!started) {
    $("#time-remaining").text(workTime + ":00");
  }

  $("#workSetting").text(workTime + ":00");
}

function changeBreak(change) {
  breakTime += change;
  p.changeBreakTime(breakTime);
  $("#breakSetting").text(breakTime + ":00");
}