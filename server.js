class CMyTime {

    constructor(Name = "SERVER") {
        this.Name = Name;
    }

    ////////////////////////////////////////////
    // return time as string
    getTimeNow() {
        var dt = new Date();
        var utcDate = dt.toUTCString();
        return utcDate;
    }

    /////////////////////////////////////////////////
    // return void and post cosole log
    CL(Srting) {
        console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');
        console.log(this.getTimeNow() + " " + this.Name + ": " + Srting);
        console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');

    }
}
var time = new CMyTime();

var express = require('express');
const path = require('path');

var app = express();

const root = './dist/public'; // export folder
const port = 3000;

app.use(express.static(root));
app.set('port', process.env.PORT || port); // z.B: PORT=9000 npm start
var server = app.listen(process.env.PORT || port);
time.CL('is running ' + app.get('port'));


app.use(express.static(root));



app.get('/', function(request, response) {
    // time.CL('requst is  ' + request);

    response.sendFile(path.resolve(__dirname, root, 'index.html'));
});

var io = require('socket.io')(server);
io.listen(server);

const GameRoom1 = io.of('/GameRoom1');
GameRoom1.on('connection', (socket) => {

    time.CL("user Login" + socket.id);
    socket.emit('join', "You Join the Room");
    socket.emit('myID', socket.id);
    socket.on('newPos', (pos) => {
        GameRoom1.emit('newPos', pos);

    });
});