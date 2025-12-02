import http from 'node:http'

//criar um usuario(nome,email,senha)

const server = http.createServer((req, res) => {
    const method = req.method
    const url = req.url

    console.log(method, url)

    return res.end('Hello ignite!')

})

server.listen(3333)