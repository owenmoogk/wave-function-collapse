export default function Cell(props) {

  let row = props.coords[0]
  let column = props.coords[1]

  return (
    <div className='cell' row={row} column={column}>
      {Array.isArray(props.possibilities) ?

        props.possibilities.map((option) => {
          return (
            <span className="possibility" onClick={() => props.cellClicked(row, column, option)}>{option}</span>
          )
        })
        : <span className="finalNumber">{props.possibilities}</span>
      }
    </div>
  )
}