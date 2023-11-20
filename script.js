let userWins = 0;
let computerWins = 0;
const body = document.querySelector("body");
const display = document.querySelector(".display");
const choices = document.querySelectorAll(".selection");
const computerDiv = document.querySelector(".computer");
const computerName = document.querySelector(".computer > h3");
const cWins = document.querySelector("#comp-wins");
const playerDiv = document.querySelector(".player");
const playerName = document.querySelector(".player > h3");
const cIcon = document.querySelector(".comp");
const pIcon = document.querySelector(".play");
const opaque = document.querySelector(".opacity");
const greet = document.querySelector("#intro");

const getComputerChoice = () => {
    let arr = ['rock', 'paper', 'scissors'];
    return arr[Math.floor(Math.random() * 3)];
};

const win = function () {
    display.textContent = "You Win! 😄";

    const circle = document.querySelector("#player-wins > .normal");
    circle.classList.replace("normal", "green");

    pIcon.classList.add("win");
    cIcon.classList.add("lose");

    userWins += 1;
    if (userWins === 5) {
        setTimeout(endGame, 1200, 1);
    } else {
        enableChoices();
    }
};

const draw = () => {
    pIcon.classList.add("draw");
    cIcon.classList.add("draw");

    display.textContent = "It's a tie!";
    enableChoices();
};

function lose () {
    const circle = document.querySelector("#comp-wins > .normal");
    circle.classList.replace("normal", "red");

    pIcon.classList.add("lose");
    cIcon.classList.add("win");

    display.textContent = "You Lose. ☹️";

    computerWins += 1;
    if (computerWins === 5) {
        setTimeout(endGame, 1200);
    } else {
        enableChoices();
    }
}

function playRound (pChoice) {
    disableChoices();
    pIcon.classList.remove("win", "lose", "draw");
    cIcon.classList.remove("win", "lose", "draw");


    const compChoice = getComputerChoice();

    playAnimation(compChoice, pChoice);

    setTimeout(() => {

        if (pChoice === "rock" && compChoice === "scissors" || pChoice === "paper" && compChoice === "rock" || pChoice === "scissors" && compChoice === "paper") {
            win();
        } else if (pChoice === compChoice) {
            draw();
        } else {
            lose();
        }

    }, 1350);
}

function playAnimation (...pc) {
    const obj = {
        rock : '<i class="fa-regular fa-hand-back-fist"></i>',
        paper : '<i class="fa-regular fa-hand"></i>',
        scissors : '<i class="fa-regular fa-hand-scissors fa-rotate-90"></i>',
    }
    const normal = '<i class="fa-solid fa-hand-fist fa-rotate-90"></i>';

    cIcon.innerHTML = normal;
    pIcon.innerHTML = normal;

    const icons = document.querySelectorAll(".icon > i");

    display.textContent = "Rock!";

    for (let icon of icons) {
        icon.classList.toggle("icon-animation");
    }

    setTimeout(() => {
        display.textContent = "Paper!"
    }, 350);

    setTimeout(() => {
        display.textContent = "Scissors!"
    }, 700);

    setTimeout(() => {
        display.textContent = "Shoot!!!"
    }, 1050);

    setTimeout(() => {
        for (let i = 0; i < 2; i++) {
            icons[i].classList.toggle("icon-animation");
            icons[i].parentNode.innerHTML = obj[pc[i]];
        }
    }, 1350);
}

function endGame (num) {
    const box = document.querySelector("#end");
    const para = document.querySelector("#end > p");
    const close = document.querySelector(".close");
    const replay = document.querySelector(".replay");

    if (num === 1) {
        para.innerHTML = "Congratulations ! <br/> You Won !";
    } else {
        para.innerHTML = "You Lost ! <br/> Better luck next time";
    }

    opaque.style.display = "block";
    box.style.display = "flex";
    box.classList.add("end-animation");

    document.addEventListener("click", (event) => {
        if (event.target.parentNode.id !== "end" && event.target.id !== "end") {
            opaque.style.display = "none";
            box.style.display = "none";
            retry();
        }
    });

    close.addEventListener("click", () => {
        opaque.style.display = "none";
        box.style.display = "none";
        retry();
    });

    replay.addEventListener("click", () => {
        location.reload();
    });
}

function retry() {
    const retry = document.querySelector(".retry");
    retry.style.display = "block";
    retry.classList.add("retry-animation");

    retry.addEventListener("click", () => {
        location.reload();
    });
}

const startButton = document.querySelector("#start");

startButton.addEventListener("click", () => {
    opaque.style.display = "none";
    greet.style.display = "none";
    enableChoices();
});

function start (event)  {
    event.stopPropagation();
    const selection = event.target.id || event.target.parentNode.id;
    playRound(selection);
}

function enableChoices () {

    for (let choice of choices) {
        choice.addEventListener("click", start);
    }
}

function disableChoices () {
    for (let choice of choices) {
        choice.removeEventListener("click", start);
    }
}


const bigger = window.matchMedia("(min-width: 951px)");
const smaller = window.matchMedia("(max-width: 950px)");

function changeBig (event) {
    if (event.matches) {
        computerDiv.appendChild(cWins);

        playerDiv.insertBefore(playerName, pIcon);
    }
}

changeBig(bigger);
bigger.addEventListener("change", changeBig);

function changeSmall (event) {
    if (smaller.matches) {
        computerDiv.insertBefore(cWins, computerName);

        playerDiv.insertBefore(pIcon, playerName);
    }
}

changeSmall(smaller);
smaller.addEventListener("change", changeSmall);


const h1 = document.querySelector("h1");

h1.addEventListener("click", () => {
    window.open("https://github.com/Tr1ckyPumpk1n/Odin-RockPS", "_blank");
});
