
var React = require('react');
// var Sprites = require('sprites'); 
var io = require('socket.io-client');

module.exports =  class controller extends React.Component {
    constructor(props){
        super(props);   
        this.state = {
            postion:    [ -999,  -999], // spwan
            mapSize: this.props.mapSize || [ 0,0 ,2000, 2000],// map size in px
            moveSpeed: this.props.moveSpeed || 10, // Move Speed
            playerCollider: null,
            canMove:false,
            speed: 50,
            direction: "left"
        }
        this.collides = this.collides.bind(this);
           this.moveLeft = this.moveLeft.bind(this);
           this.moveRight = this.moveRight.bind(this);
           this.moveTop = this.moveTop.bind(this);
           this.moveDown = this.moveDown.bind(this);
           this.send = this.send.bind(this);
           this.spawn = this.spawn.bind(this);
                  this.state.playerCollider  =  this.props.collisions.createPolygon(this.state.postion[0], this.state.postion[1], [[0, 0], [0, 57], [57, 0], [57,57]]);


        }

        collides(){
            this.props.collisions.update();
    const potentials = this.state.playerCollider.potentials();
    for(const wall of potentials) {
        
        // Test if the player collides with the wall
        if(this.state.playerCollider.collides(wall)) {
            console.log('collides');
            return true;
        }
    }
    console.log('NOOOOO collides');
    return false;
        }

        
    moveLeft(){
        console.log('performance. neu',performance.now() * (this.state.speed / 1000) );

        var move  = this.state.postion[1] - this.state.moveSpeed;
        if(this.state.mapSize[0] < move && this.state.canMove){
            var oldPostion = this.state.postion;
            this.setState({postion: [this.state.postion[0],this.state.postion[1] - (this.state.speed *(this.state.speed / 1000) )]});
            this.state.playerCollider.x = this.state.postion[0];
            this.state.playerCollider.y = this.state.postion[1];
            
            if(this.collides())
            {
                this.setState({postion: [this.state.postion[0],this.state.postion[1] + (this.state.speed *(this.state.speed / 1000) )]});
                this.state.playerCollider.x = this.state.postion[0];
                this.state.playerCollider.y = this.state.postion[1];
                return;
            }
            this.setState({direction: "left"});
                this.send();    
        } 
    }
    
    moveRight(){  
       
        var move  = this.state.postion[1] + this.state.moveSpeed;
        if(this.state.mapSize[2] > move && this.state.canMove){
            var oldPostion = this.state.postion;
            this.setState({postion: [this.state.postion[0],this.state.postion[1] + (this.state.speed *(this.state.speed / 1000) )]});
            this.state.playerCollider.x = this.state.postion[0];
            this.state.playerCollider.y = this.state.postion[1];
            
            if(this.collides())
            {
                this.setState({postion: [this.state.postion[0],this.state.postion[1] - (this.state.speed *(this.state.speed / 1000) )]});
                this.state.playerCollider.x = this.state.postion[0];
                this.state.playerCollider.y = this.state.postion[1];
                return;
            }
            this.setState({direction: "right"});     
            this.send();     
    }
        
    }

    moveTop(){
       
        var move  = this.state.postion[0] - this.state.moveSpeed;
        if(this.state.mapSize[1] < move && this.state.canMove){
            var oldPostion = this.state.postion;
            this.setState({postion: [this.state.postion[0] - (this.state.speed *(this.state.speed / 1000) ),this.state.postion[1] ]});
            this.state.playerCollider.x = this.state.postion[0];
            this.state.playerCollider.y = this.state.postion[1];
            
            if(this.collides())
            {
                this.setState({postion: [this.state.postion[0] + (this.state.speed  *(this.state.speed / 1000)  ) ,this.state.postion[1] ]});
                this.state.playerCollider.x = this.state.postion[0];
                this.state.playerCollider.y = this.state.postion[1];
                return;
            }
            this.setState({direction: "top"});

                this.send(); 
            
            
        }
    }

    moveDown(){
       
        var move  = this.state.postion[0] + this.state.moveSpeed;
        if(this.state.mapSize[3] > move && this.state.canMove){
        var oldPostion = this.state.postion;
            this.setState({postion: [this.state.postion[0]+ (this.state.speed *(this.state.speed / 1000) ),this.state.postion[1]]});
            this.state.playerCollider.x = this.state.postion[0];
            this.state.playerCollider.y = this.state.postion[1];
            
            if(this.collides())
            {
                this.setState({postion: [this.state.postion[0]-(this.state.speed *(this.state.speed / 1000) ),this.state.postion[1]]});
                this.state.playerCollider.x = this.state.postion[0];
                this.state.playerCollider.y = this.state.postion[1];
                return;
            }
            this.setState({direction: "down"});

                this.send(); 
            
            
        }
    }

    send(){
        var newPosition = {
            postion: this.state.postion,
            id: this.props.id,
            direction: this.state.direction
        }
        // var newPosition = this.state.postion;
        // newPosition.push(this.props.id);
            this.props.socket.emit('newPos',  newPosition);
    }

    spawn(){

        this.setState({canMove: true});
        this.setState({postion: this.props.spwan});
    }

    render(){
        if(this.state.canMove == false)
        {
            console.log(this.state.postion );
            console.log(this.props.spwan );

            if(this.state.postion[0] != this.props.spwan[0])
            {
                this.spawn();
            }
        }
        return(
            <div>
                <div className={"controller"}>
                <button onClick={this.moveTop} className={"buttonTop"}>top</button>
                <button onClick={this.moveLeft} className={"buttonLeft"}>left</button>
                <button onClick={this.moveRight}  className={"buttonRight"}>right</button>
                <button onClick={this.moveDown} className={"buttonDown"}>down</button>
                </div>

                <div className="weapons-1">
                  <img src={ null  ||"img/OC.svg" } className="pic"/>
                </div>
                <div className="weapons-2">
                  <img src={"img/OC.svg" } className="pic"/>
                </div>
                <div className="weapons-3">
                  <img src={"img/OC.svg" } className="pic"/>
                </div>

            
              <this.props.sprite postion={[this.state.postion[0],this.state.postion[1]]} collisions={this.props.collisions} playerName={this.props.playerName} direction={this.state.direction}>
                </this.props.sprite>
            </div>
        );
    }
}