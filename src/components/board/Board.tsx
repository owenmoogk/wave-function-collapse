import { Button, Container, Flex, NumberInput } from '@mantine/core';
import cloneDeep from 'lodash/cloneDeep';
import { Fragment, useEffect, useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';

import Cell from './Cell';
import type { BoardType, PossibilitiesType } from '../../types';
import { initStartingValues, isBoardSolved, propagate } from '@solver/solver';

type Props = {
  entranceValues: BoardType;
  showBoard: boolean;
  setShowEntrance: (showEntrance: boolean) => void;
  setEntranceValues: (values: BoardType) => void;
};

export default function Board({
  entranceValues,
  showBoard,
  setShowEntrance,
  setEntranceValues,
}: Props) {
  const defaultTimeStep = 200;
  const [timeDelay, setTimeDelayMs] = useState(defaultTimeStep);
  const [possibilities, setPossibilities] = useState<PossibilitiesType>(
    initStartingValues(entranceValues)
  );
  const [locked, setLocked] = useState(false);

  function solve(
    tmpPossibilities: PossibilitiesType,
    depth = 0
  ): [isSolved: boolean, depth: number] {
    setLocked(true);
    // base case, is board solved
    if (isBoardSolved(tmpPossibilities)) {
      setTimeout(() => {
        setPossibilities(tmpPossibilities);
      }, timeDelay * depth);
      return [true, depth];
    }

    // get the coords with the lowest number of possibilities
    let lowestPossibilities = 10;
    let coordsToPropagate: [row: number, col: number] | undefined = undefined;

    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        const currentPossibilities = tmpPossibilities[row][col];
        if (
          currentPossibilities &&
          currentPossibilities.length > 1 &&
          currentPossibilities.length < lowestPossibilities
        ) {
          lowestPossibilities = currentPossibilities.length;
          coordsToPropagate = [row, col];
        }
      }
    }

    // typechecking only, this should always be defined
    if (coordsToPropagate === undefined) {
      return [false, depth];
    }

    const cellPossibilities = tmpPossibilities[coordsToPropagate[0]][
      coordsToPropagate[1]
    ] as number[]; // we know it's an array of numbers, because the length is at least 2

    for (let i = 0; i < cellPossibilities.length; i++) {
      const currentPossibility = cellPossibilities[i];
      // eslint-disable-next-line prefer-const
      let [newPossibilities, failed] = propagate(
        coordsToPropagate[0],
        coordsToPropagate[1],
        currentPossibility,
        cloneDeep(tmpPossibilities)
      );
      if (!failed) {
        setTimeout(() => setPossibilities(newPossibilities), timeDelay * depth);
        let isSolved: boolean;
        [isSolved, depth] = solve(cloneDeep(newPossibilities), depth + 1);
        if (isSolved) {
          setTimeout(() => setLocked(false), timeDelay * depth + 2);
          return [true, depth];
        }
      } else {
        setTimeout(() => {
          setPossibilities(newPossibilities);
        }, timeDelay * depth);
        setTimeout(
          () => setPossibilities(tmpPossibilities),
          timeDelay * (depth + 1)
        );
        depth += 2;
      }
    }
    return [false, depth];
  }

  function cellClicked(row: number, col: number, selection: number) {
    if (!locked) {
      const entranceClone = cloneDeep(entranceValues);
      entranceClone[row][col] = selection;
      setEntranceValues(entranceClone);
    }
  }

  function getBoard() {
    return (
      <div id="board">
        {Array.from({ length: 9 }).map((_, row) => (
          <Fragment key={row}>
            <div className="row">
              {Array.from({ length: 9 }).map((_, col) => (
                <Fragment key={col}>
                  <Cell
                    locked={locked}
                    row={row}
                    column={col}
                    key={col}
                    possibilities={possibilities[row][col]}
                    cellClicked={cellClicked}
                  />
                  {(col + 1) % 3 === 0 ? (
                    col !== 8 ? (
                      <div className="verticalBar" />
                    ) : null
                  ) : null}
                </Fragment>
              ))}
            </div>
            {(row + 1) % 3 === 0 ? (
              row !== 8 ? (
                <div className="horizontalBar" />
              ) : null
            ) : null}
          </Fragment>
        ))}
      </div>
    );
  }

  useEffect(() => {
    if (showBoard) {
      setPossibilities(initStartingValues(entranceValues));
    }
  }, [entranceValues, showBoard]);

  // possibilities is a 3d array, containing the possibilities for each of the 81 squares. the third dimensions may be an...
  // array => representing possibilities
  // undefined => representing an improper collapse (no valid options)

  return (
    <Container w="fit-content">
      <Flex justify="space-between" my={10} w="100%" align="end">
        <Button onClick={() => setShowEntrance(true)} variant="default">
          <FaArrowLeft />
        </Button>
        <NumberInput
          label="Time Step (ms)"
          min={100}
          max={2000}
          placeholder="Step time (100-2000)"
          onValueChange={(values) =>
            setTimeDelayMs(values.floatValue ?? defaultTimeStep)
          }
          clampBehavior="blur"
          defaultValue={defaultTimeStep}
        />
        <Button onClick={() => solve(cloneDeep(possibilities))}>Solve</Button>
      </Flex>
      {getBoard()}
    </Container>
  );
}
