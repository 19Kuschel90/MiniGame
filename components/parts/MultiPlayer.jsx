
var React = require('react');
// var Sprites = require('sprites'); 

module.exports =  class MultiPlayer extends React.Component {
    constructor(props){
        super(props);   
        this.componentWillMount = this.componentWillMount.bind(this);
        this.setNewPos = this.setNewPos.bind(this);
        this.state = {
            postion: [ 100,  100]
           }

    }

       componentWillMount(){
            this.props.socket.on('newPos',  (pos) =>  { console.log(pos); this.setNewPos(pos);});
       }
       
       setNewPos(pos){
           
           if(this.props.id != pos[2])
           {
            console.log("in hier");
             var newPos = [pos[0],pos[1]];
             this.setState({postion: newPos});
            }
       }


    render(){
    
        return(
            <div>
                <this.props.sprite postion={[this.state.postion[0],this.state.postion[1]]} playerName={"PlayerA"}></this.props.sprite>
            </div>
        );
    }
}