
var React = require('react');
// var Sprites = require('sprites'); 
var io = require('socket.io-client');

module.exports =  class controller extends React.Component {
    constructor(props){
        super(props);   
        this.state = {
            postion:   this.props.spwan || [ 100,  100], // spwan
            mapSize: this.props.mapSize || [ 0,0 ,2000, 2000],// map size in px
            moveSpeed: this.props.moveSpeed || 10, // Move Speed
            playerCollider: null
        }
        this.collides = this.collides.bind(this);
           this.moveLeft = this.moveLeft.bind(this);
           this.moveRight = this.moveRight.bind(this);
           this.moveTop = this.moveTop.bind(this);
           this.moveDown = this.moveDown.bind(this);
           this.send = this.send.bind(this);
                  this.state.playerCollider  =  this.props.collisions.createPolygon(this.state.postion[0], this.state.postion[1], [[0, 0], [20, 20], [-10, 10]]);
        // this.setState({polygon: this.props.collisions.createPolygon(50, 50, [[0, 0], [20, 20], [-10, 10]])});
        // const wall2 = this.props.collisions.createPolygon(50, 50, [[-60, -20], [60, -20], [60, 20], [-60, 20]], 2.2);
    //  this.props.collisions.createPolygon(300, 500, [[-60, -20], [60, -20], [60, 20], [-60, 20]], 1.7);
// const wall3 = this.props.collisions.createPolygon(400, 50, [[-60, -20], [60, -20], [60, 20], [-60, 20]], 0.7);

        }

        collides(){
            this.props.collisions.update();
    const potentials = this.state.playerCollider.potentials();
    console.log("testss");
    for(const wall of potentials) {
        console.log('hhi');
    
        // Test if the player collides with the wall
        if(this.state.playerCollider.collides(wall)) {
            console.log('collides');
            // Push the player out of the wall
            // player.x -= result.overlap * result.overlap_x;
            // player.y -= result.overlap * result.overlap_y;
        }
    }

        }
        
    moveLeft(){
        this.collides();
        var move  = this.state.postion[1] - this.state.moveSpeed;
        if(this.state.mapSize[0] < move){
            this.setState({postion: [this.state.postion[0],this.state.postion[1] - 10]});
            this.send();
            this.state.playerCollider.x = this.state.postion[0];
            this.state.playerCollider.y = this.state.postion[1];
        } 
    }
    
    moveRight(){  
        this.collides();
        var move  = this.state.postion[1] + this.state.moveSpeed;
        if(this.state.mapSize[2] > move){
        this.setState({postion: [this.state.postion[0],this.state.postion[1] + 10]});
        this.send(); 
         this.state.playerCollider.x = this.state.postion[0];
        this.state.playerCollider.y = this.state.postion[1];
    }
        
    }

    moveTop(){
        this.collides();
        var move  = this.state.postion[0] - this.state.moveSpeed;
        if(this.state.mapSize[1] < move){
        this.setState({postion: [this.state.postion[0] - 10,this.state.postion[1] ]});
        this.send(); 
         this.state.playerCollider.x = this.state.postion[0];
        this.state.playerCollider.y = this.state.postion[1];
        }
    }

    moveDown(){
        this.collides();
        var move  = this.state.postion[0] + this.state.moveSpeed;
        if(this.state.mapSize[3] > move){
        this.setState({postion: [this.state.postion[0] + 10,this.state.postion[1] ]});
        this.send(); 
         this.state.playerCollider.x = this.state.postion[0];
        this.state.playerCollider.y = this.state.postion[1];
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
              <this.props.sprite postion={[this.state.postion[0],this.state.postion[1]]} collisions={this.props.collisions}>
                </this.props.sprite>
            </div>
        );
    }
}