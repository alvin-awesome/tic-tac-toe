import { createServer, Model, Factory } from "miragejs";
import { v4 as uuid } from 'uuid';

export default () => {
  createServer({
    // seeds(server) {
    //   server.create("reminder", { text: "Walk the dog" })
    //   server.create("reminder", { text: "Take out the trash" })
    //   server.create("reminder", { text: "Work out" })
    // },
    models: {
      game: Model,
    },

    factories: {
      game: Factory.extend({
        
      }),
    },
    routes() {
      this.namespace = "api"
  
      this.get("/game/:id", function(schema, request) {
        let id = request.params.id;
        return schema.games.find(id);
      })

      this.post("/game/:id", function(schema, request) {
        const attrs = JSON.parse(request.requestBody);
      });

      this.post("/game", function(schema) {
        const newGame = {
          id: uuid(),
          player: 0,
          step: 0,
          cells: Array(9).fill(0),
        };
        schema.games.create(newGame);
        return newGame;
      })
      // this.post("/api/reminders", (schema, request) => {
      //   let attrs = JSON.parse(request.requestBody)

      //   return schema.reminders.create(attrs)
      // })
    }
  })
};

