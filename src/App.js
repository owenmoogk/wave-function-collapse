import Board from "./board/Board";
import './index.css'
import Entrance from "./Entrance";
import { useState } from "react";

function App() {

  const [entranceValues, setEntranceValues] = useState()
  const [showBoard, setShowBoard] = useState()

  function enterBoard() {

    let values = []

    for (let row = 0; row < 9; row++) {
      values.push([])
      for (let column = 0; column < 9; column++) {
        values[row].push(document.querySelector('[row="' + row + '"][column="' + column + '"]').value)
      }
    }

    setEntranceValues(values)
    setShowBoard(true)
  }

  return (
    <div className="App">
      <div className="splitScreen">
        <Entrance enterBoard={enterBoard} />
      </div>
      <div className="splitScreen">
        <Board entranceValues={entranceValues} showBoard={showBoard} />
      </div>
    </div>
  );
}

export default App;
