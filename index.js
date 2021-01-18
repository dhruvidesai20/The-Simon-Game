var buttonColours= ["red", "blue", "green", "yellow"];

var gamePattern= [];

var userClickedPattern= [];

var started= false;

var level= 1;

  $(document).keydown(function(){
    if(started!=true){

        nextSequence();

        started= true;
  };
});


function nextSequence() {
  var randomNumber= Math.floor(Math.random()*4);

  var randomChoosenColor= buttonColours[randomNumber];

  gamePattern.push(randomChoosenColor);

  userClickedPattern= [];
  console.log(gamePattern);

    $("h1").text("Level " + level);

  level++

  playSound(randomChoosenColor);
  $("." + randomChoosenColor).fadeOut(100).fadeIn(100);
}

function playSound(name) {
  var audio= new Audio("sounds/" + name + ".mp3");

  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");

  setTimeout(function(){
    $("#" + currentColor).removeClass("pressed");
  }, 100)
}

$(".btn").on("click", function() {
  var userChosenColour = $(this).attr("id");

  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);

  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);

});

function startOver(){
  gamePattern= [];

  level= 1;

  started= false;
}

function checkAnswer(currentLevel){
  if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
    console.log("congrats");
    if(gamePattern[level-2]===userClickedPattern[level-2]){
      setTimeout( nextSequence, 1000);
  }
}else{
  var wrongAudio= new Audio("sounds/wrong.mp3");
  wrongAudio.play();

  $("body").addClass("game-over");

  setTimeout(function(){
    $("body").removeClass("game-over");
  }, 200);

  $("h1").text("Game Over, Press Any Key to Restart");

  startOver();
}
}

$(".query-button").on("click", function(){
  $(".main-container").toggleClass("blur");
  $(".instructions").toggleClass("display");
  if(level== 1){
    if($(".instructions").css("display")=="block"){
      started= true;
    }else{
      started= false;
    }
  }
});
