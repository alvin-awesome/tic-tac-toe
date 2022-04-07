import {
  createServer,
  Model,
  Factory,
  hasMany,
  belongsTo,
  RestSerializer,
} from 'miragejs';
import { v4 as uuid } from 'uuid';

export default function server() {
  createServer({
    seeds(_server) {
      _server.create('player', { id: 1 });
      _server.create('player', { id: 2 });
    },
    models: {
      game: Model.extend({ record: hasMany(), player: hasMany() }),
      player: Model.extend({ game: hasMany(), record: hasMany() }),
      record: Model.extend({ game: belongsTo(), player: belongsTo() }),
    },
    factories: {
      game: Factory.extend({}),
      player: Factory.extend({}),
      record: Factory.extend({}),
    },
    serializers: {
      game: RestSerializer.extend({
        root: false,
        embed: true,
        include: ['player', 'record'],
      }),
    },
    routes() {
      this.namespace = 'api';

      this.post('/game', function (schema) {
        // FIXME: figure out relation between game and player, game and record
        const newGame = {
          id: uuid(),
          player: [
            schema.create('player', { id: 1 }),
            schema.create('player', { id: 2 }),
          ],
          record: [],
        };
        schema.create('game', newGame);
        return newGame;
      });

      /**
       * GET /game/:id
       * {
       *   players: Player[],
       *   records: [{ player, cell }, { player, cell }, { player, cell }, ...]
       * }
       */
      this.get('/game/:id', function (schema, request) {
        let id = request.params.id;
        const schemaGame = schema.games.find(id);
        const res = this.serialize(schemaGame);

        return {
          id: schemaGame.id,
          records: res.record,
          players: res.player,
        };
      });

      this.patch('/game/:id', function (schema, request) {
        const attrs = JSON.parse(request.requestBody);
      });
    },
  });
}
