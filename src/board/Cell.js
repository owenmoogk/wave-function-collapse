export default function Cell(props) {

  let row = props.coords[0]
  let column = props.coords[1]

  return (
    <div className={props.possibilities ? 'cell' : 'cell broken'} row={row} column={column}>
      {Array.isArray(props.possibilities) ?
        [1,2,3,4,5,6,7,8,9].map((option) => {
          return(
            <span className="possibility" style={{
              transition: 'opacity 2s, transform 1s',
              opacity: props.possibilities.includes(option) ? '100%' : "0%",
              color: props.possibilities.includes(option) ? '' : "blue",
              fontWeight: props.possibilities.includes(option) ? '' : "bold",
              transform: props.possibilities.includes(option) ? '' : "scale(2)",
              zIndex: props.possibilities.includes(option) ? '' : '-1'
            }}>{option}</span>
          )
        })
        : props.possibilities
          ? <span className="finalNumber">{props.possibilities}</span>
          : <span className="finalNumber">!</span>
      }
    </div>
  )
}