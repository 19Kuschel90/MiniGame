
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
            listOfPlayer: []
           }
           
        }
        
        componentWillMount(){
            this.props.socket.on('newPos',  (pos) =>  { this.setNewPos(pos);});
            this.props.socket.on('addNewPlayer',  (data) =>  { this.addNewPlayer( data);});
            this.props.socket.on('sendListOfPlayer',  (data) =>  { this.setState( {listOfPlayer: data});});
            this.props.socket.on('removePlayer',  (id) =>  { this.removePlayer(id)});
        }
        
        setNewPos(pos){
            
            if(this.props.id != pos[2])
            {
                var temp = this.state.listOfPlayer;
                for (let index = 0; index < this.state.listOfPlayer.length; index++) {
                    
                    if(this.state.listOfPlayer[index].id === pos[2])
                    {

                        this.state.listOfPlayer[index].postion.x = pos[0];
                        this.state.listOfPlayer[index].postion.y = pos[1];

                        temp = this.state.listOfPlayer;
                    }
                }


                this.setState({listOfPlayer: temp});

            }
        }
        
        addNewPlayer(data){
            console.log("addNewPlayer");
            if(this.props.id != data.id)
            {
                data.collider =  this.props.collisions.createPolygon(data.postion.x, data.postion.y, [[-60, -20], [60, -20], [60, 20], [-60, 20]], 2.2);
                this.setState({listOfPlayer: [...this.state.listOfPlayer,data] });
            }
       }

       removePlayer(id){
           if(id === this.props.id){
               return;
           }
   
        //    listOfPlayer = listOfPlayer.filter(listOfPlayer => listOfPlayer.id != id);
  
    this.setState({listOfPlayer: (this.state.listOfPlayer.filter(listOfPlayer => listOfPlayer.id != id))});
    // console.log("end: ", listOfPlayer);
       }

       setAllPlayer(){
        var Output = [];
        this.state.listOfPlayer.forEach(element => {
            if(element.id != this.props.id)
            {
                Output.push(
                    <this.props.sprite postion={[element.postion.x,element.postion.y]} playerName={element.name} ></this.props.sprite>
                    );
                }
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