import { Title } from '@mantine/core';
import { useState } from 'react';

import Board from './components/board/Board';
import Entrance from './components/Entrance';
import './index.css';
import { InfoModal } from './InfoModal';
import { defaultBoard, emptyBoard, type BoardType } from './types';

function App() {
  const [entranceValues, setEntranceValues] = useState<BoardType>(emptyBoard);
  const [showBoard, setShowBoard] = useState<boolean>(false);
  const [showEntrance, setShowEntrance] = useState(true);

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
      <Title mt={20}>Wave Function Collapse</Title>

      {showEntrance ? (
        <Entrance enterBoard={enterBoard} defaultBoard={setDefaultBoard} />
      ) : (
        <Board
          entranceValues={entranceValues}
          showBoard={showBoard}
          setShowEntrance={setShowEntrance}
          setEntranceValues={setEntranceValues}
        />
      )}
      <InfoModal />
    </div>
  );
}

export default App;
