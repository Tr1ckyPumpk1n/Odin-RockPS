let rounds = 0;
const display = document.querySelector(".display");
const choices = document.querySelectorAll(".selection");
const playerDiv = document.querySelector(".player");
const playerName = document.querySelector(".player > h3");
const pIcon = document.querySelector(".play");

const getComputerChoice = () => {
    let arr = ['rock', 'paper', 'scissors'];
    return arr[Math.floor(Math.random() * 3)];
};

const win = function () {
    display.textContent = "You Win! 😄";
    const circle = document.querySelector(".normal");
    circle.classList.replace("normal", "green");
    rounds += 1;
    if (rounds === 5) {
        endGame();
    }
};

const draw = () => {
    display.textContent = "It's a tie!";
};

function lose () {
    display.textContent = "You Lose. ☹️";
}

function playRound (pChoice) {
    disableChoices();
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

        enableChoices();
    }, 1500);
}

function playAnimation (...pc) {
    const obj = {
        rock : '<i class="fa-solid fa-hand-back-fist"></i>',
        paper : '<i class="fa-solid fa-hand"></i>',
        scissors : '<i class="fa-solid fa-hand-scissors fa-rotate-90"></i>',
    }
    const normal = '<i class="fa-solid fa-hand-fist fa-rotate-90"></i>';

    const cIcon = document.querySelector(".comp");

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
    }, 1500);
}

function endGame () {
    const box = document.querySelector("#end");
    const close = document.querySelector(".close");
    const replay = document.querySelector(".replay");

    box.style.display = "flex";
    box.classList.add("end-animation");

    document.addEventListener("click", (event) => {
        if (event.target.parentNode.id !== "end" && event.target.id !== "end") {
            box.style.display = "none";
            retry();
        }
    });

    close.addEventListener("click", () => {
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

addEventListener("DOMContentLoaded", enableChoices);

function start (event)  {
    event.stopPropagation();
    const selection = event.target.id || event.target.parentNode.id;
    if (rounds < 5) {
        playRound(selection);
    }
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

function changeBig (event) {
    if (event.matches) {
        playerDiv.insertBefore(playerName, pIcon);
    }
}

changeBig(bigger);
bigger.addEventListener("change", changeBig);

const smaller = window.matchMedia("(max-width: 950px)");

function changeSmall (event) {
    if (smaller.matches) {
        playerDiv.insertBefore(pIcon, playerName);
    }
}
changeSmall(smaller);
smaller.addEventListener("change", changeSmall);
