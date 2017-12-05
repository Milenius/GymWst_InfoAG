var cRad = 1;
var t = 0;
var x;
var y;

function setup() {
  createCanvas(windowWidth,windowHeight);
  background(0);
  noFill();
  x = random(width);
  y = random(height);
}

function draw() {
  r = noise(t+15) * 255;
  g = noise(t+25) * 255;
  b = noise(t+35) * 255;
  stroke(r,g,b);
  
  if (cRad > random(500)){
    cRad = 0;
    x = random(width);
    y = random(height);
    background(0);
  }
  
  ellipse(x,y,cRad);
  cRad += 1;
  t += 0.01;
}

function windowResized(){
  resizeCanvas(windowWidth,windowHeight);    
  background(0);
}
