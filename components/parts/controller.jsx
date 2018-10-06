
var React = require('react');
// var Sprites = require('sprites'); 
var io = require('socket.io-client');

module.exports =  class controller extends React.Component {
    constructor(props){
        super(props);   
        this.state = {
            postion:   this.props.spwan || [ 100,  100], // spwan
            mapSize: this.props.mapSize || [ 0,0 ,2000, 2000],// map size in px
            moveSpeed: this.props.moveSpeed || 10 // Move Speed
           }
           this.moveLeft = this.moveLeft.bind(this);
           this.moveRight = this.moveRight.bind(this);
           this.moveTop = this.moveTop.bind(this);
           this.moveDown = this.moveDown.bind(this);
           this.send = this.send.bind(this);
        }
        
    moveLeft(){
        var move  = this.state.postion[1] - this.state.moveSpeed;
        if(this.state.mapSize[0] < move){
            this.setState({postion: [this.state.postion[0],this.state.postion[1] - 10]});
            this.send();
        } 
    }
    
    moveRight(){  
         var move  = this.state.postion[1] + this.state.moveSpeed;
        if(this.state.mapSize[2] > move){
        this.setState({postion: [this.state.postion[0],this.state.postion[1] + 10]});
        this.send();
    }
        
    }

    moveTop(){
        var move  = this.state.postion[0] - this.state.moveSpeed;
        if(this.state.mapSize[1] < move){
        this.setState({postion: [this.state.postion[0] - 10,this.state.postion[1] ]});
        this.send();
        3}
    }

    moveDown(){
        var move  = this.state.postion[0] + this.state.moveSpeed;
        if(this.state.mapSize[3] > move){
        this.setState({postion: [this.state.postion[0] + 10,this.state.postion[1] ]});
        this.send();
        }
    }

    send(){
        var newPosition = this.state.postion;
        newPosition.push(this.props.id);
            this.props.socket.emit('newPos',  newPosition);
    }

    render(){
    
        return(
            <div>
                <div className={"controller"}>
                <button onClick={this.moveTop} className={"buttonTop"}>top</button>
                <button onClick={this.moveLeft} className={"buttonLeft"}>left</button>
                <button onClick={this.moveRight}  className={"buttonRight"}>right</button>
                <button onClick={this.moveDown} className={"buttonDown"}>down</button>
                </div>
              <this.props.sprite postion={[this.state.postion[0],this.state.postion[1]]}>
                </this.props.sprite>
            </div>
        );
    }
}