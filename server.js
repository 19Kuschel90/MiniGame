// import BVH from './node_modules/BVH.mjs';
// import Collisions from 'collisions';
// import { Collisions, Circle, Polygon, Point } from './node_modules/collisions';

// const system = new Collisions();
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



// const system = new Collisions();

// const circle = system.createCircle(100, 100, 10);
// const polygon = system.createPolygon(50, 50, [
//     [0, 0],
//     [20, 20],
//     [-10, 10]
// ]);
// const line = system.createPolygon(200, 5, [
//     [-30, 0],
//     [10, 20]
// ]);
// const point = system.createPoint(10, 10);
// circle.x = 20;
// circle.y = 30;
// circle.scale = 1.5;

// polygon.x = 20;
// polygon.y = 30;
// polygon.scale_x = 1.2;
// polygon.scale_y = 3.4;
// polygon.angle = 1.2;
// system.update();



// const potentials = polygon.potentials();

// for (const body of potentials) {
//     console.log('test!');
//     if (polygon.collides(body)) {
//         console.log('Collision detected!');
//     }
// }

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