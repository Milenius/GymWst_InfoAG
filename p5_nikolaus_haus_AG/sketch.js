var radi = 10;
var alleKreise = new Array(5);
var alleLinien = [];

var aktuelleLinie = [null,null,null,null];

function setup() {
  createCanvas(windowWidth,windowHeight);
  background(51);
  
  translate(width/2,height/2);
  alleKreise[0] = new kreis(0,-130);
  alleKreise[1] = new kreis(-50,50);
  alleKreise[2] = new kreis(50,50);
  alleKreise[3] = new kreis(-50,-50);
  alleKreise[4] = new kreis(50,-50);
}

function draw() {
  translate(width/2,height/2);
  strokeWeight(5);
  background(51);
  
  if (aktuelleLinie[0] != null && aktuelleLinie[1] != null){
    line(aktuelleLinie[0],aktuelleLinie[1],mouseX-width/2,mouseY-height/2);
  }
  //----------------------------------
  for (var i = 0; i < alleKreise.length; i++){
    alleKreise[i].zeichneSelbst();
  }
  //-------------------------------
  for(var i = 0; i < alleLinien.length; i++){
    alleLinien[i].zeichneSelbst();
  }
}

function mouseClicked(){
  for(var i = 0; i < alleKreise.length; i++){
    alleKreise[i].checkClick();
  }
}

function kreis(x,y){
  this.x = x;
  this.y = y;
  
  this.zeichneSelbst = function(){
    ellipse(this.x,this.y,radi*2);
    fill(255);
  }
  
  this.checkClick = function(){
    if (mouseX > this.x-radi+width/2 && mouseX < this.x+radi+width/2 && mouseY > this.y-radi+height/2 && mouseY < this.y+radi+height/2){
      if (aktuelleLinie[0] == null && aktuelleLinie[1] == null){
        aktuelleLinie[0] = this.x;
        aktuelleLinie[1] = this.y;
      } else {
        aktuelleLinie[2] = this.x;
        aktuelleLinie[3] = this.y;
        alleLinien.push(new linie(aktuelleLinie[0],aktuelleLinie[1],aktuelleLinie[2],aktuelleLinie[3]));
        
        aktuelleLinie[0] = this.x;
        aktuelleLinie[1] = this.y;
        aktuelleLinie[2] = null;
        aktuelleLinie[3] = null;
      }
      
    }
  }
}

function linie(x1,y1,x2,y2){
  this.x1 = x1;
  this.y1 = y1;
  this.x2 = x2;
  this.y2 = y2;
  
  this.zeichneSelbst = function(){
    line(this.x1,this.y1,this.x2,this.y2);
    fill(255);
  }
}

function keyTyped(){
  if (key == 'r'){
    alleLinien = [];
    aktuelleLinie = [null,null,null,null];
  }
}

function windowResized(){
  resizeCanvas(windowWidth,windowHeight);
}