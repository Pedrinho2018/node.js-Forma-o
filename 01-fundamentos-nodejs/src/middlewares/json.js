export async function json(request, response) {
    const Buffers = [];

    for await (const chunk of request) {
        Buffers.push(chunk);
    }
    try {
        request.body = JSON.parse(Buffer.concat(Buffers).toString());
    } catch {
        request.body = null;
    }
    request
    response.setHeader('Content-Type', 'application/json')
}