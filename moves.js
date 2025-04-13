// import { isWhiteTurn, boardSquares, pieces, piecesImage } from './main.js'

export function getPawnMoves(startingSquareId, pieceColor, legalSquares, isSquareOccupiedFn) {
    console.log("getPawnMoves fired:", startingSquareId, pieceColor);
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