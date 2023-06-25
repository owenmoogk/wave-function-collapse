import Board from "./components/board/Board";
import './index.css'
import Entrance from "./components/Entrance";
import { useState } from "react";

function App() {

  const [entranceValues, setEntranceValues] = useState()
  const [showBoard, setShowBoard] = useState()
  const [showEntrance, setShowEntrance] = useState(true)
  const [modalDisplay, setModalDisplay] = useState(false)

  function enterBoard() {

    let values = []

    for (let row = 0; row < 9; row++) {
      values.push([])
      for (let column = 0; column < 9; column++) {
        values[row].push(document.querySelector('[row="' + row + '"][column="' + column + '"]').value)
      }
    }

    setEntranceValues(values)
    setShowEntrance(false)
    setShowBoard(true)
  }

  function defaultBoard() {
    let values = [
      ["", "", "5", "", "7", "8", "", "", "9"],
      ["", "8", "", "", "", "", "", "", ""],
      ["2", "7", "", "", "", "", "1", "", ""],
      ["", "", "", "", "", "", "2", "4", "3"],
      ["1", "9", "", "7", "", "", "", "", "5"],
      ["", "", "", "3", "", "", "", "", ""],
      ["", "4", "", "", "", "1", "", "", ""],
      ["", "", "", "8", "", "5", "", "", "7"],
      ["3", "", "", "", "", "", "9", "", ""]
    ]

    setEntranceValues(values)
    setShowEntrance(false)
    setShowBoard(true)
  }

  return (
    <div className="App">
      <div className="navBar" id='header'>
        <p>Wave Function Collapse</p>
        <div id='rightNav'>
          <a href="https://owenmoogk.github.io">Owen Moogk</a>
          <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd" strokeWidth="1" stroke='white'onClick={() => setModalDisplay(true)}><path d="M12 0c6.623 0 12 5.377 12 12s-5.377 12-12 12-12-5.377-12-12 5.377-12 12-12zm0 1c6.071 0 11 4.929 11 11s-4.929 11-11 11-11-4.929-11-11 4.929-11 11-11zm.5 17h-1v-9h1v9zm-.5-12c.466 0 .845.378.845.845 0 .466-.379.844-.845.844-.466 0-.845-.378-.845-.844 0-.467.379-.845.845-.845z"/></svg> 
        </div>
      </div>
      <div className='wrapper' style={{
        display: showEntrance ? '' : 'none'
      }}>
        <Entrance enterBoard={enterBoard} defaultBoard={defaultBoard} />
      </div>
      <div className='wrapper' style={{
        display: showEntrance ? 'none' : ''
      }}>
        <Board entranceValues={entranceValues} showBoard={showBoard} setShowEntrance={setShowEntrance} />
      </div>
      <div id="myModal" class="modal" style={{
        display: modalDisplay ? '' : 'none'
      }} onClick={(e) => {
        if (e.target.id == 'myModal') {
          setModalDisplay(false)
        }
      }}>
        <div class="modal-content">
          <div class="modal-header">
            <span class="close" onClick={() => setModalDisplay(false)}>&times;</span>
          </div>
          <h1>Wave Function Collapse</h1>
          <p>
            This website is designed with the intention of visualising the process of a wave function collapse, to get to a desired result... but what even is a wave function?
            <br /><br />
            Formally, it is "a variable quantity that mathematically describes the characteristics of a system." Essentially, we can take an unsolved system with many unknowns, and set out rules that the system must obey. In this case, it must obey the rules of a sudoku.
            <br /><br />
            Then, we can systematically choose values that satisfy the rules (known as 'collapsing' the wave function), and diverge upon a solution (note that there may sometimes be error in the chosen values, which is why backtracking is necessary).
            <br /><br />
            Why is it powerful? It is much better than brute force, and is an intelligent way to approach many problems. It's unique in that it does not only solve problems with one solution. Applications of this include <a href='https://bolddunkley.itch.io/wfc-mixed'>terrain generation for video games</a>, and quantum mechanics (which I'm definitely not qualified to talk about)!
            <br /><br />
            For more details have a look at the <a href='https://owenmoogk.github.io/projects/wave-function-collapse'>project page</a> on my website.
          </p>
        </div>
      </div>
    </div >
  );
}

export default App;
