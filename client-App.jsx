import {Collisions, Circle, Polygon, Point} from 'collisions';
var React = require('react');
var ReactDOM = require("react-dom");
var App = require("./components/App.Game");


ReactDOM.render(<App />, document.getElementById('react-container'));


const system = new Collisions();
 
const circle  = system.createCircle(100, 100, 10);
const polygon = system.createPolygon(50, 50, [[0, 0], [20, 20], [-10, 10]]);
const line    = system.createPolygon(200, 5, [[-30, 0], [10, 20]]);
const point   = system.createPoint(10, 10);
circle.x     = 20;
circle.y     = 30;
circle.scale = 1.5;
 
polygon.x       = 20;
polygon.y       = 30;
polygon.scale_x = 1.2;
polygon.scale_y = 3.4;
polygon.angle   = 1.2;
system.update();

const potentials = polygon.potentials();

for(const body of potentials) {
    console.log('test!');
    if(polygon.collides(body)) {
        console.log('Collision detected!');
    }
}