
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
       this.ifInputNull = this.ifInputNull.bind(this);
       this.handleImage = this.handleImage.bind(this);
       this.select = this.select.bind(this);
       this.newCanvasImg = this.newCanvasImg.bind(this);

       //////////////////////
       // add
       this.addimgTop = this.addimgTop.bind(this);
       this.addimgDown = this.addimgDown.bind(this);
       this.addimgLeft = this.addimgLeft.bind(this);
       this.addimgRight = this.addimgRight.bind(this);
       ////////////////
       // remove
       this.removeTop = this.removeTop.bind(this);
       this.removeDown = this.removeDown.bind(this);
       this.removeLeft = this.removeLeft.bind(this);
       this.removeRight = this.removeRight.bind(this);
       
       this.newImg = this.newImg.bind(this);
    }

    ifInputNull(){
     var arr =    document.getElementsByName('sampleFile');
     arr[0].files[0].push().name = "testAA";
     arr[0].files[0].type = "image/png";
     arr[0].files[0].size = 298351;
    //  console.log(arr[0].files[0]);
    }
    
    newImg(e){
        // console.log(e.target.previousSibling);
     var file =   e.target.files;
     var image = e.target.previousSibling;
     image.src = window.URL.createObjectURL(file[0]);
    }


    // old
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
        let AvatarImg = target;
        let canvas = document.getElementById('canvas');
        let ctx = canvas.getContext("2d");
        ctx.clearRect(0,0,canvas.width, canvas.height);
        ctx.drawImage(AvatarImg, 0, 0, 57,57);

    }

    addimgTop(){
        if(this.state.moreImgTop.length < 4)
        {
            let temp = [<div> <img alt="not" src="img/Luna_57x55_f1v1.png"  width="57" height="57" className="notSelect imgTemp" onClick={this.select}></img><input type="file" name="sampleFile"   /></div>]
            this.setState({moreImgTop: [...this.state.moreImgTop,temp ]});
        }else{
            document.getElementById('MoveTopError').innerHTML = "Max 5 Sprits";
        }
    }
    addimgDown(){
        if(this.state.moreImgDown.length < 4)
        {
            let temp = [<div> <img alt="not" src="img/Luna_57x55_f1v1.png"  width="57" height="57" className="notSelect imgTemp" onClick={this.select}></img><input type="file" name="sampleFile" onChange={this.newImg} /></div>]
            this.setState({moreImgDown: [...this.state.moreImgDown,temp ]});
        }else{
            document.getElementById('MoveDownError').innerHTML = "Max 5 Sprits";
        }
    }
    addimgLeft(){
        if(this.state.moreImgLeft.length < 4)
        {
            let temp = [<div> <img alt="not" src="img/Luna_57x55_f1v1.png"  width="57" height="57" className="notSelect imgTemp" onClick={this.select}></img><input type="file" name="sampleFile"  onChange={this.newImg} /></div>]
            this.setState({moreImgLeft: [...this.state.moreImgLeft,temp ]});
        }else{
            document.getElementById('MoveLeftError').innerHTML = "Max 5 Sprits";
        }        
    }
    addimgRight(){
        if(this.state.moreImgRight.length < 4)
        {
            let temp = [<div> <img alt="not" src="img/Luna_57x55_f1v1.png"  width="57" height="57" className="notSelect imgTemp" onClick={this.select}></img><input type="file" name="sampleFile"   onChange={this.newImg} /></div>]
            this.setState({moreImgRight: [...this.state.moreImgRight,temp ]});
        }else{
            document.getElementById('MoveRightError').innerHTML = "Max 5 Sprits";
        }        
    }

    removeTop(){
        let temp = this.state.moreImgTop;
        temp.pop();
        this.setState({moreImgTop: temp});
    }
    removeDown(){
        let temp = this.state.moreImgDown;
        temp.pop();
        this.setState({moreImgDown: temp});
    }

    removeLeft(){
        let temp = this.state.moreImgLeft;
        temp.pop();
        this.setState({moreImgLeft: temp});
    }

    removeRight(){
        let temp = this.state.moreImgRight;
        temp.pop();
        this.setState({moreImgRight: temp});
    }

    select(e){   
        let temp = document.getElementsByClassName('imgTemp');
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
                        
                    <img alt="not" src="img/Luna_57x55_f1v1.png"  width="57" height="57" className="notSelect imgTemp Select"  onClick={this.select}></img>
                    <input type="file" name="sampleFile"  onChange={this.newImg} src="#"/>
                    <div id="moreTop">{this.state.moreImgTop}</div>
                    </div></li>
                    <li> Add New Frame<div>
                    <img alt="not" src="img/plussvg.svg"  width="57" height="57" onClick={this.addimgTop}></img>
                    <img alt="not" src="img/minus.svg"  width="57" height="57" onClick={this.removeTop}></img>
                    </div>
                    <div id="MoveTopError"></div>
                    </li>
                </ul>
                ////////////////////////////////////////////////////
                <ul>
                    <li> Move left<div>
                    <img alt="not" src="img/RAGE.png"  width="57" height="57" className="notSelect imgTemp Select" onClick={this.select}></img>
                       <input type="file" name="sampleFile"  onChange={this.newImg}  />
                         <div id="moreTop">{this.state.moreImgLeft}</div>
                    </div></li>
                    <li > Add New Frame<div>
                    <img alt="not" src="img/plussvg.svg"  width="57" height="57" onClick={this.addimgLeft}></img>
                    <img alt="not" src="img/minus.svg"  width="57" height="57" onClick={this.removeLeft}></img>
                    </div>
                    <div id="MoveLeftError"></div></li>
                </ul>
                ////////////////////////////////////////////////////
                <ul>
                    <li> Move Right<div>
                    <img alt="not" src="img/Luna_57x55_f1v1.png"  width="57" height="57" className="notSelect imgTemp Select" onClick={this.select}></img>
                      <input type="file" name="sampleFile"  onChange={this.newImg}  />
                     <div id="moreTop">{this.state.moreImgRight}</div>
                    </div></li>
                    <li > Add New Frame<div>
                    <img alt="not" src="img/plussvg.svg"  width="57" height="57" onClick={this.addimgRight}></img>
                    <img alt="not" src="img/minus.svg"  width="57" height="57" onClick={this.removeRight}></img>
                    </div>
                    <div id="MoveRightError"></div></li>
                </ul>
                ////////////////////////////////////////////////////
                <ul>
                    <li> Move down<div>
                    <img alt="not" src="img/Logo_200x200v6.png"  width="57" height="57" className="notSelect imgTemp Select"  onClick={this.select}></img>
                    <input type="file" name="sampleFile" onChange={this.newImg}  />
                    <div id="moreTop">{this.state.moreImgDown}</div>
                    </div></li>
                    <li > Add New Frame<div>
                    <img alt="not" src="img/plussvg.svg"  width="57" height="57" onClick={this.addimgDown}></img>
                    <img alt="not" src="img/minus.svg"  width="57" height="57" onClick={this.removeDown}></img>
                    </div>
                    <div id="MoveDownError"></div></li>
                </ul>
              
                
        <input type='submit' value='Upload!' onClick={this.ifInputNull}/>
    </form> 
                </div> 
                </div>
            </div>
        );
    }
}