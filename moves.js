
export function getPawnMoves(startingSquareId, pieceColor, legalSquares, isSquareOccupiedFn) {
    checkPawnDiagonalCaptures(startingSquareId, pieceColor, legalSquares, isSquareOccupiedFn);
    checkPawnForwardMoves(startingSquareId, pieceColor, legalSquares, isSquareOccupiedFn);
}

function checkPawnDiagonalCaptures(startingSquareId, pieceColor, legalSquares, isSquareOccupiedFn) {
    const file = startingSquareId.charAt(0);
    const rank = startingSquareId.charAt(1);
    const rankNumber = parseInt(rank);
    let currentFile = file;
    let currentRank = rankNumber;
    let currentSquareId = currentFile + currentRank;
    let currentSquare = document.getElementById(currentSquareId);
    let squareContent = isSquareOccupiedFn(currentSquare);
    const direction = pieceColor == "white" ? 1 : -1;

    currentRank += direction;
    for (let i = -1; i <= 1; i += 2) {
        currentFile = String.fromCharCode(file.charCodeAt(0) + i);

        if (currentFile >= "a" && currentFile <= "h") {
            currentSquareId = currentFile + currentRank;
            currentSquare = document.getElementById(currentSquareId);
            squareContent = isSquareOccupiedFn(currentSquare);

            // if a piece is occupying a space diagonal to pawn,
            //   capture
            if (squareContent != "blank" && squareContent != pieceColor)
                legalSquares.push(currentSquareId);
        }
    }
}

function checkPawnForwardMoves(startingSquareId, pieceColor, legalSquares, isSquareOccupiedFn) {
    const file = startingSquareId.charAt(0);
    const rank = startingSquareId.charAt(1);
    const rankNumber = parseInt(rank);
    let currentFile = file;
    let currentRank = rankNumber;
    let currentSquareId = currentFile + currentRank;
    let currentSquare = document.getElementById(currentSquareId);
    let squareContent = isSquareOccupiedFn(currentSquare);
    const direction = pieceColor == "white" ? 1 : -1;

    currentRank += direction;
    currentSquareId = currentFile + currentRank;
    currentSquare = document.getElementById(currentSquareId);
    squareContent = isSquareOccupiedFn(currentSquare);

    // checks if square directly infront is occupied
    // and if it is, there are no legal moves for that pawn
    if (squareContent != "blank") return;
    legalSquares.push(currentSquareId);

    if (rankNumber != 2 && rankNumber != 7) return;

    currentRank += direction;
    currentSquareId = currentFile + currentRank;
    currentSquare = document.getElementById(currentSquareId);
    squareContent = isSquareOccupiedFn(currentSquare);

    // what does repeating this line do?
    if (squareContent != "blank") return;
    legalSquares.push(currentSquareId);

}



export function getKnightMoves(startingSquareId, pieceColor, legalSquares, isSquareOccupiedFn) {
    // ASCI 'a' is 97
    const file = startingSquareId.charCodeAt(0) - 97; // a => 0
    const rank = startingSquareId.charAt(1); // 2 => 2
    const rankNumber = parseInt(rank);

    const moves = [
        [-2, 1], [-1, 2], [1, 2], [2, 1], [2, -1], [1, -2], [-1, -2], [-2, -1],
    ];


    for (const [df, dr] of moves) {
        let currentFile = file + df;
        let currentRank = rankNumber + dr;

        if (currentFile >= 0 && currentFile <= 7 && currentRank >= 1 && currentRank <= 8) {
            let currentSquareId = String.fromCharCode(currentFile + 97) + currentRank;
            let currentSquare = document.getElementById(currentSquareId);
            let squareContent = isSquareOccupiedFn(currentSquare);

            // friendly piece
            if (squareContent != "blank" && squareContent == pieceColor) continue;

            legalSquares.push(currentSquareId);
        }
    }
}


export function getRookMoves(startingSquareId, pieceColor, legalSquares, isSquareOccupiedFn) {
    const file = startingSquareId.charAt(0);
    const rank = startingSquareId.charAt(1);
    const rankNumber = parseInt(rank);
    
    getStraightMoves(file, rankNumber, pieceColor, legalSquares, isSquareOccupiedFn);
}

function findExtendedMoves(file, rank, pieceColor, legalSquares, isSquareOccupiedFn) {
    let currentSquareId = file + rank;
    let currentSquare = document.getElementById(currentSquareId);
    let squareContent = isSquareOccupiedFn(currentSquare);

    if (squareContent != "blank" && squareContent == pieceColor) return false;
    legalSquares.push(currentSquareId);

    if (squareContent != "blank" && squareContent != pieceColor) return false;
    return true;
}

function moveToEighthRank(file, currentRank, pieceColor, legalSquares, isSquareOccupiedFn) {   
    while (currentRank < 8) {
        currentRank++;

        // stop finding moves when it finds another piece
        if (!findExtendedMoves(file, currentRank, pieceColor, legalSquares, isSquareOccupiedFn)) break;
    }
}

function moveToFirstRank(file, currentRank, pieceColor, legalSquares, isSquareOccupiedFn) {
    while (currentRank > 1) {
        currentRank--;

        // stop finding moves when it finds another piece
        if (!findExtendedMoves(file, currentRank, pieceColor, legalSquares, isSquareOccupiedFn)) break;
    }
}

function moveToAFile(currentFile, rank, pieceColor, legalSquares, isSquareOccupiedFn) {
    while (currentFile > "a") {
        currentFile = String.fromCharCode(currentFile.charCodeAt(0) - 1);

        // stop finding moves when it finds another piece
        if (!findExtendedMoves(currentFile, rank, pieceColor, legalSquares, isSquareOccupiedFn)) break;
    }
}

function moveToHFile(currentFile, rank, pieceColor, legalSquares, isSquareOccupiedFn) {
    while (currentFile < "h") {
        currentFile = String.fromCharCode(currentFile.charCodeAt(0) + 1);

        // stop finding moves when it finds another piece
        if (!findExtendedMoves(currentFile, rank, pieceColor, legalSquares, isSquareOccupiedFn)) break;
    }
}

export function getBishopMoves(startingSquareId, pieceColor, legalSquares, isSquareOccupiedFn) {
    const file = startingSquareId.charAt(0);
    const rank = startingSquareId.charAt(1);
    const rankNumber = parseInt(rank);

    getDiagonalMoves(file, rankNumber, pieceColor, legalSquares, isSquareOccupiedFn);
}

function moveToEighthRankAFile(currentFile, currentRank, pieceColor, legalSquares, isSquareOccupiedFn) {

    while ( !(currentFile == "a" || currentRank == 8)  ) {
        currentFile = String.fromCharCode(
            currentFile.charCodeAt(currentFile.length - 1) - 1
        );
        currentRank++;

        if (!findExtendedMoves(currentFile, currentRank, pieceColor, legalSquares, isSquareOccupiedFn)) break;
    }
}

function moveToEighthRankHFile(currentFile, currentRank, pieceColor, legalSquares, isSquareOccupiedFn) {
    while (!(currentFile == "h" || currentRank == 8)) {
        currentFile = String.fromCharCode(
            currentFile.charCodeAt(currentFile.length - 1) + 1
        );
        currentRank++;

        if (!findExtendedMoves(currentFile, currentRank, pieceColor, legalSquares, isSquareOccupiedFn)) break;
    }
}

function moveToFirstRankAFile(currentFile, currentRank, pieceColor, legalSquares, isSquareOccupiedFn) {
    while (!(currentFile == "a" || currentRank == 1)) {
        currentFile = String.fromCharCode(
            currentFile.charCodeAt(currentFile.length - 1) - 1
        );
        currentRank--;

        if (!findExtendedMoves(currentFile, currentRank, pieceColor, legalSquares, isSquareOccupiedFn)) break;
    }
}

function moveToFirstRankHFile(currentFile, currentRank, pieceColor, legalSquares, isSquareOccupiedFn) {
    while (!(currentFile == "h" || currentRank == 1)) {
        currentFile = String.fromCharCode(
            currentFile.charCodeAt(currentFile.length - 1) + 1
        );
        currentRank--;

        if (!findExtendedMoves(currentFile, currentRank, pieceColor, legalSquares, isSquareOccupiedFn)) break;
    }
}

function getStraightMoves(file, rankNumber, pieceColor, legalSquares, isSquareOccupiedFn) {
    moveToEighthRank(file, rankNumber, pieceColor, legalSquares, isSquareOccupiedFn);
    moveToFirstRank(file, rankNumber, pieceColor, legalSquares, isSquareOccupiedFn);
    moveToAFile(file, rankNumber, pieceColor, legalSquares, isSquareOccupiedFn);
    moveToHFile(file, rankNumber, pieceColor, legalSquares, isSquareOccupiedFn);
}

function getDiagonalMoves(file, rankNumber, pieceColor, legalSquares, isSquareOccupiedFn) {
    moveToEighthRankAFile(file, rankNumber, pieceColor, legalSquares, isSquareOccupiedFn);
    moveToEighthRankHFile(file, rankNumber, pieceColor, legalSquares, isSquareOccupiedFn);
    moveToFirstRankAFile(file, rankNumber, pieceColor, legalSquares, isSquareOccupiedFn);
    moveToFirstRankHFile(file, rankNumber, pieceColor, legalSquares, isSquareOccupiedFn);
}

export function getQueenMoves(startingSquareId, pieceColor, legalSquares, isSquareOccupiedFn) {
    const file = startingSquareId.charAt(0);
    const rank = startingSquareId.charAt(1);
    const rankNumber = parseInt(rank);
    
    getStraightMoves(file, rankNumber, pieceColor, legalSquares, isSquareOccupiedFn);
    getDiagonalMoves(file, rankNumber, pieceColor, legalSquares, isSquareOccupiedFn);
}


export function getKingMoves(startingSquareId, pieceColor, legalSquares, isSquareOccupiedFn) {
    // ASCI 'a' is 97
    const file = startingSquareId.charCodeAt(0) - 97; // a => 0
    const rank = startingSquareId.charAt(1); // 2 => 2
    const rankNumber = parseInt(rank);

    const moves = [
        [0, 1], [0, -1], [1, 1], [1, -1], [-1, 1], [-1, -1], [-1, 0], [1, 0],
    ];


    for (const [df, dr] of moves) {
        let currentFile = file + df;
        let currentRank = rankNumber + dr;

        if (currentFile >= 0 && currentFile <= 7 && currentRank >= 1 && currentRank <= 8) {
            let currentSquareId = String.fromCharCode(currentFile + 97) + currentRank;
            let currentSquare = document.getElementById(currentSquareId);
            let squareContent = isSquareOccupiedFn(currentSquare);

            // friendly piece
            if (squareContent != "blank" && squareContent == pieceColor) continue;

            legalSquares.push(currentSquareId);
        }
    }
}