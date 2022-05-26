const canvas = document.getElementById('tetris');
const context = canvas.getContext('2d');

const arena = createMatrix(10, 20);

context.scale(20, 20);

const player = {
    pos: {
        x: 0,
        y: 0
    },
    matrix: null,
    score: 0,
    linesLeft: 2,
    level: 1,
}

const colors = [
    null,
    '#FF0D72',
    '#0DC2FF',
    '#0DFF72',
    '#F538FF',
    '#FF8E0D',
    '#FFE138',
    '#3877FF',
];

function clearCompletedRows() {
    let completedRowCount = 1;
    outer: for (let y = arena.length - 1; y > 0; --y) {
        for (let x = 0; x < arena[y].length; ++x) {
            if (arena[y][x] === 0) {
                clearLines++;
                continue outer;
            }
        }
        document.getElementById( 'clearsound' ).play();
        const row = arena.splice(y, 1)[0].fill(0); //takes complete row out
        arena.unshift(row);
        ++y;

        player.score += completedRowCount * 10;
        completedRowCount *= 2;
        player.linesLeft -= 1;
    }
}

let clearLines = 0;

function isTouchBoundary(arena, player) {
    const [m, o] = [player.matrix, player.pos];
    for (let y = 0; y < m.length; ++y) {
        for (let x = 0; x < m[y].length; ++x) {
            if (m[y][x] !== 0 &&
                (arena[y + o.y] &&
                    arena[y + o.y][x + o.x]) !== 0) {
                return true;
            }
        }
    }
    return false;
}

function createMatrix(w, h) {
    const matrix = [];
    while (h--) {
        matrix.push(new Array(w).fill(0));
    }
    return matrix;
}

function createTetromino(type) {
    if (type === 'T') {
        return [
            [0, 0, 0],
            [1, 1, 1],
            [0, 1, 0],
        ];
    } else if (type === 'O') {
        return [
            [2, 2],
            [2, 2],
        ];
    } else if (type === 'L') {
        return [
            [0, 3, 0],
            [0, 3, 0],
            [0, 3, 3],
        ];
    } else if (type === 'J') {
        return [
            [0, 4, 0],
            [0, 4, 0],
            [4, 4, 0],
        ];
    } else if (type === 'I') {
        return [
            [0, 5, 0, 0],
            [0, 5, 0, 0],
            [0, 5, 0, 0],
            [0, 5, 0, 0],
        ];
    } else if (type === 'S') {
        return [
            [0, 6, 6],
            [6, 6, 0],
            [0, 0, 0],
        ];
    } else if (type === 'Z') {
        return [
            [7, 7, 0],
            [0, 7, 7],
            [0, 0, 0],
        ];
    }
}

function draw() {
    context.fillStyle = '#000';
    context.fillRect(0, 0, canvas.width, canvas.height);
    drawMatrix(arena, {
        x: 0,
        y: 0
    });
    drawMatrix(player.matrix, player.pos);
}

function drawMatrix(matrix, offset) {
    matrix.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                context.fillStyle = colors[value];
                context.fillRect(x + offset.x, y + offset.y, 1, 1);
            }
        });
    });
}

function merge(arena, player) {
    player.matrix.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                arena[y + player.pos.y][x + player.pos.x] = value;
            }
        });
    });
}

function playerDrop() {
    player.pos.y++;
    if (isTouchBoundary(arena, player)) {
        player.pos.y--;
        merge(arena, player);
        playerReset();
        clearCompletedRows();
        lvlUp();
        updateGameInfo();
    }
    dropCounter = 0;
}

function lvlUp() {
    if (player.linesLeft < 1) {
        document.getElementById( 'lvlup' ).play();
        arena.forEach(row => row.fill(0));
        dropInterval *= 0.85;
        player.level += 1;
        player.linesLeft = player.level + 1;
        player.score += clearLines * 10;
    }
}

function playerMove(offset) {
    player.pos.x += offset;
    if (isTouchBoundary(arena, player)) {
        player.pos.x -= offset;
    }
}

function playerRotate(dir) {
    const pos = player.pos.x;
    rotate(player.matrix, dir);
    if (isTouchBoundary(arena, player)) {
        rotate(player.matrix, -dir);
        player.pos.x = pos;
    }
}

function rotate(matrix, dir) {
    for (let y = 0; y < matrix.length; ++y) {
        for (let x = 0; x < y; ++x) {
            [
                matrix[x][y],
                matrix[y][x],
            ] = [
                matrix[y][x],
                matrix[x][y],
            ];
        }
    }
    if (dir > 0) {
        matrix.forEach(row => row.reverse());
    } else {
        matrix.reverse();
    }
}

function playerReset() {
    const tetromino = 'ILJOTSZ';
    player.matrix = createTetromino(tetromino[tetromino.length * Math.random() | 0]);
    player.pos.y = 0;
    player.pos.x = (arena[0].length / 2 | 0) - (player.matrix[0].length / 2 | 0);
    clearLines = 0;
    if (isTouchBoundary(arena, player)) {
        document.getElementById( 'gameover' ).play();
        arena.forEach(row => row.fill(0));
        player.score = 0;
        player.level = 1;
        player.linesLeft = 2;
        updateGameInfo();
    }
}

let dropCounter = 0;
let dropInterval = 1000;

let prevTime = 0;

let isPaused = false;

function update(time = 0) {
    if (!isPaused) {
        const deltaTime = time - prevTime;
        prevTime = time;

        dropCounter += deltaTime;
        if (dropCounter > dropInterval) {
            playerDrop();
        }
        draw();
    }
    requestAnimationFrame(update);
}

document.addEventListener('keydown', event => {
    if (event.keyCode === 37) {
        playerMove(-1);
    } else if (event.keyCode === 39) {
        playerMove(1);
    } else if (event.keyCode === 40) {
        playerDrop();
    } else if (event.keyCode === 38) {
        playerRotate(1);
    } else if (event.keyCode === 80) {
        isPaused = !isPaused;
    }
});

function updateScore() {
    document.getElementById('score').innerText = "Score: " + player.score;
}

function updateLinesLeft() {
    document.getElementById('linesLeft').innerText = "Linesleft: " + player.linesLeft;
}

function updateLevel() {
    document.getElementById('level').innerText = "Level: " + player.level;
}

function updateGameInfo() {
    updateScore()
    updateLinesLeft()
    updateLevel()
}

playerReset();
updateGameInfo();
update();