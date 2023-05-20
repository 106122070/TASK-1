
let foodX, foodY;
let foodX1, foodY1;
let foodX2, foodY2;
let timepl = 60;
let snakeX = 5, snakeY = 5;
let snakeX1 = 6,snakeY1=5,snakeX3=8,snakeY3 = 5,snakeX2 = 7,snakeY2 = 5;
let velocityX = 0, velocityY = 0;
let snakeBody = [[snakeY,snakeY],[snakeX1,snakeY1],[snakeX2,snakeY2],[snakeX3,snakeY3]] ;
let playb = document.querySelector(".play-board");
let playb1 = document.querySelector("#play-board1");
let scoreElement = document.querySelector(".score");
let highsc = document.querySelector(".high-score");
let controls = document.querySelectorAll(".controls i");
let gover = false;
let setIntervalId;
var food00 = document.getElementById('food');
var food11 = document.getElementById('food1');
var food22 = document.getElementById('food2');
var displayfood =[ ["red","blue","orange"],["blue","orange","red"],["red","orange","blue"],["orange","red","blue"],["blue","red","orange"],["orange","blue","red"]];
let foodarr = [[foodX2,foodY2],[foodX1,foodY1],[foodX,foodY]];
let timefun = document.getElementById('time1');
let score = 0;
let html;
let ht;
/* document.getElementById('bo1').style.gridTemplate =` repeat(${5}, 1fr) / repeat(${5}, 1fr)`; */
// displaying the time
var display = document.getElementById('display1');
let stmin = 1;
let time = stmin * 60;

let cout = 0;
/* var fodis = Math.floor(Math.random()*6);
display.innerText = `${displayfood[fodis][0]} ${displayfood[fodis][1]} ${displayfood[fodis][2]}`;  */
function fooddisplay(){
       /*  if (snakeX === foodX && snakeY === foodY){
            food00.style.backgroundColor = ' &#212837';
        }
        if (snakeX === foodX1 && snakeY === foodY1){
            food11.style.backgroundColor = ' &#212837';
        }
        if (snakeX === foodX2 && snakeY === foodY2){
            food22.style.backgroundColor = ' &#212837';
        } */
        cout++;
        if (cout === 3){
            updateFoodPosition();
            /* updateFoodPosition1();
            updateFoodPosition2(); */
            cout = 0;
        } 
    } 

// To display the time
function timeplay() {
    let minutes = Math.floor(time/ 60);
    let second = time % 60 ;
    second = second < 10 ? '0'+ second :second ;
    timefun.innerHTML = `Time:: ${minutes}:${second} sec`;
    time--;
    if (time === 0){
        return handleGameOver();
    }
} 

// Getting high score from the local storage

let highScore = localStorage.getItem("high-score") || 0;
highsc.innerText = `High Score: ${highScore}`;

function updateFoodPosition(){

    // Passing a random 1 - 25 value as food position

    foodX = Math.floor(Math.random() * 25) + 1;
    foodY = Math.floor(Math.random() * 25) + 1;
}
/* function updateFoodPosition1(){

    // Passing a random 1 - 25 value as food position

    foodX1 = Math.floor(Math.random() * 25) + 1;
    foodY1 = Math.floor(Math.random() * 25) + 1;
}
function updateFoodPosition2(){

    // Passing a random 1 - 25 value as food position

    foodX2 = Math.floor(Math.random() * 25) + 1;
    foodY2 = Math.floor(Math.random() * 25) + 1;
} */
function handleGameOver(){
    // Clearing the timer and reloading the page on game over
    clearInterval(setIntervalId);
    alert("Game Over! Press OK to replay...");
    location.reload();
}

let leaderboardData = [];
const name11 = document.getElementById('name1');
const score11 = document.getElementById('score1');
const leaderbutton = document.getElementById('leader-btn');
// for adding and updating the leaderboard
leaderbutton.addEventListener("click", () => {
    const namee = name11.value;
    const scoree = parseInt(score11.value);
    const namenew = `${namee}`;
  leaderboardData.push({namenew, scoree });
  sortLeaderboard();
  updateleaboard();
  saveleaderdata();

});
function sortLeaderboard() {
  leaderboardData.sort((a, b) => b.scoree - a.scoree);
}

function updateleaboard() {
  const leaderboardBody = document.getElementById('leaderboard-body');
  leaderboardBody.innerHTML = '';

    leaderboardData.forEach((entry, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${index + 1}</td>
          <td>${entry.namenew}</td>
          <td>${entry.scoree}</td>
        `;
        leaderboardBody.appendChild(row);
      });
    }


//  Implement the local storage
function saveleaderdata() {
  localStorage.setItem('leaderboardData', JSON.stringify(leaderboardData));
}

function loadLeaderboardData() {
  const storedData = localStorage.getItem('leaderboardData');
  if (storedData)
   {
    leaderboardData = JSON.parse(storedData);
    updateleaboard();
  }
}
loadLeaderboardData();

// starting the timer when game start
if (document.addEventListener("keyup", changeDirection)){
    timeplay();
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
var html1;

// main game center
function initGame(){

    if(gover) 
    {
        return handleGameOver();
    }
    html = `<div id="food" style="grid-area: ${foodY} / ${foodX}"></div>`;
   /*  html += `<div id="food1" style="grid-area: ${foodY1} / ${foodX1}"></div>`;
    html += `<div id="food2" style="grid-area: ${foodY2} / ${foodX2}"></div>`; */

    // Checking if the snake hit the food
    var l = 0;
     if((snakeX === foodX && snakeY === foodY) || (snakeX === foodX1 && snakeY === foodY1) || (snakeX === foodX2 && snakeY === foodY2)) {
        snakeBody.push([foodX,foodY]);
        score++; // increment score by 1
        highScore = score >= highScore ? score : highScore;
        localStorage.setItem("high-score", highScore);
        scoreElement.innerText = `Score: ${score}`;
        highsc.innerText = `High Score: ${highScore}`;
        l++;
        updateFoodPosition();
        /* fooddisplay(); */
 /*        if(l==3 ){
         fodis = Math.floor(Math.random()*6);
        display.innerText = `${displayfood[fodis][0]} ${displayfood[fodis][1]} ${displayfood[fodis][2]}`; 
        l = 0;
        
    } */
}
      
    
    
    // Updating the snake's head position based on the current velocity
    snakeX += velocityX;
    snakeY += velocityY;
    
    // Shifting forward the values of the elements in the snake body by one
    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    } 

    // Setting up thr first element of snake body to current snake position
    snakeBody[0] = [snakeX,snakeY];

    // Checking if the snake head is out of wall, if so setting gameOver to true
    function snakehitwall(){
    if(snakeX <= 0 || snakeX > 25 || snakeY <= 0 || snakeY > 25) {

        return gover = true;

    }}
    var point = 0;
 /* foodarr.forEach((e) =>{
        
    
         if (snakeX === foodX && snakeY === foodY && e === 2 ){
            foodarr.splice(e,1);
            console.log(foodarr);
            snakeBody.push([foodX,foodY]);
            point++;
            score++;
        }}); */
       /*  if (snakeX === foodX1 && snakeY === foodY1){
           
            point++;
            score++;
            snakeBody.push([foodX,foodY]);
        }
        if (snakeX === foodX2 && snakeY === foodY2){
            
            point++;
            score++;
            snakeBody.push([foodX,foodY]);
        } 
        scoreElement.innerText = `Score: ${score}`;
        if ( point === 3){ 
           
            point =0;
            fooddisplay();
    }
    
    displayfood1(); */ 
    snakehitwall();
    for (let i = 0; i < snakeBody.length; i++) {

        // Adding a div for each part of the snake's body
        html += `<div class="head" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;
    }
        // Checking the snake head hit the body, if so set gameOver to true
        function snakehitbody(){
        for (let i = 4; i < snakeBody.length; i++) {
        if (i !== 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]) 
        
            gover = true;
        }}
        snakehitbody();
    playb.innerHTML = html;
}


updateFoodPosition();
/* updateFoodPosition1();
updateFoodPosition2(); */

setIntervalId = setInterval(initGame, 100);
settime = setInterval(timeplay,1000);
document.addEventListener("keyup", changeDirection);