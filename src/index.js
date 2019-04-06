import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square({ value , onClick }) {
  return (
    <button className="square" onClick={ onClick }>
      {value}
    </button>
  );
}

function Board() {
  const [ squares, setSquares ] = useState(Array(9).fill(''));
  const [ xTurn , setTurn ] = useState(true);
  function renderSquare(i) {
    return (
      <Square value={ squares[i] }
        onClick={ () => {
          let newSquares = [...squares];
          newSquares[i] = xTurn ? 'X' : 'O';
          let newTurn = !xTurn;
          setTurn(newTurn);
          setSquares(newSquares) }
        }
      />
    );
  }

  function calculateWinner(squares){
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    const winner = winningCombinations.filter(lines => (
      squares[lines[0]] === squares[lines[1]] &&
      squares[lines[0]] === squares[lines[2]] &&
      ["X", "O"].includes(squares[lines[0]]) )
      );
    return winner.length > 0 ? `Winner is ${squares[winner[0][0]]}` : `Next player: ${xTurn ? 'X' : 'O'}`;
  }

  const status = calculateWinner(squares);

  return (
    <div>
      <div className="status">{status}</div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
}

function Game() {
  return (
    <div className="game">
      <div className="game-board">
        {Board()}
      </div>
      <div className="game-info">
        <div>{/* status */}</div>
        <ol>{/* TODO */}</ol>
      </div>
    </div>
  );
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);