let currentPlayer = 'X';
let isPlayerVsAI = false;
const cells = document.querySelectorAll('.cell');
const homeButton = document.getElementById('home-button');
const toggleModeButton = document.getElementById('toggle-mode');

cells.forEach(cell => {
    cell.addEventListener('click', () => {
        if (cell.textContent === '' && currentPlayer === 'X') {
            cell.textContent = currentPlayer;
            if (checkWinner()) {
                alert(currentPlayer + ' wins!');
                resetBoard();
            } else if (isBoardFull()) {
                alert('It\'s a draw!');
                resetBoard();
            } else {
                currentPlayer = 'O';
                if (isPlayerVsAI) {
                    aiMove();
                }
            }
        } else if (cell.textContent === '' && !isPlayerVsAI) {
            cell.textContent = currentPlayer;
            if (checkWinner()) {
                alert(currentPlayer + ' wins!');
                resetBoard();
            } else if (isBoardFull()) {
                alert('It\'s a draw!');
                resetBoard();
            }
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    });
});

homeButton.addEventListener('click', () => {
    window.location.href = 'home.html';
});

toggleModeButton.addEventListener('click', () => {
    isPlayerVsAI = !isPlayerVsAI;
    toggleModeButton.textContent = isPlayerVsAI ? 'Play vs Player' : 'Play vs AI';
    resetBoard();
});

function aiMove() {
    const bestMove = findBestMove();
    cells[bestMove].textContent = 'O';
    if (checkWinner()) {
        alert('O wins!');
        resetBoard();
    } else if (isBoardFull()) {
        alert('It\'s a draw!');
        resetBoard();
    }
    currentPlayer = 'X';
}

function findBestMove() {
    let bestVal = -Infinity;
    let bestMove = -1;

    cells.forEach((cell, index) => {
        if (cell.textContent === '') {
            cell.textContent = 'O';
            let moveVal = minimax(0, false);
            cell.textContent = '';
            if (moveVal > bestVal) {
                bestMove = index;
                bestVal = moveVal;
            }
        }
    });

    return bestMove;
}

function minimax(depth, isMaximizingPlayer) {
    let score = evaluate();

    if (score === 10) return score - depth;
    if (score === -10) return score + depth;
    if (isBoardFull()) return 0;

    if (isMaximizingPlayer) {
        let best = -Infinity;

        cells.forEach(cell => {
            if (cell.textContent === '') {
                cell.textContent = 'O';
                best = Math.max(best, minimax(depth + 1, false));
                cell.textContent = '';
            }
        });

        return best;
    } else {
        let best = Infinity;

        cells.forEach(cell => {
            if (cell.textContent === '') {
                cell.textContent = 'X';
                best = Math.min(best, minimax(depth + 1, true));
                cell.textContent = '';
            }
        });

        return best;
    }
}

function evaluate() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
        [0, 4, 8], [2, 4, 6]             // diagonals
    ];

    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (cells[a].textContent === 'O' && cells[b].textContent === 'O' && cells[c].textContent === 'O') {
            return 10;
        } else if (cells[a].textContent === 'X' && cells[b].textContent === 'X' && cells[c].textContent === 'X') {
            return -10;
        }
    }

    return 0;
}

function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
        [0, 4, 8], [2, 4, 6]             // diagonals
    ];
    return winPatterns.some(pattern => {
        return pattern.every(index => {
            return cells[index].textContent === currentPlayer;
        });
    });
}

function isBoardFull() {
    return Array.from(cells).every(cell => {
        return cell.textContent !== '';
    });
}

function resetBoard() {
    cells.forEach(cell => {
        cell.textContent = '';
    });
    currentPlayer = 'X';
}
