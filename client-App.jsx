var React = require('react');
var ReactDOM = require("react-dom");
var App = require("./components/App.Game");
import {Collisions, Circle, Polygon, Point} from 'collisions';
const system = new Collisions();

console.log("gaammmmmmm");
ReactDOM.render(<App collisions={system}/>, document.getElementById('react-container'));

var ttttt = 0;

export {ttttt};