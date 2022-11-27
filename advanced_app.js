const timeLeftDisplay = document.querySelector('#time-left');
const resultDisplay = document.querySelector('#result');
const startPauseDisplay = document.querySelector('#start-pause-button');
const advancedstartPauseDisplay = document.querySelector('#advanced-start-pause-button');
const squares = document.querySelectorAll('.grid div');
const logsLeft = document.querySelectorAll('.log-left');
const logsRight = document.querySelectorAll('.log-right');
const carsLeft = document.querySelectorAll('.car-left');
const carsRight = document.querySelectorAll('.car-right');
const gameOver = document.querySelector('.ending-block span');
const startGame = document.querySelector('.starting-block span');
const boardGame = document.querySelector('.grid');

let currentIndex = 94;
const width = 9;
let timerId;
let outcomeTimerId;
let currentTime = 15;

function moveFrog(e) {
    squares[currentIndex].classList.remove('frog');
    startGame.classList.remove('frog');
    startGame.classList.add('start-game');
    switch(e.key) {
        case 'ArrowLeft' :
            if (currentIndex % width !== 0)
                currentIndex -= 1
            break;
        case 'ArrowRight' :
            if (currentIndex % width < width - 1)
            currentIndex += 1
            break;
        case 'ArrowUp' :
            if (currentIndex - width >= 0)
            currentIndex -= width
            break;
         case 'ArrowDown' :
            if (currentIndex + width < width * width)
            currentIndex += width
            break;
    }
    squares[currentIndex].classList.add('frog');
}

function autoMoveElements() {
    currentTime--;
    timeLeftDisplay.textContent = currentTime;
    logsLeft.forEach(logLeft => moveLogLeft(logLeft));
    logsRight.forEach(logRight => moveLogRight(logRight));
    carsLeft.forEach(carLeft => moveCarLeft(carLeft));
    carsRight.forEach(carRight => moveCarRight(carRight));
    startPauseDisplay.textContent = 'Pause';
};

function checkOutcomes() {
    lose();
    win();
}

function moveLogLeft(logLeft) {
    switch(true) {
       case logLeft.classList.contains('l1') :
         logLeft.classList.remove('l1')
         logLeft.classList.add('l2')
         break;
       case logLeft.classList.contains('l2') :
          logLeft.classList.remove('l2')
          logLeft.classList.add('l3')
          break;
       case logLeft.classList.contains('l3') :
          logLeft.classList.remove('l3')
          logLeft.classList.add('l4')
          break;
       case logLeft.classList.contains('l4') :
          logLeft.classList.remove('l4')
          logLeft.classList.add('l5')
          break;
       case logLeft.classList.contains('l5') :
          logLeft.classList.remove('l5')
          logLeft.classList.add('l1')
          break;
    }
}

function moveLogRight(logRight) {
    switch(true) {
       case logRight.classList.contains('l1') :
         logRight.classList.remove('l1')
         logRight.classList.add('l5')
         break
       case logRight.classList.contains('l2') :
          logRight.classList.remove('l2')
          logRight.classList.add('l1')
          break 
       case logRight.classList.contains('l3') :
          logRight.classList.remove('l3')
          logRight.classList.add('l2')
          break
       case logRight.classList.contains('l4') :
          logRight.classList.remove('l4')
          logRight.classList.add('l3')
          break
       case logRight.classList.contains('l5') :
          logRight.classList.remove('l5')
          logRight.classList.add('l4')
          break
    }
};

function moveCarLeft(carLeft) {
    switch(true) {
       case carLeft.classList.contains('c1') :
         carLeft.classList.remove('c1')
         carLeft.classList.add('c2')
         break
       case carLeft.classList.contains('c2') :
          carLeft.classList.remove('c2')
          carLeft.classList.add('c3')
          break 
       case carLeft.classList.contains('c3') :
          carLeft.classList.remove('c3')
          carLeft.classList.add('c1')
          break
    }
};

function moveCarRight(carRight) {
    switch(true) {
       case carRight.classList.contains('c1') :
         carRight.classList.remove('c1')
         carRight.classList.add('c3')
         break
       case carRight.classList.contains('c2') :
          carRight.classList.remove('c2')
          carRight.classList.add('c1')
          break 
       case carRight.classList.contains('c3') :
          carRight.classList.remove('c3')
          carRight.classList.add('c2')
          break
    }
};;

function lose() {
    if (squares[currentIndex].classList.contains('c1') ||
    squares[currentIndex].classList.contains('l4') ||
    squares[currentIndex].classList.contains('l5') ||
    currentTime <= 0
    ) {
        resultDisplay.textContent = 'You lose ☹️';
        clearInterval(timerId);
        clearInterval(outcomeTimerId);
        squares[currentIndex].classList.remove('frog');
        document.removeEventListener('keyup', moveFrog);
        startPauseDisplay.textContent = 'Try again';
};
}

function win() {
    if (squares[currentIndex].classList.contains('ending-block')) {
        resultDisplay.textContent = 'You won 😄';
        clearInterval(timerId);
        clearInterval(outcomeTimerId);
        document.removeEventListener('keyup', moveFrog);
        startPauseDisplay.textContent = 'Play again';
        timerId = null;
        outcomeTimerId = null;
        gameOver.classList.add('game-over');
        squares[currentIndex].classList.remove('frog');
        boardGame.classList.add('game-over');
        advancedstartPauseDisplay.classList.remove('advanced');
        startPauseDisplay.classListadd('basic');
    }
}
 
startPauseDisplay.addEventListener('click', () => {
    if (timerId && startPauseDisplay.textContent !== 'Try again') {
        clearInterval(timerId);
        clearInterval(outcomeTimerId)
        timerId = null;
        outcomeTimerId = null;
        document.removeEventListener('keyup', moveFrog);
        startPauseDisplay.textContent = 'Start';
    } else if (startPauseDisplay.textContent === 'Try again' || startPauseDisplay.textContent === 'Play again') {
        startPauseDisplay.textContent = 'Pause';
        startGame.classList.remove('start-game');
        gameOver.classList.remove('game-over');
        boardGame.classList.remove('game-over');
        currentTime = 15;
        currentIndex = 94;
        timeLeftDisplay.textContent = '15';
        resultDisplay.textContent = 'Go';
        timerId = setInterval(autoMoveElements, 1000);
        outcomeTimerId = setInterval(checkOutcomes, 50);
        document.addEventListener('keyup', moveFrog);
    } else {
    timerId = setInterval(autoMoveElements, 1000);
    outcomeTimerId = setInterval(checkOutcomes, 50);
    document.addEventListener('keyup', moveFrog);
}
})

