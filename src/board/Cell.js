export default function Cell(props) {

  let row = props.coords[0]
  let column = props.coords[1]

  return (
    <div className='cell' row={row} column={column}>
      {Array.isArray(props.possibilities) ?
        [1,2,3,4,5,6,7,8,9].map((option) => {
          return(
            <span className="possibility" onClick={() => {
              if (!props.locked && props.possibilities.includes(option)){
                props.cellClicked(row, column, option)
              }
            }} style={{
              transition: 'opacity 2s, transform 1s',
              opacity: props.possibilities.includes(option) ? '100%' : "0%",
              color: props.possibilities.includes(option) ? '' : "blue",
              fontWeight: props.possibilities.includes(option) ? '' : "bold",
              transform: props.possibilities.includes(option) ? '' : "scale(2)",
              zIndex: props.possibilities.includes(option) ? '' : '-1'
            }}>{option}</span>
          )
        })
        : <span className="finalNumber">{props.possibilities}</span>
      }
    </div>
  )
}