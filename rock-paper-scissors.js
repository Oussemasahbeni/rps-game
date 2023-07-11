console.log(JSON.parse(localStorage.getItem('score')));
let score = JSON.parse(localStorage.getItem('score')) || { wins: 0, losses: 0, ties: 0 }; // if object is null we create the object

/* if (!score) { //  the same as score===null 
    score = {
        wins: 0,
        losses: 0,
        ties: 0
    }
} */
updateScore();


// we use addeventListener instead if the onclick

const rockButton=document.querySelector('.js-rock-btn');
const paperButton=document.querySelector('.js-paper-btn');
const scissorsButton=document.querySelector('.js-sissors-btn');
const playButton=document.querySelector('.js-play');
const resetButton=document.querySelector('.js-reset')

playButton.addEventListener('click',()=>{
    autoPlay();
})

resetButton.addEventListener('click',()=>{
    reset();
    updateScore();
})


rockButton.addEventListener('click',()=>{
    playGame('rock');
})

paperButton.addEventListener('click',()=>{
    playGame('paper');
})

scissorsButton.addEventListener('click',()=>{
    playGame('scissors');
})

document.body.addEventListener('keydown',(event)=>{
    // if we type key in the board this function works
    if(event.key==='r'){
        playGame('rock');
    }
    else if(event.key==='p'){
        playGame('paper');
    }
    else if(event.key==='s'){
        playGame('scissors');
    }
    else if(event.key==='a'){
        autoPlay();
    }

    else if(event.key==='Backspace'){
        showConfirm();
    }
    
    
});

function playGame(playerMove) {
    let result = '';
    pickComputerMove();
    const computerMove = pickComputerMove();
    if (playerMove === 'scissors') {
        if (computerMove === 'rock') {
            result = 'You Lost!';
        }
        else if (computerMove === 'paper') {
            result = 'You Win!'
        }
        else if (computerMove === 'scissors') {
            result = 'Tie!';
        }
    }
    else if (playerMove === 'paper') {
        if (computerMove === 'rock') {
            result = 'You Win!';
        }
        else if (computerMove === 'paper') {
            result = 'Tie!'
        }
        else if (computerMove === 'scissors') {
            result = 'You Lost!';
        }
    }
    else if (playerMove === 'rock') {
        if (computerMove === 'rock') {
            result = 'Tie!';
        }
        else if (computerMove === 'paper') {
            result = 'You Lost!'
        }
        else if (computerMove === 'scissors') {
            result = 'You Win!';
        }
    }
    // score
    if (result === 'You Win!') { score.wins++ }
    else if (result === 'You Lost!') { score.losses++ }
    else if (result === 'Tie!') { score.ties++ }

    localStorage.setItem('score', JSON.stringify(score));
    updateScore();

    document.querySelector('.js-move').innerHTML = ` You  <img class="move-icon" src="assets/${playerMove}-emoji.png"> <img class="move-icon"
        src="assets/${computerMove}-emoji.png">
    Computer`;
    document.querySelector('.js-result').innerHTML = `${result}`;
    //     alert(`You picked ${playerMove}. Computer picked ${computerMove}. ${result} 
    // Wins: ${score.wins}, Losses: ${score.losses},Ties: ${score.ties}`);
}
let isautoPlay=false;
let intervalId;

// const autoPLay=()=>{

// }
function autoPlay(){ // this enable hoisting , we can call it whenver we want even before writing it

    if(!isautoPlay){
      intervalId= setInterval(()=>{ // instead of function()={}
            const playerMove=pickComputerMove();
            playGame(playerMove)
            },1000);
    isautoPlay=true;
    playButton.innerHTML='Stop Playing';
    }
    else
    { 
        clearInterval(intervalId);
        isautoPlay=false;
        playButton.innerHTML='Auto play';
    }
    
    
}



function showConfirm(){
    let confirmMessge =document.querySelector('.js-confirm');
    confirmMessge.innerHTML='Are you sure you want to reset the score ? <button class="js-yes">yes</button> <button class="js-no">no </button>';
    
    let yesconfirm=document.querySelector('.js-yes');
    let noconfirm=document.querySelector('.js-no');
    
    yesconfirm.addEventListener('click',()=>{
        reset();
        hideConfirm();  
    })
    noconfirm.addEventListener('click',()=>{
        hideConfirm();
    })
      
}

function hideConfirm(){
    document.querySelector('.js-confirm').innerHTML='';  
}


function reset() {
   
    score.losses = 0;
     score.ties = 0;
     score.wins = 0;
     localStorage.removeItem('score');
     updateScore();
    // updateScore();
}
function pickComputerMove() {
    let computerMove = '';
    const randomNumber = Math.random()
    if (randomNumber >= 0 && randomNumber <= 1 / 3) { computerMove = 'rock'; }
    else if (randomNumber >= 1 / 3 && randomNumber <= 2 / 3) { computerMove = 'paper'; }
    else if (randomNumber >= 2 / 3 && randomNumber <= 1) { computerMove = 'scissors' }
    return computerMove;
}

function updateScore() {
    document.querySelector('.js-score').innerHTML = `Wins: ${score.wins}, Losses: ${score.losses},Ties: ${score.ties}`;
}



