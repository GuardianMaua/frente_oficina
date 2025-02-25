require("dotenv").config();

const moviesList = require("./movies");
const fastify = require("fastify")({ logger: true });
const cors = require("@fastify/cors");

fastify.register(cors, {
  origin: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
});

fastify.get("/api/movies", async (request, reply) => {
  return moviesList;
});

fastify.get("/api/movies/:id", async (request, reply) => {
  const { id } = request.params;
  const movieId = parseInt(id, 10);

  if (movieId === 0) {
    return {
      title: "Parabéns! Você encontrou a flag!",
      year: 0o0000,
      description: `A flag é: ${process.env.FLAG}`,
    };
  }

  if (isNaN(movieId)) {
    return reply.status(400).send({ error: "ID inválido" });
  }

  const movie = moviesList.find((movie) => movie.id === movieId);
  if (movie) {
    return movie;
  } else {
    return reply.status(404).send({ error: "Filme não encontrado" });
  }
});

const start = async () => {
  try {
    const port = process.env.PORT || 5000;
    await fastify.listen({ port, host: "0.0.0.0" });
    console.log(`Servidor rodando na porta: ${port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
