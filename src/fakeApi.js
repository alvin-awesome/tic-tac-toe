import { createServer } from "miragejs";
import { v4 as uuid } from 'uuid';

const DB = {
  games: {},
}

export default () => {
  createServer({
    routes() {
      this.namespace = "api"
  
      this.get("/users", function() {
        console.log('miragejs getUsers');
        return [
          { id: "1", name: "Luke" },
          { id: "2", name: "Leia" },
          { id: "3", name: "Anakin" },
        ]
      })

      this.post("/game", function() {
        const newGame = {
          id: uuid(),
          player: 0,
          step: 0,
          cells: Array(9).fill(0),
        };

        DB.games[newGame.id] = newGame;

        return newGame;
      })
    }
  })
};

