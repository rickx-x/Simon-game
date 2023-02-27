const colors  = ["green" , "red" , "yellow" , "blue"];
let gameSequence = [];
let userClicks =[];
let started = false;
let lev = 0;

//at start as soon as someone clicks on the page the game should start
//---------
$(document).keydown(()=>{
    if(!started){
        $("#level-title").text("Level "+ lev);
        nextSequence();
        started = true;
    }
})


//---------
function nextSequence(){
    userClicks =[];
    lev++;
    $("#level-title").text("Level "+ lev);
    randomGeneratedColor = colors[Math.floor(Math.random() * 4)];
    gameSequence.push(randomGeneratedColor);
    $("#" +randomGeneratedColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomGeneratedColor)

}

$(".btn").click(function(){
    let userClickedColor = $(this).attr("id");
    userClicks.push(userClickedColor);

    playSound(userClickedColor);
    animatePress(userClickedColor);

    checkAnswer(userClicks.length-1)
})


function checkAnswer(currentLevel){
  if (gameSequence[currentLevel] === userClicks[currentLevel]) {
        if (userClicks.length === gameSequence.length){
          setTimeout(function () {
            nextSequence();
          }, 1000);
        }
      } else {
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");
  
        setTimeout(function () {
          $("body").removeClass("game-over");
        }, 200);
  
        startOver();
      }
}
//  animation on clicking the button and sounds

function animatePress(name){
    $("#" + name).fadeTo(100, 0.3, function() { $(this).fadeTo(500, 1.0); });
}

function playSound(name){
    let audio = new Audio("sounds/"+ name +".mp3");
    audio.play();
}

function startOver() {
    lev = 0;
    gameSequence = [];
    started = false;
  }