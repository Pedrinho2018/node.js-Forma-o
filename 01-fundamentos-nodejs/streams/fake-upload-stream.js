import { Readable, Transform } from 'node:stream';
import { text } from 'node:stream/consumers';

class InverseNumberStream extends Transform {
    _transform(chunk, encoding, callback) {
        const transformed = Number(chunk.toString()) * -1
        callback(null, Buffer.from(String(transformed)))
    }
}

class OneToHundredStream extends Readable{
    index = 1

    _read() {
        const i = this.index++
        setTimeout(() => {
            if (i > 5 ) {
                this.push(null);
            }
            else {
                const buff = Buffer.from(String(i))
                this.push(buff)
            }
        }, 1000);
    }
}

fetch('http://localhost:3334', {
    method: 'POST',
    body: new OneToHundredStream(),
    duplex: 'half'
}).then(response => {
    response.text().then(data => {
        console.log(data)
    })
})