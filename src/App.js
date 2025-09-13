import './App.css';
import Square from './components/Square';
import { useState } from 'react';

function App() {
  const [XisNext, setXisNext] = useState(true);
  const [preFirst, setPreFirst] = useState("X");
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [gameOn, setGameOn] = useState(true)
  const [winner, setWinner] = useState("");
  const [isDraw, setIsDraw] = useState(false);

  function calculateWinner(arr) {
    const possibleWin = [
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,3,6],
      [1,4,7],
      [2,5,8],
      [0,4,8],
      [2,4,6]
    ]

    for (const [a, b, c] of possibleWin) {
      if (arr[a] && arr[a] === arr[b] && arr[a] === arr[c]) {
        return true
      }
    }
    return false
  }

  function calculateDraw(arr) {
    return arr.every(square => square !== null)
  }
  
  function handleReplay() {
    setGameOn(true);
    setWinner("");
    setIsDraw(false);
    setXisNext(() => {
      if (preFirst == "X") {
        setPreFirst("O")
        return false
      } else {
        setPreFirst("X")
        return true
      }
    });
    const allSq = Array(9).fill(null);
    setSquares(allSq);
    return
  }

  function handleClick(i) {
    if (!gameOn){
      return
    }
    if (squares[i]) {
      return
    }

    const sliceSquare = squares.slice()
    sliceSquare[i] = XisNext ? "X": "O";
    setSquares(sliceSquare)
    if (calculateWinner(sliceSquare)) {
      setWinner(() => XisNext ? "X" : "O")
      setGameOn(false)
      return
    }
    if (calculateDraw(sliceSquare)) {
      setIsDraw(true)
      setGameOn(false)
      return
    }
    setXisNext(!XisNext)
  }

  return (
    <div className='container'>
      {winner ? (
        <p className='directive'>Winner - {winner}</p>
      ): isDraw ? (
        <p className='directive'>Game Draw</p>
      ):(
        <p className='directive'>ON Move : {XisNext? "X": "O"}</p>
      )}

    <div className="board">
      <div className='board-row'>
        <Square value={squares[0]} onSquareClick={() => handleClick(0)}/>
        <Square value={squares[1]} onSquareClick={() => handleClick(1)}/>
        <Square value={squares[2]} onSquareClick={() => handleClick(2)}/>
      </div>
      <div className='board-row'>
        <Square value={squares[3]} onSquareClick={() => handleClick(3)}/>
        <Square value={squares[4]} onSquareClick={() => handleClick(4)}/>
        <Square value={squares[5]} onSquareClick={() => handleClick(5)}/>
      </div><div className='board-row'>
        <Square value={squares[6]} onSquareClick={() => handleClick(6)}/>
        <Square value={squares[7]} onSquareClick={() => handleClick(7)}/>
        <Square value={squares[8]} onSquareClick={() => handleClick(8)}/>
      </div>
    </div>
    {!gameOn ? (
      <button className='button' onClick={handleReplay}>Replay</button>
    ) : (
      <button className='button' onClick={handleReplay}>Reset</button>
    )}
    </div>
  );
}

export default App;
