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

var spawnPoints = {
    point: [{

        x: 100,
        y: 100
    }, {
        x: 200,
        y: 500
    }, {
        x: 300,
        y: 100
    }, {
        x: 100,
        y: 200
    }],
    index: 0
};

var listOfPlayer = [];


GameRoom1.on('connection', (socket) => {

    // set spawn piont
    spawnPoints.index++;
    if (spawnPoints.index > spawnPoints.point.length - 1) {
        spawnPoints.index = 0;
    }
    listOfPlayer.push({
        postion: {
            x: spawnPoints.point[spawnPoints.index].x,
            y: spawnPoints.point[spawnPoints.index].y
        },
        id: socket.id,
        name: "Server Player",
        collider: null
    });
    time.CL("user Login" + socket.id);
    // socket.emit('join', );
    socket.emit('myID', listOfPlayer[listOfPlayer.length - 1]);
    GameRoom1.emit('sendListOfPlayer', listOfPlayer);
    // GameRoom1.emit('addNewPlayer', {
    //     postion: {
    //         x: spawnPoints.point[spawnPoints.index].x,
    //         y: spawnPoints.point[spawnPoints.index].y
    //     },
    //     id: socket.id,
    //     name: "Server Player",
    //     collider: null
    // })

    socket.on('newPos', (pos) => {
        GameRoom1.emit('newPos', pos);
        (listOfPlayer.filter(listOfPlayer => listOfPlayer.id == pos[2]))[0].postion.x = pos[0];
        (listOfPlayer.filter(listOfPlayer => listOfPlayer.id == pos[2]))[0].postion.y = pos[1];
    });


    //////////////////////////////
    // disconnet
    socket.on('disconnet', (id) => {
        // console.log("disconnet");
        // console.log(id);
        if (socket.id == id) {
            removePlayer(socket.id);
        }
        GameRoom1.emit('removePlayer', id);
    });
});

function removePlayer(id) {
    listOfPlayer = listOfPlayer.filter(listOfPlayer => listOfPlayer.id != id);
    // console.log("end: ", listOfPlayer);


}