import { sleep } from './utils';
import { v4 as uuid } from 'uuid';

function Game() {
  return {
    id: uuid(),
    player: 0,
    step: 0,
    cells: Array(9).fill(0),
  }
}

async function createGame() {
  await sleep(2000);
  const ng = new Game();
  sessionStorage.setItem('active_game', JSON.stringify(ng))
}

async function getGameById(gameId) {
  const ag = await sessionStorage.getItem('active_game');
  return JSON.parse(ag);
}
