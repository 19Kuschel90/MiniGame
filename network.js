import { Collisions, Circle, Polygon, Point } from 'collisions';
import test from './dist/public/js/p5';
var io = require('socket.io-client');

const system = new Collisions();

test = {
    x: 100,
    y: 700
}
console.log(ddd);
var socket = io('/GameRoom1');
socket.emit('connection', {});
socket.on('myID', (data) => {
    console.log(data);
});