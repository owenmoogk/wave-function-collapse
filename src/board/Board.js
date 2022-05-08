import { useState } from 'react'
import './board.css'
import Cell from './Cell'

export default function Board(props) {

  let startingPossibilities = []
  for (let row = 0; row < 9; row++) {
    startingPossibilities.push([])
    for (let column = 0; column < 9; column++) {
      startingPossibilities[row].push([1,2,3,4,5,6,7,8,9])
    }
  }
  
  // possibilities is a 3d array, containing the possibilities for each of the 81 squares. the third dimensions may be an...
  // array => representing possibilities
  // number => representing a final choice
  // undefined => representing an improper collapse (no valid options)
  const [possibilities, setPossibilities] = useState(startingPossibilities)

  function cellClicked(row, col, chosenNumber){

    let tmpPossibilities = JSON.parse(JSON.stringify(possibilities))
    tmpPossibilities[row][col] = chosenNumber
    
    // update the rows
    for (let i = 0; i < 9; i++){
      if (i != col){
        tmpPossibilities = updateCell(row, i, chosenNumber, tmpPossibilities)
      }
    }

    // update the columns
    for (let i = 0; i < 9; i++){
      if (i != row){
        tmpPossibilities = updateCell(i, col, chosenNumber, tmpPossibilities)
      }
    }

    // update the boxes
    for (let i = row-2; i <= row + 2; i++){

      // if it is in the same row of boxes
      if ((Math.floor(i/3) == Math.floor(row/3)) && i != row){

        for (let j = col-2; j <= col + 2; j++){

          // if it is the same column of boxes
          if ((Math.floor(j/3) == Math.floor(col/3)) && col != j){
            tmpPossibilities = updateCell(i, j, chosenNumber, tmpPossibilities)
          }
        }
      }
    }

    setPossibilities(tmpPossibilities)
    
  }

  function updateCell(row, col, chosenNumber, tmpPossibilities){

    if (Array.isArray(tmpPossibilities[row][col])){
      tmpPossibilities[row][col] = tmpPossibilities[row][col].filter((value, index, arr) => value != chosenNumber)
    }
    else if (tmpPossibilities[row][col] == chosenNumber){
      tmpPossibilities[row][col] = undefined
    }

    if (Array.isArray(tmpPossibilities[row][col]) && tmpPossibilities[row][col].length == 1){

      // change it into a final form (of an integer)
      tmpPossibilities[row][col] = tmpPossibilities[row][col][0]

      // update the rows
      for (let i = 0; i < 9; i++){
        if (i != col){
          updateCell(row, i, tmpPossibilities[row][col], tmpPossibilities)
        }
      }

      // update the columns
      for (let i = 0; i < 9; i++){
        if (i != row){
          updateCell(i, col, tmpPossibilities[row][col], tmpPossibilities)
        }
      }
    }
    return tmpPossibilities
  }

  function getBoard() {

    // board is an array of coords
    let board = []

    for (let row = 0; row < 9; row++) {
      board.push([])
      for (let column = 0; column < 9; column++) {
        board[row].push([row, column])
      }
    }

    return (
      <>
        {board.map((row, key) =>
          <>
            <div className='row' key={key}>
              {row.map((coords, rowKey) =>
                <>
                  <Cell coords={coords} key={rowKey} cellClicked={cellClicked} possibilities={possibilities[key][rowKey]} />
                  {(rowKey + 1) % 3 === 0 ? rowKey !== 8 ? <div className='verticalBar' /> : null : null}
                </>
              )}
            </div>
            {(key + 1) % 3 === 0 ? key !== 8 ? <div className='horizontalBar'></div> : null : null}
          </>
        )}
      </>
    )
  }

  return (
    <div className='board'>
      {getBoard()}
    </div>
  )
}