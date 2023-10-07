import fastify from "fastify";
import { databasememory } from "./databaseTest.js";
import fastifyCors from "@fastify/cors"

const server = fastify();

const database = new databasememory();

server.register(fastifyCors, {
    // Configuração do CORS
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
  });

server.post('/register', (req, res) => {
    const { uid, name, username, email, pass, adm } = req.body;
    const newUser = database.create(uid, {
        name,
        username,
        email,
        pass,
        adm,
    });

    return res.status(201).send(newUser);
})

server.get('/login', (req, res) => {
    const search = req.query.search;
    const users = database.list(search);

    return users;
})

server.put('/users/:id', (req, res) => {
    const userId = req.params.id;
    const { name, username, email, adm } = req.body;

    database.update(userId, {
        name,
        username,
        email,
        adm
    });

    return res.status(204).send('Atualizado com sucesso!');
})

server.delete('/users/:id', (req, res) => {
    const userId = req.params.id;

    database.delete(userId)

    return res.status(204).send('Deletado com sucesso!');
})

server.listen({
    port: 3333,
})