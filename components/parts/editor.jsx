
var React = require('react');

module.exports =  class Editor extends React.Component {
    constructor(props){
        super(props);   
       this.state = {
        
       }
       this.handleImage = this.handleImage.bind(this);
       this.moreImg = this.moreImg.bind(this);
        // this.handleImage();
        // console.log(fileInput);
        // fileInput.addEventListener('change', () => this.handleImage(fileInput, AvatarImg));   
    }
    
    handleImage(){
        var fileInput = document.getElementById('fileInput');
        var canvas = document.getElementById('canvas');
        var AvatarImg = document.getElementById('img');
        var file = fileInput.files[0];
        var imageType = /image.*/;
        if (file.type.match(imageType)) {
            console.log(file);
            var reader = new FileReader();
            reader.onload = function(e) {
                console.log(AvatarImg);
                AvatarImg.src = reader.result;
                var ctx = canvas.getContext("2d");
                // var img = document.getElementById("scream");
                ctx.drawImage(AvatarImg, 0, 0, 57,57);
                var img    = canvas.toDataURL("image/png");
                document.write('<img src="'+img+'"/>');
                };
                reader.readAsDataURL(file);
                
            } else {
                // too do error
                // imgFile.innerHTML = "Dateityp nicht unterstützt"
            }
    }

    moreImg(posID){
        var Output = [];
        document.getElementById("moreTop").innerHTML +=  
             '     <div> <img alt="not" src="img/Luna_57x55_f1v1.png" id="img" width="57" height="57"></img><input type="file" name="sampleFile"  id="fileInput" /></div>';
        

    }

    
    render(){

    
        return(
            <div>
                editor
                <div>
                    <div>

                <canvas id="canvas" width="200" height="100"></canvas>
                <form ref='uploadForm' id='uploadForm' action='http://localhost:3000/upload#test' method='post' encType="multipart/form-data">
                <ul>
                    <li> Move top<div>
                        
                    <img alt="not" src="img/Luna_57x55_f1v1.png" id="img" width="57" height="57"></img>
                    <input type="file" name="sampleFile"  id="fileInput" />
                    <div id="moreTop"></div>
                    </div></li>
                    <li onClick={this.moreImg}> Add New Frame<div>
                    <img alt="not" src="img/Luna_57x55_f1v1.png" id="img" width="57" height="57"></img>
                    </div></li>
                </ul>
                ////////////////////////////////////////////////////
                <ul>
                    <li> Move left<div>
                    <img alt="not" src="img/Luna_57x55_f1v1.png" id="img" width="57" height="57"></img>
        <input type="file" name="sampleFile"  id="fileInput2" />

                    </div></li>
                    <li> Add New Frame<div>
                    <img alt="not" src="img/Luna_57x55_f1v1.png" id="img" width="57" height="57"></img>
                    </div></li>
                </ul>
                ////////////////////////////////////////////////////
                <ul>
                    <li> Move Right<div>
                    <img alt="not" src="img/Luna_57x55_f1v1.png" id="img" width="57" height="57"></img>
        <input type="file" name="sampleFile"  id="fileInput2" />

                    </div></li>
                    <li> Add New Frame<div>
                    <img alt="not" src="img/Luna_57x55_f1v1.png" id="img" width="57" height="57"></img>
                    </div></li>
                </ul>
                ////////////////////////////////////////////////////
                <ul>
                    <li> Move down<div>
                    <img alt="not" src="img/Luna_57x55_f1v1.png" id="img" width="57" height="57"></img>
                    <input type="file" name="sampleFile"  id="fileInput2" />
                    
                    </div></li>
                    <li> Add New Frame<div>
                    <img alt="not" src="img/Luna_57x55_f1v1.png" id="img" width="57" height="57"></img>
                    </div></li>
                </ul>
              
                
        <input type='submit' value='Upload!' />
    </form> 
                </div> 
                </div>
            </div>
        );
    }
}