import {
  createServer,
  Model,
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
    serializers: {
      game: RestSerializer.extend({
        root: false,
        embed: true,
        include: ['player', 'record'],
      }),
    },
    routes() {
      this.namespace = 'api';

      /**
       * POST /game
       * {
       *   players: Player[],
       *   records: [{ player, cell }, { player, cell }, { player, cell }, ...]
       * }
       */
      this.post('/game', function (schema) {
        const newGame = {
          id: uuid(),
          playerIds: [1, 2],
        };
        const schemaGame = this.serialize(schema.create('game', newGame));

        return {
          id: schemaGame.id,
          players: schemaGame.player,
          records: schemaGame.record,
        };
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

      this.post('/game/:id/record', function (schema, request) {
        const attrs = JSON.parse(request.requestBody);
        const record = schema.create('record', {
          game: schema.games.find(request.params.id),
          player: schema.players.find(attrs.player),
          step: attrs.step,
          cell: attrs.cell,
        });
        return { id: record.id };
      });
    },
  });
}
