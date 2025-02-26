import { cloneDeep } from 'lodash';

import type { BoardType, PossibilitiesType } from '../types';

export function isBoardSolved(tmpPossibilities: PossibilitiesType): boolean {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      const currentPossibilities = tmpPossibilities[row][col];
      if (!currentPossibilities || currentPossibilities.length !== 1) {
        return false;
      }
    }
  }
  return true;
}

export function initStartingValues(entranceValues: BoardType) {
  let startingPossibilities: PossibilitiesType = [];
  for (let row = 0; row < 9; row++) {
    startingPossibilities[row] = [];
    for (let column = 0; column < 9; column++) {
      // if the value was set by the user
      const value = entranceValues[row][column];
      if (value) {
        startingPossibilities[row][column] = [value];
      }
      // if the value was not set, then set all possibilities
      else {
        startingPossibilities[row][column] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
      }
    }
  }

  // do the wfc for all the items that the user has just inputted
  for (let row = 0; row < 9; row++) {
    for (let column = 0; column < 9; column++) {
      // if the value was set by the user
      const possibleValues = startingPossibilities[row][column];
      if (possibleValues && possibleValues.length === 1) {
        startingPossibilities = propagate(
          row,
          column,
          possibleValues[0],
          startingPossibilities
        )[0];
      }
    }
  }
  return startingPossibilities;
}

function updateCell(
  row: number,
  col: number,
  numberToEliminate: number,
  tmpPossibilities: PossibilitiesType
): [
  PossibilitiesType,
  { row: number; col: number; number: number } | undefined,
  failed: boolean,
] {
  let propagateData = undefined;
  let failed = false;
  const lengthBeforeFilter = tmpPossibilities[row][col]?.length;

  if (tmpPossibilities[row][col]) {
    tmpPossibilities[row][col] = tmpPossibilities[row][col].filter(
      (value) => value !== numberToEliminate
    );
  }

  if (tmpPossibilities[row][col] && tmpPossibilities[row][col].length === 0) {
    tmpPossibilities[row][col] = undefined;
    failed = true;
  }

  if (
    tmpPossibilities[row][col] &&
    tmpPossibilities[row][col].length === 1 &&
    lengthBeforeFilter &&
    lengthBeforeFilter > 1
  ) {
    propagateData = {
      row: row,
      col: col,
      number: tmpPossibilities[row][col][0],
    };
  }

  return [tmpPossibilities, propagateData, failed];
}

export function propagate(
  row: number,
  col: number,
  chosenNumber: number,
  tmpPossibilities: PossibilitiesType,
  depth = 0
): [PossibilitiesType, failed: boolean] {
  tmpPossibilities[row][col] = [chosenNumber];

  // propagateData is an array of all the cells that were changes, and this need to be further updated
  const propagateData = [];
  let tmpPropagateData, tmpFailed;
  let failed = false;

  // update the rows
  for (let i = 0; i < 9; i++) {
    if (i !== col) {
      [tmpPossibilities, tmpPropagateData, tmpFailed] = updateCell(
        row,
        i,
        chosenNumber,
        tmpPossibilities
      );
      propagateData.push(tmpPropagateData);
      if (tmpFailed) {
        failed = true;
      }
    }
  }

  // update the columns
  for (let i = 0; i < 9; i++) {
    if (i !== row) {
      [tmpPossibilities, tmpPropagateData, tmpFailed] = updateCell(
        i,
        col,
        chosenNumber,
        tmpPossibilities
      );
      propagateData.push(tmpPropagateData);
      if (tmpFailed) {
        failed = true;
      }
    }
  }

  // update the boxes
  for (let i = row - 2; i <= row + 2; i++) {
    // if it is in the same row of boxes
    if (Math.floor(i / 3) === Math.floor(row / 3) && i !== row) {
      for (let j = col - 2; j <= col + 2; j++) {
        // if it is the same column of boxes
        if (Math.floor(j / 3) === Math.floor(col / 3) && col !== j) {
          [tmpPossibilities, tmpPropagateData, tmpFailed] = updateCell(
            i,
            j,
            chosenNumber,
            tmpPossibilities
          );
          propagateData.push(tmpPropagateData);
          if (tmpFailed) {
            failed = true;
          }
        }
      }
    }
  }

  // further propagate that who needs it
  let newPossibilities = cloneDeep(tmpPossibilities);
  for (let i = 0; i < propagateData.length; i++) {
    const currentCellData = propagateData[i];
    if (currentCellData) {
      [newPossibilities, tmpFailed] = propagate(
        currentCellData.row,
        currentCellData.col,
        currentCellData.number,
        tmpPossibilities,
        depth + 1
      );
      if (tmpFailed) {
        failed = true;
      }
    }
  }
  return [newPossibilities, failed];
}
