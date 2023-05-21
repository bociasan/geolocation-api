import {WebSocketServer} from 'ws';
import express from 'express';

const app = express();
const port = 3000
const wss = new WebSocketServer({port: 2000 });
let state = {millis: 0}
let millisFlag = true
const millisFunc = () => {
    if (millisFlag){
        setTimeout(() => {
            state.millis++
            wss.clients.forEach(function each(ws) {
                if (ws.isAlive === false) return ws.terminate();
                ws.send(JSON.stringify(state));
            });
            // console.log(millis)
            millisFunc()
        }, 1000)
    }
}
millisFunc()
const startMillis = () => {
    millisFlag = true
    millisFunc()
}
const stopMillis = () => {
    millisFlag = false
}

wss.on('connection', function connection(ws) {
    ws.on('error', console.error);
    ws.on('message', function message(data) {
        console.log('received: %s', data);
    });
});
app.get('/', function (request, response) {
    response.sendFile("index.html", { root: '.' });
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})