import { getPawnMoves, getKnightMoves, getRookMoves } from './moves.js'

let legalSquares = [];
let isWhiteTurn = true;
const boardSquares = document.getElementsByClassName("square");
const pieces = document.getElementsByClassName("piece");
const piecesImages = document.getElementsByTagName("img");

// codify each square   
setupBoardSquares();
setupPieces();

function setupBoardSquares() {
    for (let i = 0; i < boardSquares.length; i++) {
        boardSquares[i].addEventListener("dragover", allowDrop);
        boardSquares[i].addEventListener("drop", drop);
        let row = 8 - Math.floor(i / 8);
        let column = String.fromCharCode(97 + (i % 8));
        let square = boardSquares[i];
        square.id = column + row;
    }
    console.log(document.querySelectorAll('.square').length);
}

function setupPieces() {
    for (let i = 0; i < pieces.length; i++) {
        pieces[i].addEventListener("dragstart", drag);
        pieces[i].setAttribute("draggable", true);
        pieces[i].id = pieces[i].className.split(" ")[1] + pieces[i].parentElement.id;
    }
    for (let i = 0; i < piecesImages.length; i++) {
        piecesImages[i].setAttribute("draggable", false);
    }
}

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    const piece = ev.target;
    const pieceColor = piece.getAttribute("color");
    console.log('Drag started for:', piece);  // Debugging log
    if ((isWhiteTurn && pieceColor == "white") || (!isWhiteTurn && pieceColor == "black")) {
        
        ev.dataTransfer.setData("text", piece.id);

        // getting possible moves
        const startingSquareId = piece.parentNode.id;
        getPossibleMoves(startingSquareId, piece);

        // highlighting possible moves
        legalSquares.forEach(squareId => {
            const square = document.getElementById(squareId);
            square.classList.add('highlight');
        });
    
    }
    console.log('is White turn : ', isWhiteTurn);
}

function drop(ev) {
    ev.preventDefault();
    let data = ev.dataTransfer.getData("text");
    const piece = document.getElementById(data);
    const destinationSquare = ev.currentTarget;
    let destinationSquareId = destinationSquare.id;

    // allow pieces to be captured
    if ((isSquareOccupied(destinationSquare) == "blank") && (legalSquares.includes(destinationSquareId)) ) {
        destinationSquare.appendChild(piece);
        isWhiteTurn = !isWhiteTurn;
        // legalSquares.length = 0;
        // return;
    }
    else if ((isSquareOccupied(destinationSquare) != "blank") && (legalSquares.includes(destinationSquareId))) {
        while (destinationSquare.firstChild) {
            destinationSquare.removeChild(destinationSquare.firstChild);
        }
        destinationSquare.appendChild(piece);
        isWhiteTurn = !isWhiteTurn;
        // legalSquares.length = 0;
        // return;
    }

    legalSquares.length = 0;

    // clean up highlights;
    clearHighlights();
}

function clearHighlights() {
    document.querySelectorAll('.highlight').forEach(square => {
        square.classList.remove('highlight');
    });
}

function getPossibleMoves(startingSquareId, piece) {
    const pieceColor = piece.getAttribute("color");
    if (piece.classList.contains("pawn"))
        getPawnMoves(startingSquareId, pieceColor, legalSquares, isSquareOccupied);
    if (piece.classList.contains("knight"))
        getKnightMoves(startingSquareId, pieceColor, legalSquares, isSquareOccupied);
    if (piece.classList.contains("rook"))
        getRookMoves(startingSquareId, pieceColor, legalSquares, isSquareOccupied);
}

function isSquareOccupied(square) {
    // checks if square is blank 
    if (square.querySelector(".piece")) {
        const color = square.querySelector(".piece").getAttribute("color");
        return color;
    }
    else {
        return "blank";
    }
}


