var t = 0;

function setup() {
  createCanvas(windowWidth,windowHeight);
  background(0);
  stroke(255,0);
  noFill();
  angleMode(DEGREES);
}

function draw() {
  h = noise(t) * width;
  x_e = noise(t*0.5+15) * width;
  y_e = noise(t*0.5) * height;
  r = noise(t+15) * 255;
  g = noise(t+25) * 255;
  b = noise(t+35) * 255;
  stroke(r,g,b,8);
  ellipse(x_e,y_e,h);
  
  t = t + 0.005;
}





