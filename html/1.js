/* let  foodX , foodY ;

const change = () => {
    foodX = Math.floor(Math.random()*20) + 1;
    foodY = Math.floor(Math.random()*20) + 1;
}

const  initategame = () => {
  const play1 =  document.querySelector(".play-board");
    let html1 = `<div class="food" style="grid-area: ${foodX} / ${foodY}"></div>`;
    play1.innerHTML = html1;
}

change();
initategame(); */

let foodX ,foodY ;
let snakeX = 12, snakeY = 10 ;
let snakebody = [];
let score = 0;
let highscore = 0;
let velocityX = 0,velocityY = 0;

function change(){
    foodX = Math.floor(Math.random()*30) + 1;
    foodY = Math.floor(Math.random()*30) + 1;
}

function changedirection(e) {
    if (e.code === "ArrowRight" )
    {
        velocityX = 1;
        velocityY = 0;
    }
    else if (e.code === "ArrowLeft"  )
    {
        velocityX  = -1;
        velocityY = 0;
    }
    else if (e.code === "ArrowUp" )
    {
        velocityX  = 0;
        velocityY = -1;
    }
    else if (e.code === "ArrowDown")
    {
        velocityX  = 0;
        velocityY = 1;
    }
    initategame();
}

function  initategame() {
    let play1 = document.querySelector(".play-board");
    let score1 = document.getElementById("score-el");
    let highscore1 = document.getElementById("high-el");
    let html1 =`<div class="food" style="grid-area: ${foodX} / ${foodY}"></div>` ;
   /*  html1 += `<div class="head" style="grid-area: ${snakeX} / ${snakeY}"></div>` ;
    play1.innerHTML = html1;  */
    score1.innerHTML = "Score No :: " + score ;
    highscore1.innerHTML = "High Score :: " + highscore ;

    if (snakeX == foodX && snakeY == foodY)
    {
        snakebody.push([foodX,foodY]);
        change();
        console.log(snakebody);
        score += 1;
        if (score > highscore){
            highscore += 1;
        }
    }
     for ( let i = snakebody.length - 1 ;i > 0;i--)
    { // joining the tail to snake head 
    snakebody[i] = snakebody[i-1];
    }
    // setting initial position of snake head to the list 
     snakebody[0] = [snakeX,snakeY];

    snakeX += velocityX;
    snakeY += velocityY;

    for (let i = 0 ;i < snakebody.length ; i++)
    { // adding div elemnents 
     html1 += `<div class="head" style = "grid-area: ${snakebody[i][1]} / ${snakebody[i][0]}"></div>`;
    }
    play1.innerHTML = html1;

}

change();
setInterval(initategame,120);
document.addEventListener("keydown",changedirection);


