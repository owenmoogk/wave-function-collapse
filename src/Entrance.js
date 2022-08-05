export default function Entrance(props){

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
      <div className="inputBoard">
        <p>Enter a Sudoku:</p>
        {board.map((row, key) =>
          <>
            <div className='inputRow' key={key}>
              {row.map((coords, rowKey) =>
                <>
                  <input row={coords[0]} column={coords[1]} className="numberInput" type='number' onChange={(e) => {
                    if (e.target.value > 0 && e.target.value < 10 && Number.isInteger(parseFloat(e.target.value))){
                      e.target.value = parseInt(e.target.value)
                    }
                    else{
                      e.target.value = ''
                    }
                  }} />
                  {(rowKey + 1) % 3 === 0 ? rowKey !== 8 ? <div className='inputVerticalBar' /> : null : null}
                </>
              )}
            </div>
            {(key + 1) % 3 === 0 ? key !== 8 ? <div className='inputHorizontalBar'></div> : null : null}
          </>
        )}
        <button onClick={() => props.enterBoard()}>Enter Board</button>
        <button onClick={() => props.defaultBoard()}>Default Board</button>
      </div>
    )
  }

  return(
    getBoard()
  )

}