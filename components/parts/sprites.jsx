
var React = require('react');

module.exports =  class sprites extends React.Component {
    constructor(props){
        super(props);   
        this.state = {
            move:["Luna_57x55_f1v1.png", "Luna_57x55_f1v2.png", "Luna_57x55_f1v3.png"],
            index: 2,
            state: "idl",
        };
        this.setNewSprite = this.setNewSprite.bind(this);
        // setInterval(this.setNewSprite(), 1000);
        this.intervalId = setInterval(this.setNewSprite,  this.props.time || 250);
            
    }


    setNewSprite(){
        var newIndex = this.state.index +1;
        if(this.state.move.length - 1 < newIndex)
        {
            newIndex = 0;
        }
        this.setState({
            index: newIndex
        })
    }

    render(){
    
        return(
            <div className="playerSprites" style={ {
                top:  this.props.postion[0] +"px",
                left: this.props.postion[1] +"px"
              }}>{this.props.playerName || "You"}
                <div>{this.state.move.length}</div>
                  <img src={"img/" + this.state.move[this.state.index]} />
            </div>
        );
    }
}

