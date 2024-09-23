
let score = JSON.parse(localStorage.getItem('score')) || {
  userScore: 0,
  computerScore: 0,};

const handOptions = {
  "rock": "/images/rock-button.png",
  "paper": "/images/paper-button.png",
  "scissors": "/images/scissors-button.png"
};

let contest = document.querySelector(".contest");
let hands = document.querySelector(".button-container");
let againstPC = document.querySelector(".against-PC");
let nextButton = document.querySelector(".next-button");
let rulesButton = document.querySelector(".rules-button");

function pickUserHand(hand)
  {
    
    hands.style.display = "none";
  
    
    contest.style.display="flex";
  
    document.getElementById("userPickImage").src = handOptions[hand];
  
    pickComputerHand(hand);
  }
  
function  pickComputerHand(hand)
  {
    let hands = ["rock", "paper", "scissors"];
    let cpHand = hands[Math.floor(Math.random() * hands.length)];
  
    document.getElementById("computerPickImage").src = handOptions[cpHand]
  
    playGame(hand, cpHand);
  }
  
function playGame(userChoice, pcChoice)
{
  resetAnimations();
    
  if (userChoice === pcChoice) 
    {
      setDecision("TIE UP");
      
      
      againstPC.style.display="none";
      
      document.getElementById("replay").innerText='REPLAY';

    } else if (
        (userChoice === 'rock' && pcChoice === 'scissors') ||
        (userChoice === 'scissors' && pcChoice === 'paper') ||
        (userChoice === 'paper' && pcChoice === 'rock')
    ) {
        score.userScore++;
        localStorage.setItem('score', JSON.stringify(score));
        
        setDecision("YOU WIN");
        
        
        againstPC.style.display="block";
        
        document.getElementById("replay").innerText='PLAY AGAIN';
        
        
        nextButton.style.display="block";

       
        rulesButton.style.right="180px";

        applyWinnerAnimation('.userhand');

      
        } 
  else {
        score.computerScore++;
        localStorage.setItem('score', JSON.stringify(score));
        
        setDecision("YOU LOST");
       
        againstPC.style.display="block";
        document.getElementById("replay").innerText='PLAY AGAIN';

        applyWinnerAnimation('.computerhand');
    }
    updateScoreBoard();
  }

function setDecision(decision)
{
    document.querySelector(".decision h1").innerText = decision;
  }

function  restartGame()
{
    
    contest.style.display = "none";
  
   
    hands.style.display = "block";

   
    nextButton.style.display="none";

    
    rulesButton.style.right="30px";
        
  }




const userScoreElement = document.querySelector('.userScore');
const computerScoreElement = document.querySelector('.computerScore');

updateScoreBoard();


function updateScoreBoard()
{
  userScoreElement.innerText = score.userScore;
  computerScoreElement.innerText = score.computerScore;
}


const rulesOpen = document.getElementById('rules-button');
const ruleBox = document.getElementById('rules-box');

rulesOpen.addEventListener('click', () => {
  ruleBox.show();
});

const rulesClose = document.getElementById('rules-close');
rulesClose.addEventListener('click', () => {
  ruleBox.close();
});

function applyWinnerAnimation(handSelector) {
  let spans = document.querySelectorAll(`${handSelector} span`);
  spans.forEach(span => {
    span.style.display = "block";  
  });
}

function resetAnimations() {
  let allSpans = document.querySelectorAll('.userhand span, .computerhand span');
  allSpans.forEach(span => {
    span.style.display = "none";  
  });
}

