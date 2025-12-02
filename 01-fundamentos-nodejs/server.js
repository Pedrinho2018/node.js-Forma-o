import http from 'node:http'

//criar um usuario(nome,email,senha)

const server = http.createServer((req, res) => {
    return res.end('Hello ignite!')

})

server.listen(333)