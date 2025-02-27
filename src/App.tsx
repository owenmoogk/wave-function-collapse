import { Box, Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useState } from 'react';
import { FaInfoCircle } from 'react-icons/fa';

import Board from './components/board/Board';
import Entrance from './components/Entrance';
import './index.css';
import { defaultBoard, emptyBoard, type BoardType } from './types';

function App() {
  const [entranceValues, setEntranceValues] = useState<BoardType>(emptyBoard);
  const [showBoard, setShowBoard] = useState<boolean>(false);
  const [showEntrance, setShowEntrance] = useState(true);
  const [modalShown, { open, close }] = useDisclosure();

  function enterBoard(values: BoardType) {
    setEntranceValues(values);
    setShowEntrance(false);
    setShowBoard(true);

    setEntranceValues(values);
    setShowEntrance(false);
    setShowBoard(true);
  }

  function setDefaultBoard() {
    setEntranceValues(defaultBoard);
    setShowEntrance(false);
    setShowBoard(true);
  }

  return (
    <div className="App">
      <Box className="navBar" id="header">
        <p>Wave Function Collapse</p>
        <div id="rightNav">
          <a href="https://owenmoogk.github.io">Owen Moogk</a>
          <FaInfoCircle onClick={() => open()} />
        </div>
      </Box>
      {showEntrance ? (
        <Entrance enterBoard={enterBoard} defaultBoard={setDefaultBoard} />
      ) : (
        <Board
          entranceValues={entranceValues}
          showBoard={showBoard}
          setShowEntrance={setShowEntrance}
        />
      )}
      <Modal opened={modalShown} onClose={close} title="Wave Function Collapse">
        <p>
          This website is designed with the intention of visualising the process
          of a wave function collapse, to get to a desired result... but what
          even is a wave function?
          <br />
          <br />
          Formally, it is "a variable quantity that mathematically describes the
          characteristics of a system." Essentially, we can take an unsolved
          system with many unknowns, and set out rules that the system must
          obey. In this case, it must obey the rules of a sudoku.
          <br />
          <br />
          Then, we can systematically choose values that satisfy the rules
          (known as 'collapsing' the wave function), and diverge upon a solution
          (note that there may sometimes be error in the chosen values, which is
          why backtracking is necessary).
          <br />
          <br />
          Why is it powerful? It is much better than brute force, and is an
          intelligent way to approach many problems. It's unique in that it does
          not only solve problems with one solution. Applications of this
          include{' '}
          <a href="https://bolddunkley.itch.io/wfc-mixed">
            terrain generation for video games
          </a>
          , and quantum mechanics (which I'm definitely not qualified to talk
          about)!
          <br />
          <br />
          For more details have a look at the{' '}
          <a href="https://owenmoogk.github.io/projects/wave-function-collapse">
            project page
          </a>{' '}
          on my website.
        </p>
      </Modal>
    </div>
  );
}

export default App;
