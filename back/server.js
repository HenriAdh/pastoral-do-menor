import fastify from "fastify";
import { databasememory } from "./databaseTest.js";
import { databaseStock } from "./db/dbStock.js";
import fastifyCors from "@fastify/cors"

const server = fastify();

const dbUser = new databasememory();
const dbStock = new databaseStock();

server.register(fastifyCors, {
    // Configuração do CORS
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
  });

server.post('/register', (req, res) => {
    const { uid, name, username, email, pass, adm } = req.body;
    const newUser = dbUser.create(uid, {
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
    const users = dbUser.list(search);

    return users;
})

server.put('/users/:id', (req, res) => {
    const userId = req.params.id;
    const { name, username, email, adm } = req.body;

    dbUser.update(userId, {
        name,
        username,
        email,
        adm
    });

    return res.status(204).send('Atualizado com sucesso!');
})

server.delete('/users/:id', (req, res) => {
    const userId = req.params.id;

    dbUser.delete(userId)

    return res.status(204).send('Deletado com sucesso!');
})

server.post('/newItem', (req, res) => {
    const date = new Date();
    const newId = dbStock.listIds();
    let id = 0;
    if (newId) newId.forEach(element => {
        if (element.id > id) id = element.id;
    });
    id++;
    id = `${id}`;
    const { category, material, uni, amount, description, location } = req.body;
    const newItem = dbStock.create(id, {
        category,
        material,
        uni,
        amount,
        description,
        location,
        'dtReg' : date,
        "active": 1,
    });

    return res.status(201).send(newItem);
})

server.get('/getItens', (req, res) => {
    const search = req.query.search;
    const param = req.query.param;
    const active = req.query.active;
    const itensList = dbStock.list(search, param, active);

    return itensList;
})

server.put('/itens/:id', (req, res) => {
    const itemId = req.params.id;
    const { amount } = req.body;

    dbStock.update(itemId, amount);

    return res.status(204).send('Estoque atualizado.');
})

server.delete('/itens/:id', (req, res) => {
    const itemId = req.params.id;

    dbStock.update(itemId, {
        "active": 0,
    });

    return res.status(204).send('Deletado com sucesso.');
})

server.listen({
    port: 3333,
})