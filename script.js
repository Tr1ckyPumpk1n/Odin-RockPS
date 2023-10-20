const getComputerChoice = () => {
    let arr = ['Rock', 'Paper', 'Scissors'];
    return arr[Math.floor(Math.random() * 3)];
};

function game () {
    let player = 0;
    let comp = 0;
    for (let count = 0; count < 5; count++) {
        let [result, win] = playRound();
        (win === 1) ? player++ : (win === 2) ? comp++ : true;
        console.log(result);
    }

    console.log(`\nFinal Score:-\nPlayer: ${player}\nComputer: ${comp}\n`);
    if (player > comp) console.log("\nYou Win!");
    else if (comp > player) console.log("\nComputer Wins!");
    else console.log("\nIt's a draw!");
}

function playRound () {
    let pS = prompt("Enter your choice").toLowerCase();
    const arr = ['rock', 'paper', 'scissors'];
    if (!pS || !arr.includes(pS)) return ["Enter a valid response. You lose!", 2];

    let playerSelection = "";
    pS = pS.split('');
    for (let i = 0; i < pS.length; i++) {
        if (i === 0) playerSelection += pS[i].toUpperCase();
        else playerSelection += pS[i];
    }

    const computerSelection = getComputerChoice();

    if (playerSelection === computerSelection) {
        return [`It's a draw! Both players chose ${computerSelection}`, 0];
    } else if (computerSelection === 'Rock' && playerSelection === 'Scissors' || computerSelection === 'Paper' && playerSelection === 'Rock' || computerSelection === 'Scissors' && playerSelection === 'Paper') {
        return [`You Lose! ${computerSelection} beats ${playerSelection}`, 2];
    } else {
        return [`You win! ${playerSelection} beats ${computerSelection}`, 1];
    }
}

game();
