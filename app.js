document.addEventListener('DOMContentLoaded', () => {

    // Setting up the grid and it's child elements
    const grid = document.querySelector('.grid');
    const width = 10;
    let squares = [];
    for (let i = 0; i < 210; i++) {
        squareDiv = document.createElement('div');
        if (i >= 200) {
            squareDiv.classList.add('taken');
        }
        grid.appendChild(squareDiv);
        squares.push(squareDiv);
    }

    const scoreDisplay = document.querySelector('#score');
    const startButton = document.querySelector('#start-button');


    // Tetris shapes
    const lShape = [
        [1, width + 1, width * 2 + 1, 2],
        [width, width + 1, width + 2, width * 2 + 2],
        [1, width + 1, width * 2 + 1, width * 2],
        [width, width * 2, width * 2 + 1, width * 2 + 2]
    ];
    const zShape = [
        [0, width, width + 1, width * 2 + 1],
        [width + 1, width + 2, width * 2, width * 2 + 1],
        [0, width, width + 1, width * 2 + 1],
        [width + 1, width + 2, width * 2, width * 2 + 1]
    ];
    const tShape = [
        [1, width, width + 1, width + 2],
        [1, width + 1, width + 2, width * 2 + 1],
        [width, width + 1, width + 2, width * 2 + 1],
        [1, width, width + 1, width * 2 + 1]
    ];
    const oShape = [
        [0, 1, width, width + 1],
        [0, 1, width, width + 1],
        [0, 1, width, width + 1],
        [0, 1, width, width + 1]
    ];
    const iShape = [
        [1, width + 1, width * 2 + 1, width * 3 + 1],
        [width, width + 1, width + 2, width + 3],
        [1, width + 1, width * 2 + 1, width * 3 + 1],
        [width, width + 1, width + 2, width + 3]
    ];
    const allShapes = [lShape, zShape, tShape, oShape, iShape];

    // Setting random start shape and position
    let currentPosition = 4;
    let currentRotation = 0;
    let random = Math.floor(Math.random() * allShapes.length);
    let current = allShapes[random][currentRotation];

    // Draw shape, and undraw shape
    function draw() {
        current.forEach(index => {
            squares[currentPosition + index].classList.add('shape');
        });
    }
    function undraw() {
        current.forEach(index => {
            squares[currentPosition + index].classList.remove('shape');
        });
    }

    // Interval for moving shape downwards
    timerId = setInterval(moveDown, 1000);

    // Check if next to grid element that is taken and if so, freeze shape and create new one
    function freeze() {
        if (current.some(index => squares[currentPosition + index + width].classList.contains('taken'))) {
            current.forEach(index => squares[currentPosition + index].classList.add('taken'));
            // new shape
            random = Math.floor(Math.random() * allShapes.length);
            current = allShapes[random][currentRotation];
            currentPosition = 4;
            draw();
        }
    }

    // Keybindings
    function control(e) {
        if (e.keyCode === 37) {
            moveLeft();
        } else if (e.keyCode === 38) {
            rotate();
        } else if (e.keyCode === 39) {
            moveRight();
        } else if (e.keyCode === 40) {
            moveDown();
        }
    }
    document.addEventListener('keyup', control);

    // Shape movement functions
    function moveDown() {
        undraw();
        currentPosition += width;
        draw();
        freeze();
    }
    function moveLeft() {
        undraw();
        const isMaxLeft = current.some(index => (currentPosition + index) % width === 0);

        if (!isMaxLeft) currentPosition -= 1;

        if (current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
            currentPosition += 1;
        }
        draw();
    }
    function moveRight() {
        undraw();
        const isMaxRight = current.some(index => (currentPosition + index) % width === width - 1);

        if (!isMaxRight) currentPosition += 1;

        if (current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
            currentPosition -= 1;
        }
        draw();
    }
    function rotate() {
        undraw();
        currentRotation++;
        if (currentRotation === current.length) {
            currentRotation = 0;
        }
        current = allShapes[random][currentRotation];
        draw();
    }

})