import { useState, useCallback } from 'react';
import { useGetUsersQuery, useCreateGameMutation } from './services/index';

import styles from './App.module.css';

import O from './components/O';
import X from './components/X';

const initialState = [0, 0, 0, 0, 0, 0, 0, 0, 0];

function App() {
  const [cells, setCells] = useState([...initialState]); // 0 = no, 1 == x, 2 == o
  const [step, setStep] = useState(0);
  const player = step % 2 + 1;

  const [
    createGame,
    {
      isLoading: isCreatingGame,
      isSuccess: isGameCreated,
      data: game
    }
  ] = useCreateGameMutation();

  const isVictory = (cells) => {
    const positions = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6],
      [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]
    ];

    const isRowComplete = row => {
      const symbols = row.map(i => cells[i]);
      return symbols.every(i => i !== null && i === symbols[0] && i !== 0);
    };

    return positions.map(isRowComplete).some(i => i === true);
  }

  const handleClickGrid = (cellIndex) => {
    if (cells[cellIndex]) { return; }

    cells[cellIndex] = player;
    setCells([...cells]);
    setStep(step + 1);
  };

  const handleCreateNewGame = useCallback(() => {
    createGame();
    // setCells([...initialState]);
    // setStep(0);
  }, []);

  return (
    <div>
      <button onClick={handleCreateNewGame}>Create new game</button>
      {isCreatingGame && 'Creating game'}
      {isGameCreated && `Room id: ${game.id}`}
      <div className={styles['grid-container']}>
        {cells.map((cellVal, cellIndex) =>
          <div key={cellIndex} className={styles['grid-item']} onClick={() => {
            handleClickGrid(cellIndex);
          }}>
            {cellVal === 1 && <X />}
            {cellVal === 2 && <O />}
          </div>
        )}
      </div>
      <div>{isVictory(cells) && `player#${player} win`}</div>
    </div>
  );
}

export default App;
