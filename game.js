let userClickedPattern = [];
let gamePattern = [];
const buttonColours = ["red", "blue", "green", "yellow"];
let active = false;
let level = 0;

$(document).keypress(function () {
  if (active == false) {
    nextSequence();
    active = true;
    $("#level-title").text(`Level ${level}`);
  }
});

$(".btn").click(function () {
  const userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

const nextSequence = () => {
  level++;
  let randomNumber = Math.round(Math.random() * 3);
  let randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#level-title").text("Level " + level);
  $(`#${randomChosenColour}`).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
};

const playSound = (name) => {
  let audio = new Audio(`./sounds/${name}.mp3`);
  audio.play();
};

const animatePress = (currentColour) => {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
};

const checkAnswer = (currentLevel) => {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userClickedPattern.length == gamePattern.length) {
      setTimeout(() => {
        nextSequence();
        userClickedPattern = [];
      }, 1000);
    }
    console.log("Success");
  } else {
    $("body").addClass("game-over");
    setTimeout(() => {
      $("body").removeClass("game-over");
    }, 200);
    let audio = new Audio(`./sounds/wrong.mp3`);
    audio.play();
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
};

const startOver = () => {
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  active = false;
};
