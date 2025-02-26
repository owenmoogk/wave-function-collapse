import { Box } from '@mantine/core';

export default function Cell(props: {
  row: number;
  column: number;
  possibilities?: number[];
}) {
  return (
    <div className={props.possibilities ? 'cell' : 'cell broken'}>
      {props.possibilities && props.possibilities.length > 1 ? (
        Array.from({ length: 9 }, (v, i) => i + 1).map((option, key) => {
          return (
            <Box
              h={'33%'}
              w={'33%'}
              key={key}
              className="possibility"
              style={{
                transition: 'opacity 2s, transform 0.3s',
                opacity: props.possibilities?.includes(option) ? '100%' : '0%',
                color: props.possibilities?.includes(option) ? '' : 'blue',
                fontWeight: props.possibilities?.includes(option) ? '' : 'bold',
                transform: props.possibilities?.includes(option)
                  ? ''
                  : 'scale(2)',
                zIndex: props.possibilities?.includes(option) ? '' : '-1',
              }}
            >
              {option}
            </Box>
          );
        })
      ) : props.possibilities ? (
        <span className="finalNumber">{props.possibilities}</span>
      ) : (
        <span className="finalNumber">!</span>
      )}
    </div>
  );
}
