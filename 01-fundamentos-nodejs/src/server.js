import { Database } from './database.js';
import { json } from './middlewares/json.js';
import http from 'node:http';

const database = new Database(); 

const server = http.createServer(async (request, response) => {
    const { method, url } = request;

    await json(request, response);

    if (method === 'GET' && url === '/users') {
        const users = database.select('users');
        
        return response.end(JSON.stringify(users));
    }

    if (method === 'POST' && url === '/users') {
        // O ?? {} evita que o código quebre se o corpo for nulo
        const { name, email } = request.body ?? {};

        if (!name || !email) {
            return response.writeHead(400).end(
                JSON.stringify({ message: 'Name and email are required' })
            );
        }

        const user = {
            id: 1,
            name,
            email,
        };

        database.insert('users', user);

        return response.writeHead(201).end();
    }

    return response.writeHead(404).end();
});

server.listen(3333, () => console.log('Server is running on http://localhost:3333'));