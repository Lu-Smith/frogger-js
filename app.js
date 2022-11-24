const timeLeftDisplay = document.querySelector('#time-left');
const resultDisplay = document.querySelector('#result');
const startPauseDisplay = document.querySelector('#start-pause-button');
const squares = document.querySelectorAll('.grid div');

let currentIndex = 76;

function moveFrog(e) {

    switch(e.key) {
        case 'ArrowLeft' :
            console.log('move left')
    }
    squares[currentIndex].classList.add('frog');
}

document.addEventListener('keyup', moveFrog)

