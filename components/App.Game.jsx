var React = require('react');
var MySprites = require('./parts/sprites');
module.exports =  class App extends React.Component {
    constructor(props){
        super(props);   
       
    }
    



    render(){
    
        return(
            <div>
              <MySprites>

              </MySprites>
            </div>
        );
    }
}