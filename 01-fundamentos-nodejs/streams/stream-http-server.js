import http from 'node:http';
import { Transform } from 'node:stream';

class InverseNumberStream extends Transform {
    _transform(chunk, encoding, callback) {
        const transformed = Number(chunk.toString()) * -1

        console.log(transformed);
        callback(null, Buffer.from(String(transformed)))
    }
}


const servers = http.createServer(async (request, response) => {
    const Buffers = [];
    
    for await (const chunk of request) {
        Buffers.push(chunk);  
    }
    const fullstreamcontent = Buffer.concat(Buffers).toString();
    console.log(fullstreamcontent);
    return response.end(fullstreamcontent);
    //return request
      //  .pipe(new InverseNumberStream())
        //.pipe(response);
});

servers.listen(3334, () => console.log('Server is running on http://localhost:3334'));