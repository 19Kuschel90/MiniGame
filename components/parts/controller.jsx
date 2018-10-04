
var React = require('react');
// var Sprites = require('sprites'); 
var io = require('socket.io-client');

module.exports =  class controller extends React.Component {
    constructor(props){
        super(props);   
        this.state = {
            postion: [ 100,  100]
           }
           this.moveLeft = this.moveLeft.bind(this);
           this.moveRight = this.moveRight.bind(this);
           this.moveTop = this.moveTop.bind(this);
           this.moveDown = this.moveDown.bind(this);
           this.send = this.send.bind(this);

        }
        
    moveLeft(){
        this.setState({postion: [this.state.postion[0],this.state.postion[1] - 10]});
        this.send();
    }
    
    moveRight(){
        this.setState({postion: [this.state.postion[0],this.state.postion[1] + 10]});
        this.send();
        
    }

    moveTop(){
        this.setState({postion: [this.state.postion[0] - 10,this.state.postion[1] ]});
        this.send();
    }

    moveDown(){
        this.setState({postion: [this.state.postion[0] + 10,this.state.postion[1] ]});
        this.send();
    }

    send(){
        console.log("id controller", this.props.id);
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