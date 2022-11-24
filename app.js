const timeLeftDisplay = document.querySelector('#time-left');
const resultDisplay = document.querySelector('#result');
const startPauseDisplay = document.querySelector('#start-pause-button');
const squares = document.querySelectorAll('.grid div');

let currentIndex = 0;

function moveFrog() {
    squares[currentIndex].classList.add('frog');
}

document.addEventListener('keyup', moveFrog)

