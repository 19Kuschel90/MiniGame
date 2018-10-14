
var React = require('react');

module.exports =  class Editor extends React.Component {
    constructor(props){
        super(props);   
       this.state = {
           moreImgTop: [],
           moreImgDown: [],
           moreImgLeft: [],
           moreImgRight: []
       }
       this.handleImage = this.handleImage.bind(this);
       this.select = this.select.bind(this);
       this.newCanvasImg = this.newCanvasImg.bind(this);
       this.addimgTop = this.addimgTop.bind(this);
       this.addimgDown = this.addimgDown.bind(this);
       this.addimgLeft = this.addimgLeft.bind(this);
       this.addimgRight = this.addimgRight.bind(this);
        // this.handleImage();
        // console.log(fileInput);
        // fileInput.addEventListener('change', () => this.handleImage(fileInput, AvatarImg));   

    //   var temp =  document.getElementsByClassName("notSelect");
    //   console.log(temp);
    //   temp.forEach(element => {
    //     element.onClick = (element) => this.select;
    //    });
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
    

    newCanvasImg(target)
    {
        var AvatarImg = target;
        var canvas = document.getElementById('canvas');
        var ctx = canvas.getContext("2d");
        ctx.clearRect(0,0,canvas.width, canvas.height);
        ctx.drawImage(AvatarImg, 0, 0, 57,57);

    }

    addimgTop(){
        var temp = [<div> <img alt="not" src="img/Luna_57x55_f1v1.png"  width="57" height="57" className="notSelect imgTemp" onClick={this.select}></img><input type="file" name="sampleFile"  id="fileInput" /></div>]
        this.setState({moreImgTop: [...this.state.moreImgTop,temp ]});
    }
    addimgDown(){
        var temp = [<div> <img alt="not" src="img/Luna_57x55_f1v1.png"  width="57" height="57" className="notSelect imgTemp" onClick={this.select}></img><input type="file" name="sampleFile"  id="fileInput" /></div>]
        this.setState({moreImgDown: [...this.state.moreImgDown,temp ]});
    }
    addimgLeft(){
        var temp = [<div> <img alt="not" src="img/Luna_57x55_f1v1.png"  width="57" height="57" className="notSelect imgTemp" onClick={this.select}></img><input type="file" name="sampleFile"  id="fileInput" /></div>]
        this.setState({moreImgLeft: [...this.state.moreImgLeft,temp ]});
    }
    addimgRight(){
        var temp = [<div> <img alt="not" src="img/Luna_57x55_f1v1.png"  width="57" height="57" className="notSelect imgTemp" onClick={this.select}></img><input type="file" name="sampleFile"  id="fileInput" /></div>]
        this.setState({moreImgRight: [...this.state.moreImgRight,temp ]});
    }

    select(e){   
        var temp = document.getElementsByClassName('imgTemp');
        console.log(temp);
        for (let index = 0; index < temp.length; index++) {
            temp[index].classList.add("notSelect");
            temp[index].classList.remove("Select");
        }
        e.target.classList.toggle("notSelect");
            e.target.classList.toggle("Select");
        this.newCanvasImg(e.target);
    }



    
    render(){
     
    
        return(
            <div>
                editor
                <div>
                    <div>

                <canvas id="canvas" width="57" height="57"></canvas>
                <form ref='uploadForm' id='uploadForm' action='http://localhost:3000/upload#test' method='post' encType="multipart/form-data">
                <ul>
                    <li> Move top<div>
                        
                    <img alt="not" src="img/Luna_57x55_f1v1.png"  width="57" height="57" className="notSelect imgTemp Select" onClick={this.select}></img>
                    <input type="file" name="sampleFile"  id="fileInput" />
                    <div id="moreTop">{this.state.moreImgTop}</div>
                    </div></li>
                    <li onClick={this.addimgTop}> Add New Frame<div>
                    <img alt="not" src="img/plussvg.svg"  width="57" height="57"></img>
                    </div></li>
                </ul>
                ////////////////////////////////////////////////////
                <ul>
                    <li> Move left<div>
                    <img alt="not" src="img/RAGE.png"  width="57" height="57" className="notSelect imgTemp Select" onClick={this.select}></img>
                       <input type="file" name="sampleFile"  id="fileInput2" />
                         <div id="moreTop">{this.state.moreImgLeft}</div>
                    </div></li>
                    <li onClick={this.addimgLeft}> Add New Frame<div>
                    <img alt="not" src="img/plussvg.svg"  width="57" height="57"></img>
                    </div></li>
                </ul>
                ////////////////////////////////////////////////////
                <ul>
                    <li> Move Right<div>
                    <img alt="not" src="img/Luna_57x55_f1v1.png"  width="57" height="57" className="notSelect imgTemp Select" onClick={this.select}></img>
                      <input type="file" name="sampleFile"  id="fileInput2" />
                     <div id="moreTop">{this.state.moreImgRight}</div>
                    </div></li>
                    <li onClick={this.addimgRight}> Add New Frame<div>
                    <img alt="not" src="img/plussvg.svg"  width="57" height="57"></img>
                    </div></li>
                </ul>
                ////////////////////////////////////////////////////
                <ul>
                    <li> Move down<div>
                    <img alt="not" src="img/Logo_200x200v6.png"  width="57" height="57" className="notSelect imgTemp Select"  onClick={this.select}></img>
                    <input type="file" name="sampleFile"  id="fileInput2" />
                    <div id="moreTop">{this.state.moreImgDown}</div>
                    </div></li>
                    <li onClick={this.addimgDown}> Add New Frame<div>
                    <img alt="not" src="img/plussvg.svg"  width="57" height="57"></img>
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