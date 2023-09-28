import { fastify  } from "fastify";
import { databasememory } from "./databaseTest.js";

const server = fastify();

const database = new databasememory();

server.post('/users', (req, res) => {
    const { name, old, email } = req.body;
    console.log(name, old, email);

    database.create({
        name,
        old,
        email,
    });

    return res.status(201).send();
})

server.get('/users', (req, res) => {
    const search = req.query.search;
    const users = database.list(search);

    return users
})

server.put('/users/:id', (req, res) => {
    const userId = req.params.id;
    const { name, old, email } = req.body;

    database.update(userId, {
        name, 
        old, 
        email,
    });

    return res.status(204).send();
})

server.delete('/users/:id', (req, res) => {
    const userId = req.params.id;

    database.delete(userId)

    return res.status(204).send();
})

server.listen({
    port: 3333,
})