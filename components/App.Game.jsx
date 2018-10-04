var React = require('react');
var MySprites = require('./parts/sprites');
var Controller = require('./parts/controller');
var MultiPlayer = require('./parts/MultiPlayer');
var io = require('socket.io-client');
module.exports =  class App extends React.Component {
    constructor(props){
        super(props);   
       this.state = {
        postion: [ 250,  250],
        id: 0
       }
       console.log("test");
       this.socket = io('/GameRoom1');
       this.socket.emit('connection', { });
       this.socket.on('myID', (id)=> {
           console.log("App id", id);
           this.setState({id: id})
       });
    }
    

    render(){
    
        return(
            <div>
                <Controller sprite={MySprites} socket={this.socket} id={this.state.id}></Controller>
                <MultiPlayer sprite={MySprites} socket={this.socket} id={this.state.id}></MultiPlayer>
              
            </div>
        );
    }
}