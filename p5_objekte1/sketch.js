function setup() {
  createCanvas(windowWidth,windowHeight);
  klaus = new kreis(50,50,100);
  klaus2 = new kreis(100,50,70);
}

function draw() {
  background(255);
  ellipse(klaus.x,klaus.y,klaus.d);
  ellipse(klaus2.x,klaus2.y,klaus2.d);
}

function kreis(xx,yy,dd){
  this.x = xx;
  this.y = yy;
  this.d = dd;
}

