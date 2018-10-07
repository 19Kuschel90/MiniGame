
var React = require('react');
// var Sprites = require('sprites'); 

module.exports =  class MultiPlayer extends React.Component {
    constructor(props){
        super(props);   
        this.componentWillMount = this.componentWillMount.bind(this);
        this.setNewPos = this.setNewPos.bind(this);
        this.state = {
            postion: [ 300,  300]
           }
           const wall2 = this.props.collisions.createPolygon(300, 300, [[-60, -20], [60, -20], [60, 20], [-60, 20]], 2.2);

    }

       componentWillMount(){
            this.props.socket.on('newPos',  (pos) =>  { this.setNewPos(pos);});
       }
       
       setNewPos(pos){
           
           if(this.props.id != pos[2])
           {
            // console.log("in hier");
             var newPos = [pos[0],pos[1]];
             this.setState({postion: newPos});
            }
       }


    render(){
    
        return(
            <div>
                <this.props.sprite postion={[this.state.postion[0],this.state.postion[1]]} playerName={"PlayerA"} collisions={this.props.collisions}></this.props.sprite>
            </div>
        );
    }
}