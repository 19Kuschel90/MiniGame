
var React = require('react');

module.exports =  class sprites extends React.Component {
    constructor(props){
        super(props);   
        this.state = {
            move:
            {
                "left":["magic_left1.svg", "magic_left2.svg"],
                "right":['magic_Right1.svg', 'magic_Right2.svg'],
                "top":['', ''],
                "down":['', '']
            },
            index: 2,
            state: "idl"
            // polygon: null
        };
        // this.state.polygon  =  this.props.collisions.createPolygon(50, 50, [[0, 0], [20, 20], [-10, 10]]);
        // this.setState({polygon: this.props.collisions.createPolygon(500, 500, [[0, 0], [20, 20], [-10, 10]])});

        // console.log(this.state.polygon);
        // this.state.circle.x     = 20;
        // this.state.circle.y     = 30;
        // this.state.circle.scale = 1.5;
        console.log( "this state",this.state);
        this.setNewSprite = this.setNewSprite.bind(this);
        // setInterval(this.setNewSprite(), 1000);
        this.intervalId = setInterval(this.setNewSprite,  this.props.time || 250);
            
    }


    setNewSprite(){
        var newIndex = this.state.index +1;
        if(this.state.move[this.props.direction].length - 1 < newIndex)
        {
            newIndex = 0;
        }
        this.setState({
            index: newIndex
        });

        ///////////////////////
    //     this.props.collisions.update();
    //     const potentials = this.state.polygon.potentials();
    
    // for(const body of potentials) {
    // if(this.state.polygon.collides(body)) {
    //     console.log('Collision detected!');
    // }
    // }
    }

    render(){
    
        return(
            <div className="playerSprites " style={ {
                top:  this.props.postion[0] +"px",
                left: this.props.postion[1] +"px"
              }}>
              {/* {this.props.playerName || "You client"} */}
                  <img src={"img/" + this.state.move[this.props.direction][this.state.index]} className="collider"/>
            </div>
        );
    }
}

