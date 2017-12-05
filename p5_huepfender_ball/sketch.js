function setup() {
  createCanvas(800, 400);
}

var y = 100;
var x = 400;
var m = 1;
var n = 1;

function draw() {
  background(51);
  ellipse(x,y,50,50);  
  y += 5*m;
  x += 10*n;

  if (((height-25) - y) < 5){
    m = -1*(random(20)/10);
    fill(random(255),random(255),random(255));
  }
  
  if ((y - 25) < 5){
    m = 1*(random(20)/10);
    fill(random(255),random(255),random(255));
  }
  
  if (((width-25) - x) < 5){
    n = -1*(random(20)/10);
    fill(random(255),random(255),random(255));
  }
  
  if ((x - 25) < 5){
    n = 1*(random(20)/10);
    fill(random(255),random(255),random(255));
  }
 
}
