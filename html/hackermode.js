
let foodX, foodY;
let timepl = 60;
let snakeX = 5, snakeY = 5;
let snakeX1 = 6,snakeY1=5,snakeX3=8,snakeY3 = 5,snakeX2 = 7,snakeY2 = 5;
let velocityX = 0, velocityY = 0;
let snakeBody = [[snakeY,snakeY],[snakeX1,snakeY1],[snakeX2,snakeY2],[snakeX3,snakeY3]] ;
let playb = document.querySelector("#play-board");
let scoreElement = document.querySelector(".score");
let highsc = document.querySelector(".high-score");
let controls = document.querySelectorAll(".controls i");
var nolives = 0;
var heart = '&#128147';
var heartb = '&#128148';
let gover = false;
let timefun = document.querySelector("#time1");
let lifebar = document.querySelector(".life1");
var lives = 0;
let setIntervalId;
let soundsna;
let score = 0;
const container1 = document.getElementById('play-board')
const gsizein = document.getElementById('gridsize1');
const grbutton = document.getElementById('grid-button');

var strings = ["red","orange","blue","violet"];
let stmin = 1;
let time = stmin * 60;
// adding lifes to the snake
let gridsize = 25;
/* container1.style.gridTemplateColumns = `repeat(${gridsize},1fr) `;
container1.style.gridTemplateRows = `repeat(${gridsize},1fr) `; */
grbutton.addEventListener("click",()=>{
    const newgrid = parseInt(gsizein.value);
    gridsize = newgrid;
    container1.style.gridTemplateColumns = `repeat(${gridsize},1fr) `;
    container1.style.gridTemplateRows = `repeat(${gridsize},1fr) `;
})
function life(){
    lives++;
    if (lives === 1){
        lifebar.innerHTML = `LIFE : ${heart} ${heart} ${heartb} `}
        if (lives === 2){
            lifebar.innerHTML = `LIFE : ${heart} ${heartb} ${heartb} `}
                if (lives === 3){
                    handleGameOver();
       lives = 0;
      }
}

function soundsnake1(){
    snsound = document.getElementById("snakesound");
        if(snakeX === foodX && snakeY === foodY){
            snsound.play();
            soundsna = setInterval(soundsnake1,10);
}}

/* function displayfood(text,strings){
    for (let v = 0;v<strings.length;v++){
    var foodelement =document.createElement('div'); 
    foodelement.style.gridColumnStart = strings[z].y;
    foodelement.style.gridRowStart = strings[z].x;
    
    }
} */
/*  function lifesave() {
     for (let i = 1+lives;i<=3;i++){
        document.getElementById('life-${i}').style.display = "none";
     }
}

function looselife(){
     lives -- ;
   lifebar = document.getElementById('life-${lives + i}').style.display = "none";
    lifebar.innerText = "life :: "
}  */
// to pause the game
let paused = false;
const pauseButton = document.getElementById('pause1');

pauseButton.addEventListener('click', function() {
  if (!paused) {
    paused = true;
    clearInterval(setIntervalId);
    clearInterval(settime);
    pauseScreen.style.display = 'block';
  } 
  else {
    paused = false;
    setIntervalId = setInterval(initGame, 100);
    settime = setInterval(timeplay,1000);
    pauseScreen.style.display = 'none';
  }
});


// To display the time
function timeplay() {
    let minutes = Math.floor(time/ 60);
    let second = time % 60 ;
    second = second < 10 ? '0'+ second :second 
    timefun.innerHTML = `Time:: ${minutes}:${second} sec`;
    time--;
    if (time === 0){
        return handleGameOver();
    }
    /* if (40 <= time <=50){
        setIntervalId = setInterval(initGame,50);
    } */
}  

// Getting high score from the local storage

let highScore = localStorage.getItem("high-score") || 0;
highsc.innerText = `High Score: ${highScore}`;

function updateFoodPosition(){

    // Passing a random 1 - 25 value as food position
    foodX = Math.floor(Math.random() * 25) + 1;
    foodY = Math.floor(Math.random() * 25) + 1;
}

function handleGameOver(){
    // Clearing the timer and reloading the page on game over
    clearInterval(setIntervalId);
    alert("Game Over! Press OK to replay...");
    location.reload();
}

function changeDirection(e) {
    // Changing velocity value based on key press
    if(e.key === "ArrowUp" && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    } else if(e.key === "ArrowDown" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    } else if(e.key === "ArrowLeft" && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    } else if(e.key === "ArrowRight" && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    }
}
// Calling changedirection to obtain the key elements
controls.forEach(button => button.addEventListener("click", () => changeDirection({ key: button.dataset.key }))); 

// main game center
function initGame(){
    soundsnake1();

    if(gover) 
    {
        return handleGameOver();
    }
    let html = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;

    // Checking if the snake hit the food

    if(snakeX === foodX && snakeY === foodY) {
        updateFoodPosition();
        snakeBody.push([foodX,foodY]); // Pushing food position to snake body array
        score++; // increment score by 1
        highScore = score >= highScore ? score : highScore;
        localStorage.setItem("high-score", highScore);
        scoreElement.innerText = `Score: ${score}`;
        highsc.innerText = `High Score: ${highScore}`;
    }
    // Updating the snake's head position based on the current velocity
    snakeX += velocityX;
    snakeY += velocityY;
    
    // Shifting forward the values of the elements in the snake body by one
    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    } 
    // Setting first element of snake body to current snake position
    snakeBody[0] = [snakeX,snakeY];

    // Checking if the snake's head is out of wall, if so setting gameOver to true
    
    function snakehitwall(){
    if(snakeX < 0 || snakeX > 25 || snakeY < 0 || snakeY > 25) {
        life();
       /*  return gover = true; */
    }}

    snakehitwall();

    for (let i = 0; i < snakeBody.length; i++) {

        // Adding a div for each part of the snake's body

        html += `<div class="head" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;
    }

        // Checking the snake head hit the body, if it so set gameOver to true

        function snakehitbody(){
        for (let i = 4; i < snakeBody.length; i++) {
        if (i !== 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0])
              lives();
        /* return gover = true; */
        }}
        snakehitbody();
    playb.innerHTML = html;
}

updateFoodPosition();

setIntervalId = setInterval(initGame, 80);
settime = setInterval(timeplay,1000);
document.addEventListener("keyup", changeDirection);