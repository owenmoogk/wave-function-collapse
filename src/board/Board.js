import { useEffect, useState } from 'react'
import './board.css'
import Cell from './Cell'
import cloneDeep from 'lodash/cloneDeep'

export default function Board(props) {

  const [possibilities, setPossibilities] = useState()
  const [changes, setChanges] = useState()
  const [locked, setLocked] = useState(false)

  function cellClicked(row, col, chosenNumber){
    let tmpPossibilities = JSON.parse(JSON.stringify(possibilities))
    propagate(row, col, chosenNumber, tmpPossibilities)
  }

  function propagate(row, col, chosenNumber, tmpPossibilities, setState = true) {
    
    tmpPossibilities[row][col] = chosenNumber

    // update the rows
    for (let i = 0; i < 9; i++) {
      if (i !== col) {
        tmpPossibilities = updateCell(row, i, chosenNumber, tmpPossibilities)
      }
    }

    // update the columns
    for (let i = 0; i < 9; i++) {
      if (i !== row) {
        tmpPossibilities = updateCell(i, col, chosenNumber, tmpPossibilities)
      }
    }

    // update the boxes
    for (let i = row - 2; i <= row + 2; i++) {

      // if it is in the same row of boxes
      if ((Math.floor(i / 3) === Math.floor(row / 3)) && i !== row) {

        for (let j = col - 2; j <= col + 2; j++) {

          // if it is the same column of boxes
          if ((Math.floor(j / 3) === Math.floor(col / 3)) && col !== j) {
            tmpPossibilities = updateCell(i, j, chosenNumber, tmpPossibilities)
          }
        }
      }
    }

    if (setState){
      setPossibilities(tmpPossibilities)
    }
    else{
      return(tmpPossibilities)
    }
  }

  function updateCell(row, col, chosenNumber, tmpPossibilities) {

    if (Array.isArray(tmpPossibilities[row][col])) {
      tmpPossibilities[row][col] = tmpPossibilities[row][col].filter((value, index, arr) => value !== chosenNumber)
    }
    else if (tmpPossibilities[row][col] === chosenNumber) {
      tmpPossibilities[row][col] = undefined
    }
    
    if (Array.isArray(tmpPossibilities[row][col]) && tmpPossibilities[row][col].length === 1) {
      propagate(row, col, tmpPossibilities[row][col][0], tmpPossibilities)
    }
    return tmpPossibilities
  }

  function initStartingValues() {
    let startingPossibilities = []
    for (let row = 0; row < 9; row++) {
      startingPossibilities.push([])
      for (let column = 0; column < 9; column++) {

        // if the value was set by the user
        if (props.entranceValues[row][column]) {
          startingPossibilities[row].push(parseInt(props.entranceValues[row][column]))
        }
        // if the value was not set, then set all possibilities
        else {
          startingPossibilities[row].push([1, 2, 3, 4, 5, 6, 7, 8, 9])
        }
      }
    }

    // do the wfc for all the items that the user has just inputted
    for (let row = 0; row < 9; row++) {
      for (let column = 0; column < 9; column++) {

        // if the value was set by the user
        if (typeof startingPossibilities[row][column] === 'number') {
          startingPossibilities = propagate(row, column, startingPossibilities[row][column], startingPossibilities, false)
        }
      }
    }

    return startingPossibilities
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
      <div id='board'>
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
      </div>
    )
  }

  useEffect(() => {
    if (props.entranceValues && props.showBoard) {
      setPossibilities(initStartingValues())
    }
  }, [props.entranceValues])

  // possibilities is a 3d array, containing the possibilities for each of the 81 squares. the third dimensions may be an...
  // array => representing possibilities
  // number => representing a final choice
  // undefined => representing an improper collapse (no valid options)


  return (
    <div className='board'>
      {possibilities
        ? getBoard()
        : null
      }
    </div>
  )
}