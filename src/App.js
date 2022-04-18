import { useState, useCallback } from 'react';
import {
  useGetGameQuery,
  useCreateGameMutation,
  useAddGameRecordMutation,
} from './services/index';

import styles from './App.module.css';

import O from './components/O';
import X from './components/X';

const initialState = [0, 0, 0, 0, 0, 0, 0, 0, 0];

function App() {
  const [cells, setCells] = useState([...initialState]); // 0 = no, 1 == x, 2 == o
  const [step, setStep] = useState(0);
  const player = (step % 2) + 1;

  const [
    createGame,
    { isLoading: isCreatingGame, isSuccess: isGameCreated, data: game },
  ] = useCreateGameMutation();
  const {
    data: gameWithId,
    isFetching: isFetchingGame,
    isSuccess: isGameFetched,
    refetch: refetchGame,
  } = useGetGameQuery(game?.id, {
    skip: !game?.id,
  });
  const [
    addGameRecord,
    {
      isLoading: isAddingGameRecord,
      isSuccess: isGameRecordAdded,
      data: record,
    },
  ] = useAddGameRecordMutation();

  const isVictory = (cells) => {
    const positions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    const isRowComplete = (row) => {
      const symbols = row.map((i) => cells[i]);
      return symbols.every((i) => i !== null && i === symbols[0] && i !== 0);
    };

    return positions.map(isRowComplete).some((i) => i === true);
  };

  const handleClickGrid = (cellIndex) => {
    if (cells[cellIndex]) {
      return;
    }

    addGameRecord({ id: game?.id, player, cell: cellIndex, step });

    // TODO: 5/2 invalidate game tag, in order to trigger query again.

    cells[cellIndex] = player;
    setCells([...cells]);
    setStep(step + 1);
  };

  return (
    <div>
      <div>
        <button onClick={createGame}>Create new game</button>
        {isCreatingGame && 'Creating game'}
        {isGameCreated && `Room id: ${game.id}`}
      </div>
      <div>
        <button onClick={refetchGame}>Fetch game</button>
        {isFetchingGame && 'Fetching game by id'}
        {isGameFetched && `Room id: ${game.id}`}
      </div>
      <div className={styles['grid-container']}>
        {cells.map((cellVal, cellIndex) => (
          <div
            key={cellIndex}
            className={styles['grid-item']}
            onClick={() => {
              handleClickGrid(cellIndex);
            }}
          >
            {cellVal === 1 && <X />}
            {cellVal === 2 && <O />}
          </div>
        ))}
      </div>
      <div>{isVictory(cells) && `player#${player} win`}</div>
    </div>
  );
}

export default App;
