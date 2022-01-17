import { useState, useCallback } from 'react';

import styles from './App.module.css';

import O from './components/O';
import X from './components/X';

// { // Redux store
// 	games: [gameId, gameId],
// }


// interface Game {
// 	id: number;
// 	players: Player[];
// 	cells: Number[]
// }

const initialState = [0, 0, 0, 0, 0, 0, 0, 0, 0];

function App() {
  const [cells, setCells] = useState([...initialState]); // 0 = no, 1 == x, 2 == o
  const [step, setStep] = useState(0);

  const handleClickGrid = (cellIndex) => {
    const player = step % 2 + 1;

    if (cells[cellIndex]) { return; }

    cells[cellIndex] = player;
    setCells([...cells]);
    setStep(step + 1);
  };

  const handleClickPlayAgain = useCallback(() => {
    setCells([...initialState]);
    setStep(0);
  }, []);

  return (
    <div>
      <button onClick={handleClickPlayAgain}>Play again</button>
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
    </div>
  );
}

export default App;
