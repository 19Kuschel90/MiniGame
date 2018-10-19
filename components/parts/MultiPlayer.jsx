
var React = require('react');
// var Sprites = require('sprites'); 

module.exports =  class MultiPlayer extends React.Component {
    constructor(props){
        super(props);   
        this.componentWillMount = this.componentWillMount.bind(this);
        this.setNewPos = this.setNewPos.bind(this);
        this.removePlayer = this.removePlayer.bind(this);
        this.setAllPlayer = this.setAllPlayer.bind(this);
        this.state = {
            listOfPlayer: []
           }
           
        }
        
        componentWillMount(){
            this.props.socket.on('newPos',  (pos) =>  { this.setNewPos(pos);});
            this.props.socket.on('sendListOfPlayer',  (data) =>  { 
                    // to do
                    var newData = [];
                    if(data.length > 1)
                    {

                        data.forEach(element => {
                            if(element.id !== this.props.id)
                            {
                                element.collider =  this.props.collisions.createPolygon(element.postion.x , element.postion.y, [[0, 0], [0, 57], [57, 0], [57,57]]);
                                newData.push(element);
                            }
                        });
                    }
                this.setState( {listOfPlayer: newData});
            });
            this.props.socket.on('removePlayer',  (id) =>  { this.removePlayer(id)});
        }
        
        setNewPos(pos){
            
            if(this.props.id != pos.id)
            {
                var temp = this.state.listOfPlayer;
                for (let index = 0; index < this.state.listOfPlayer.length; index++) {
                    
                    if(this.state.listOfPlayer[index].id === pos.id)
                    {

                        this.state.listOfPlayer[index].postion.x = pos.postion[0];
                        this.state.listOfPlayer[index].postion.y = pos.postion[1];
                        this.state.listOfPlayer[index].collider.x  = pos.postion[0];
                       
                        this.state.listOfPlayer[index].collider.y = pos.postion[1];
                        this.state.listOfPlayer[index].direction = pos.direction;
                        temp = this.state.listOfPlayer;
                        
                    }
                }


                this.setState({listOfPlayer: temp});

            }
        }
       

       removePlayer(id){
           if(id === this.props.id){
               return;
           }  
    this.setState({listOfPlayer: (this.state.listOfPlayer.filter(listOfPlayer => listOfPlayer.id != id))});
       }

       setAllPlayer(){
        var Output =  [];
        this.state.listOfPlayer.forEach(element => {
            if(element.id != this.props.id)
            {
                Output.push(
                    
                    <this.props.sprite postion={[element.postion.x,element.postion.y]} playerName={element.name}  direction={element.direction}></this.props.sprite>
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