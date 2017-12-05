var h = 400;
var t = 0;
var a = 0;
var button;

function setup() {
  createCanvas(windowWidth,windowHeight);
  background(0);
  stroke(255,8);
  noFill();
  angleMode(DEGREES);
    
  button = createButton('Reset');
  button.position(19, 19);
  button.mousePressed(reset);
}

function draw() {
  translate(width/2,height/2);
  frameRate(60);
  //strokeWeight(0.1);
  if (a == 10000){
    filter(BLUR,3);           
  }
  
  h = noise(t) * width;
  
  var x1 = (h/2) * cos(-90+a);
  var y1 = (h/2) * sin(-90+a);
  var x2 = (h/2) * cos(30+a);
  var y2 = (h/2) * sin(30+a);
  var x3 = (h/2) * cos(150+a);
  var y3 = (h/2) * sin(150+a);
  
  r = noise(t+15) * 255;
  g = noise(t+25) * 255;
  b = noise(t+35) * 255;
  stroke(r,g,b,24);
  
  triangle(x1,y1,x2,y2,x3,y3);
  t += 0.01;
  a += 1;
}

function pause(){
  button.mousePressed(start);    
  noLoop();
}

function start(){
  button.mousePressed(pause);
  loop();
}

function reset(){
  background(0);
}
