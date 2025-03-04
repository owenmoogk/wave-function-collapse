import { NumberInput } from '@mantine/core';
import { Fragment, useState } from 'react';

import { emptyBoard, type BoardType } from '../types';

export default function Entrance(props: {
  defaultBoard: () => void;
  enterBoard: (board: BoardType) => void;
}) {
  const [board, setBoard] = useState<BoardType>(emptyBoard);

  return (
    <div className="inputBoard">
      <p>Enter a Sudoku:</p>
      <div className="buttons">
        <button
          onClick={() => props.defaultBoard()}
          className="btn btn-secondary"
        >
          Default Board
        </button>
        <button
          onClick={() => props.enterBoard(board)}
          className="btn btn-primary"
        >
          Enter Board
        </button>
      </div>
      {Array.from({ length: 9 }, (v, i) => i).map((rowNum) => (
        <Fragment key={rowNum}>
          <div className="inputRow" key={rowNum}>
            {Array.from({ length: 9 }, (v, i) => i).map((colNum) => (
              <Fragment key={colNum}>
                <NumberInput
                  size="md"
                  w={44}
                  hideControls
                  onValueChange={(value) =>
                    setBoard((currValue) => {
                      currValue[rowNum][colNum] = value.floatValue;
                      return currValue;
                    })
                  }
                  className="numberInput"
                  step={1}
                  min={1}
                  max={9}
                  clampBehavior="strict"
                />
                {(colNum + 1) % 3 === 0 ? (
                  colNum !== 8 ? (
                    <div className="inputVerticalBar" />
                  ) : null
                ) : null}
              </Fragment>
            ))}
          </div>
          {(rowNum + 1) % 3 === 0 ? (
            rowNum !== 8 ? (
              <div className="inputHorizontalBar" />
            ) : null
          ) : null}
        </Fragment>
      ))}
    </div>
  );
}
