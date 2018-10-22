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
const fileUpload = require('express-fileupload');
const path = require('path');
var app = express();
const root = './dist/public'; // export folder
const port = 3000;
app.use(express.static(root));
app.set('port', process.env.PORT || port); // z.B: PORT=9000 npm start
var server = app.listen(process.env.PORT || port);
time.CL('is running ' + app.get('port'));

app.use(express.static(root));
app.use(fileUpload());


app.get('/', function(request, response) {
    // time.CL('requst is  ' + request);
    response.sendFile(path.resolve(__dirname, root, 'index.html'));
});

app.post('/upload', function(req, res) {

    if (!req.files)
        return res.status(400).send('No files were uploaded.');

    // console.log(req.files);
    // console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$");
    // console.log(req.files.sampleFile[0]);
    let index = 0;
    req.files.sampleFile.forEach(element => {
        try {
            index++;
            // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file

            element.mv(`dist/public/uploadimg/filename${index}.png`, function(err) {
                if (err)
                    return res.status(500).send(err);

                // res.send('File uploaded!');
                console.log("file uploaded");

                res.sendFile(path.resolve(__dirname, root, 'game.html'));

            });
        } catch (error) {
            console.log("file uploaded fail");
            console.log(error);
        }
    });

    // let sampleFile = req.files.sampleFile[0];

    // console.log(sampleFile);
    // Use the mv() method to place the file somewhere on your server
});

app.get('/EDITOR', function(request, response) {

    // time.CL('requst is  ' + request);

    response.sendFile(path.resolve(__dirname, root, 'editor.html'));
});

app.get('/GAME', function(request, response) {
    // time.CL('requst is  ' + request);

    response.sendFile(path.resolve(__dirname, root, 'game.html'));
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

        x: 500,
        y: 600
    }, {
        x: 250,
        y: 500
    }, {
        x: 1000,
        y: 400
    }, {
        x: 1000,
        y: 900
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
        collider: null,
        direction: "left"
    });
    time.CL("user Login" + socket.id);

    socket.on('cookie', (cookie) => {
        console.log(cookie);
    });
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
        // console.log(pos.postion);
        (listOfPlayer.filter(listOfPlayer => listOfPlayer.id == pos.id))[0].postion.x = pos.postion[0];
        (listOfPlayer.filter(listOfPlayer => listOfPlayer.id == pos.id))[0].postion.y = pos.postion[1];
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