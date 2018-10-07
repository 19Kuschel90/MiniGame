
var React = require('react');
// var Sprites = require('sprites'); 

module.exports =  class MultiPlayer extends React.Component {
    constructor(props){
        super(props);   
        this.componentWillMount = this.componentWillMount.bind(this);
        this.setNewPos = this.setNewPos.bind(this);
        this.addNewPlayer = this.addNewPlayer.bind(this);
        this.removePlayer = this.removePlayer.bind(this);
        this.setAllPlayer = this.setAllPlayer.bind(this);
        this.state = {
            listOfPlayer: [
                // {
            //     postion:{
            //         x: 300,
            //         y: 300
            //     },
            // id: null,
            // name: "No Name",
            // collider:  this.props.collisions.createPolygon(300, 300, [[-60, -20], [60, -20], [60, 20], [-60, 20]], 2.2)
            // },
            // {
            //     postion:{
            //         x: 500,
            //         y: 500
            //     },
            // id: null,
            // name: "player3",
            // collider:  this.props.collisions.createPolygon(500, 500, [[-60, -20], [60, -20], [60, 20], [-60, 20]], 2.2)
            // }
        ]
           }
           
        }
        
        componentWillMount(){
            this.props.socket.on('newPos',  (pos) =>  { this.setNewPos(pos);});
            this.props.socket.on('addNewPlayer',  (data) =>  { this.addNewPlayer( data);});
        }
        
        setNewPos(pos){
            
            if(this.props.id != pos[2])
            {
                // console.log("in hier");
                var newPos = [pos[0],pos[1]];
                this.setState({postion: newPos});
            }
        }
        
        addNewPlayer(data){
            console.log("addNewPlayer");
            if(this.props.id != data.id)
            {
                data.collider =  this.props.collisions.createPolygon(data.postion.x, data.postion.x, [[-60, -20], [60, -20], [60, 20], [-60, 20]], 2.2);
                this.setState({listOfPlayer: [...this.state.listOfPlayer,data] });
            }
       }

       removePlayer(id){
        const items = this.state.listOfPlayer;
        const filteredItems = items.filter(function(item) {
            return ite.id !== id
          });
          this.setState({listOfPlayer: filteredItems});
       }

       setAllPlayer(){
        var Output = [];
        this.state.listOfPlayer.forEach(element => {
            Output.push(
                <this.props.sprite postion={[element.postion.x,element.postion.y]} playerName={element.name} ></this.props.sprite>
            );
            });

        return Output;
       }

    render(){
    
        return(
            <div>
                {this.setAllPlayer()}
            </div>
        );
    }
}