var buttonColours = ["red", "blue", "green", "yellow"];

var userClickedPattern = [];
var gamePattern = [];

// game starts from here
var level = 0;
var start = false;

$(document).keypress(function () {
  if (!start) {
    $("#level-title").text("Level" + level);
    nextSequence();
    start = true;
  }
});

$(".btn").click(function () {
  // Prevent clicks until pattern is matched
  if (userClickedPattern.length === gamePattern.length) return;

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  console.log(userClickedPattern);

  playSound(userChosenColour);
  animateProcess(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");

    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("wrong");
    playSound("wrong");

    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    $("#level-title").text("Game Over, Press Any Key to Restart");

    // Reset the game
    start = false;
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
  }
}

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColour);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animateProcess(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}
