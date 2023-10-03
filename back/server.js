import { fastify  } from "fastify";
import { databasememory } from "./databaseTest.js";

const server = fastify();

const database = new databasememory();

server.post('/register', (req, res) => {
    const { name, username, email, pass, adm } = req.body;
    database.create({
        name,
        username,
        email,
        pass,
        adm,
    });

    return res.status(201).send('Criado com sucesso!');
})

server.get('/login', (req, res) => {
    const search = req.query.search;
    const users = database.list(search);

    console.log(users);

    return users
})

server.put('/users/:id', (req, res) => {
    const userId = req.params.id;
    const { name, username, email, pass, adm } = req.body;

    database.update(userId, {
        name,
        username,
        email,
        pass,
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