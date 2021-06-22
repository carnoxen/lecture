import express from "express";
import http from "http";
import path from "path";
import { Server } from "socket.io";

const app = express();
const __dirname = path.resolve();

const server = http.createServer(app);
server.listen(80);

app.use(express.static(__dirname + '/web'));
app.use(express.json());

app.get('/', function (req, res) {
    console.log("[Server] GET : /")
    res.send('Hi, Client, I am a server');
});

app.post('/', (req, res) => {
    console.log(`[Server] POST : ${JSON.stringify(req.body)}`)
    res.send(`post value is : ${req.body.Client}`)
})

const io = new Server(server);

io.on('connection', function (socket) {
    console.log('connect');
    var instanceId = socket.id;
    var roomName;

    socket.on('joinRoom', function (data) {
        console.log(data);
        socket.join(data.roomName);
        roomName = data.roomName;
    });

    socket.on('reqMsg', function (data) {
        console.log(data);
        io.sockets.in(roomName).emit('recMsg', { comment: instanceId + " : " + data.comment + '\n' });
    })
});