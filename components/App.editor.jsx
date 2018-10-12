var React = require('react');
var Editor = require('./parts/editor')


module.exports =  class App extends React.Component {
    constructor(props){
        super(props);   
       this.state = {
     
       }
       
        
    }
    
  


    
    render(){

    
        return(
            <div>
                <Editor></Editor>
              
            </div>
        );
    }
}