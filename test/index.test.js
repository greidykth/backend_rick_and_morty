const app = require("../src/server");
const session = require("supertest");
const agent = session(app);
const validUsers = require("../src/utils/users");

let char, char2;
let favs = [];
beforeAll(() => {
  char = {
    id: 1,
    status: "Alive",
    name: "Rick Sanchez",
    species: "Human",
    origin: {
      name: "Earth (C-137)",
      url: "https://rickandmortyapi.com/api/location/1",
    },
    image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
    gender: "Male",
  };
  char2 = {
    id: 2,
    status: "Alive",
    name: "Rick Sanchez",
    species: "Human",
    origin: {
      name: "Earth (C-137)",
      url: "https://rickandmortyapi.com/api/location/1",
    },
    image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
    gender: "Male",
  };
  favs.push(char);
  favs.push(char2);
});

describe("Test de RUTAS", () => {
  describe("GET /rickandmorty/character/:id", () => {
    it("Response status: 200 in route /character/:id", async () => {
      const response = await agent.get("/rickandmorty/character/1");
      expect(response.statusCode).toBe(200);
    });
    it('Responde un objeto con las propiedades: "id", "name", "species", "gender", "status", "origin" e "image"', async () => {
      const response = await agent.get("/rickandmorty/character/1");
      expect(response.body).toHaveProperty("id");
      expect(response.body).toHaveProperty("name");
      expect(response.body).toHaveProperty("species");
      expect(response.body).toHaveProperty("gender");
      expect(response.body).toHaveProperty("status");
      expect(response.body).toHaveProperty("origin");
      expect(response.body).toHaveProperty("image");

      expect(Object.keys(response.body)).toEqual([
        //El orden de las propiedades importa
        "id",
        "status",
        "name",
        "species",
        "origin",
        "image",
        "gender",
      ]);
    });
    it("Response status: 200 in route /character/:id and a character", async () => {
      const response = await agent.get("/rickandmorty/character/1");
      expect(response.body).toEqual(char);
    });
    it("Si hay un error responde con status: 500", () => {
      return agent
        .get("/rickandmorty/character/77777")
        .send()
        .then((response) => expect(response.statusCode).toBe(500));
    });
  });
  describe("GET /rickandmorty/login", () => {
    it("Response status: 200 in route /rickandmorty/login", async () => {
      const response = await agent
        .get("/rickandmorty/login")
        .query({
          email: validUsers[0].email,
          password: validUsers[0].password,
        });
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual({
        access: true,
      });
    });
    it("Response status: 200 in route /rickandmorty/login", async () => {
      const response = await agent
        .get("/rickandmorty/login")
        .query({ email: "grei", password: validUsers[0].password });
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual({
        access: false,
      });
    });
    it("Response status: 500 in route /rickandmorty/login with wrong querys", async () => {
      const response = await agent
        .get("/rickandmorty/login")
        .query({ emai: validUsers[0].email, password: validUsers[0].password });
      expect(response.statusCode).toBe(500);
      expect(response.body).toEqual({
        message: "There isn't a password or email",
      });
    });
  });

  describe("POST /rickandmorty/fav", () => {
    it("Response status: 200 in route /rickandmorty/fav", async () => {
      const response = await agent.post("/rickandmorty/fav").send(char);
      expect(response.statusCode).toBe(200);
    });
    it("Response 400 when try to add a character that was added before", async () => {
      const res = await agent.post("/rickandmorty/fav").send(char);
      expect(res.body).toEqual({"message": "Fav already was added"});
      expect(res.statusCode).toBe(400);
    });
    it("Response status: 404 in route rickandmorty/favorite id by body", async () => {
      const res = await agent.post("/rickandmorty/fav").send({});
      expect(res.statusCode).toBe(404);
    });
  });

  describe("DELETE /rickandmorty/fav/:id", () => {
    it("Response status: 200 in route /rickandmorty/fav:id", async () => {
      await agent.post("/rickandmorty/fav").send(char);
      const response = await agent.delete("/rickandmorty/fav/1");
      expect(response.statusCode).toBe(200);
    });

    it("Response myFavorites in delete rickandmorty/favorite", async () => {
      await agent.post("/rickandmorty/fav").send(char);
      await agent.post("/rickandmorty/fav").send(char2);
      const res = await agent.delete("/rickandmorty/fav/1");
      expect(res.body).toEqual([char2]);
    });

    it("Response status: 404 in route rickandmorty/favorite without id", async () => {
      const res = await agent.delete("/rickandmorty/fav");
      expect(res.statusCode).toBe(404);
    });
    it("Response status: 404 in route rickandmorty/favorite with wrong id", async () => {
      const res = await agent.delete("/rickandmorty/fav/3");
      expect(res.statusCode).toBe(404);
    });
  });
});
