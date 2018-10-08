var React = require('react');
var MySprites = require('./parts/sprites');
var Controller = require('./parts/controller');
var MultiPlayer = require('./parts/MultiPlayer');
var io = require('socket.io-client');


// const system = new Collisions();
 
// const circle  = system.createCircle(100, 100, 10);
// const polygon = system.createPolygon(50, 50, [[0, 0], [20, 20], [-10, 10]]);
// const line    = system.createPolygon(200, 5, [[-30, 0], [10, 20]]);
// const point   = system.createPoint(10, 10);
// circle.x     = 20;
// circle.y     = 30;
// circle.scale = 1.5;
 
// polygon.x       = 20;
// polygon.y       = 30;
// polygon.scale_x = 1.2;
// polygon.scale_y = 3.4;
// polygon.angle   = 1.2;
// system.update();

// const potentials = polygon.potentials();

// for(const body of potentials) {
//     console.log('test!');
//     if(polygon.collides(body)) {
//         console.log('Collision detected!');
//     }
// }
module.exports =  class App extends React.Component {
    constructor(props){
        super(props);   
       this.state = {
        postion: [ -999, -999],
        id: 0,
        name: "No name"
       }
       this.socket = io('/GameRoom1');
       this.socket.emit('connection', { });
       this.socket.on('myID', (data)=> {
           this.setState({id: data.id});
           this.setState({postion: [data.postion.x, data.postion.y]});
           this.setState({name: data.name});
        });
        var othis = this;
        window.addEventListener("beforeunload", function (event) {
            // Cancel the event as stated by the standard.
            event.preventDefault();
            // Chrome requires returnValue to be set.
            othis.socket.emit('disconnet', othis.state.id);
            event.returnValue = '';
          });
        
    }
    
    
    render(){
        console.log(this.state.postion);
    
        return(
            <div>
                <Controller sprite={MySprites} socket={this.socket} id={this.state.id} collisions={this.props.collisions} spwan={this.state.postion } playerName={this.state.name}></Controller>
                <MultiPlayer sprite={MySprites} socket={this.socket} id={this.state.id} collisions={this.props.collisions}></MultiPlayer>
              
            </div>
        );
    }
}