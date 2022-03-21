import { createServer, Model, Factory } from 'miragejs';
import { v4 as uuid } from 'uuid';

export default function server() {
  createServer({
    seeds(_server) {
      _server.create('player', { id: 1 });
      _server.create('player', { id: 2 });
    },
    models: {
      game: Model,
      player: Model,
    },
    factories: {
      game: Factory.extend({}),
      player: Factory.extend({}),
    },
    routes() {
      this.namespace = 'api';

      this.post('/game', function (schema) {
        const newGame = {
          id: uuid(),
        };
        schema.games.create(newGame);
        return newGame;
      });

      this.get('/game/:id', function (schema, request) {
        let id = request.params.id;
        return schema.games.find(id);
      });

      this.patch('/game/:id', function (schema, request) {
        const attrs = JSON.parse(request.requestBody);
      });
    },
  });
}
