var zustaende = [];
var eingabeAlphabet;
var ausgabeAlphabet;
var startZustand;

var aktuellerZustand;

var eingabeWort;
var ausgabeWort;

var lambda_func;
var delta_func;

var inputs;
var cur_menu = 'select';
var automat;

var delta_def = [[1,2],
                  [1,0],
                  [0,2]];
                
var lambda_def  = [[1,0],
                  [0,1],
                  [0,1]];  

function setup() {
  createCanvas(windowWidth,windowHeight);
  background(255);
  
  textAlign(CENTER,CENTER);
  
  
  selector = createSelect();
  selector.size(100,20);
  selector.position((width/2)-(selector.width/2),(height/2)-(selector.height/2));
  selector.option("Mealy");
  selector.option("DEA");
  
  text("Wähl den Automaten Typen aus:", width/2, (height/2)-40);
  
  next_button = createButton('Next');
  next_button.position((width/2)-(next_button.width/2),height/2+50);
  next_button.mousePressed(nextMenu);
  
}

function draw() {
  /*
  text('\u03BB',width/2,height/2);
  for (var i = 0; i < inputs[0].length; i++){
    line(inputs[0][i].x - 4,10,inputs[0][i].x - 4,100);
  }
  */
  //background(255);
  //text(str(zustaende.length),50,50);
  
}

function nextMenu(){
  switch (cur_menu) {
    case 'select':
      automat = selector.value();
      selector.remove();
      inp = createInput('3');
      inp.size(50,15);
      inp.position((width/2)-(inp.width/2),(height/2)-(inp.height/2));
      
      background(255);
      text("Anzahl an Zuständen:", width/2, (height/2)-40);
      
      cur_menu = 'states';
      break;
    case 'states':
      zustaende = Array.apply(null, {length: inp.value()}).map(Function.call, Number);
      inp.remove();
      
      sel = createSelect();
      sel.size(100,20);
      sel.position((width/2)-(sel.width/2),(height/2)-(sel.height/2));

      for (var i = 0; i < zustaende.length; i++){
        sel.option(i);
      }
      
      background(255);
      text("Startzustand Wählen:", width/2, (height/2)-40);
      
      cur_menu = 'start_state';
      break;
    case 'start_state':
      startZustand = int(sel.value());
      sel.remove();
      
      inp1 = createInput('0 1');
      inp1.size(50,15);
      inp1.position((width/2)-(inp1.width)-15,(height/2)-(inp1.height/2));
      
      inp2 = createInput('0 1');
      inp2.size(50,15);
      inp2.position((width/2)+15,(height/2)-(inp2.height/2));
      
      background(255);
      text("Eingabe/Ausgabe Alphabet\n(Zeichen mit Leerzeichen trennen):", width/2, (height/2)-40);
      
      cur_menu = 'alphabets';
      break;
    case 'alphabets':
      eingabeAlphabet = int(inp1.value().split(" "));
      ausgabeAlphabet = int(inp2.value().split(" "));
      
      inp1.remove();
      inp2.remove();
      
      var inp_size = 15;
      var inp_space = 10;
      
      inputs1 = new Array(zustaende.length);
      for (var i = 0; i < zustaende.length; i++){
        inputs1[i] = new Array(eingabeAlphabet.length);
        for (var ii = 0; ii < eingabeAlphabet.length; ii++){
      
          inputs1[i][ii] = createInput(str(lambda_def[i][ii]));
          inputs1[i][ii].position((width/2)-50-((inp_size+inp_space)*eingabeAlphabet.length)+((inp_size+inp_space)*ii),(height/2)-((inp_size+inp_space)*zustaende.length)+((inp_size+inp_space)*i));
          inputs1[i][ii].size(15,15);
        }
      }
      
      inputs2 = new Array(zustaende.length);
      for (var i = 0; i < zustaende.length; i++){
        inputs2[i] = new Array(ausgabeAlphabet.length);
        for (var ii = 0; ii < ausgabeAlphabet.length; ii++){
      
          inputs2[i][ii] = createInput(str(delta_def[i][ii]));
          inputs2[i][ii].position((width/2)+50+inp_space+((inp_size+inp_space)*ii),(height/2)-((inp_size+inp_space)*zustaende.length)+((inp_size+inp_space)*i));
          inputs2[i][ii].size(15,15);
        }
      }
      
      background(255);
      text("Funktionen:", width/2, (height/2)-((inp_size+inp_space)*zustaende.length)-40);
      
      textAlign(RIGHT,BOTTOM);
      text("\u03bb",inputs1[0][0].x-3,inputs1[0][0].y-3);
      text("\u03B4",inputs2[0][0].x-3,inputs2[0][0].y-3);
      textAlign(CENTER,BOTTOM);
      for (var i = 0; i < inputs1[0].length; i++){
        text(str(eingabeAlphabet[i]),inputs1[0][i].x + inputs1[0][i].width/2,inputs1[0][i].y-2);
      }
      for (var i = 0; i < inputs2[0].length; i++){
        text(str(ausgabeAlphabet[i]),inputs2[0][i].x + inputs2[0][i].width/2,inputs2[0][i].y-2);
      }
      textAlign(RIGHT,CENTER);
      for (var i = 0; i < inputs1.length; i++){
        text("s"+str(zustaende[i]),inputs1[0][0].x-2,inputs1[i][0].y + inputs1[i][0].width/2);
      }
      for (var i = 0; i < inputs2.length; i++){
        text("s"+str(zustaende[i]),inputs2[0][0].x-2,inputs2[i][0].y + inputs2[i][0].width/2);  
      }
      
      
      cur_menu = 'run';
      break;
    case 'run':
      lambda_func = new Array(inputs1.length);
      for (var i = 0; i < inputs1.length; i++){
        lambda_func[i] = new Array(inputs1[i].length);
        for (var ii = 0; ii < inputs1[i].length; ii++){
          lambda_func[i][ii] = int(inputs1[i][ii].value());
          inputs1[i][ii].remove();
        }
      }
      
      delta_func = new Array(inputs2.length);
      for (var i = 0; i < inputs2.length; i++){
        delta_func[i] = new Array(inputs2[i].length);
        for (var ii = 0; ii < inputs2[i].length; ii++){
          delta_func[i][ii] = int(inputs2[i][ii].value());
          inputs2[i][ii].remove();
        }
      }
      
      inputs1 = null;
      inputs2 = null;
      
      input = createInput();
      input.size(100,15);
      input.position((width/2)-25-(input.width),(height/2)-(input.height/2));
      
      run_button = createButton('Run');
      run_button.size(next_button.width,next_button.height);
      run_button.position((width/2)-(run_button.width/2),height/2+50);
      run_button.mousePressed(runMachine);
      
      background(255);
      textAlign(CENTER,CENTER);
      text("Eingabe Wort:",input.x+input.width/2,(height/2) - 40);
      
      
      
      break;
    default:
      // code
  }
  selector.remove();
}

function runMachine(){
  
  eingabeWort = int(input.value().split(""));
  ausgabeWort = new Array(eingabeWort.length);
  aktuellerZustand = startZustand;
  
  for (var i = eingabeWort.length-1; i >= 0; i--){
    ausgabeWort[i] = lambda(eingabeWort[i],aktuellerZustand);
    aktuellerZustand = delta(eingabeWort[i],aktuellerZustand);
  }
  
  background(255);
  textAlign(CENTER,CENTER);
  text("Eingabe Wort:",input.x+input.width/2,(height/2) - 40);
  textAlign(LEFT,CENTER);
  text("Ausgabe Wort:",width/2+25,height/2-40);
  text(str(ausgabeWort),width/2+25,height/2);
  
  
  for (var i = 0; i < zustaende.length; i++){
    var x = input.x;
    var xx = (width/2 - input.x) + width/2;
    var cur_y = height/2 - 140;
    var cur_x = x+((xx - x)/((zustaende.length)-1))*i;
    /*
    if (i == 0){
      var cur_x = x;
    } else {
      var cur_x = x+((xx - x)/(zustaende.length))*i;
    }
    */
    textAlign(CENTER,CENTER);
    fill(255);
    ellipse(cur_x, cur_y, 50);
    fill(0);
    text("s"+str(i),cur_x,cur_y);
    
  }
  
}

function lambda(x,z){
  
  return lambda_func[z][x];    
}
function delta(x,z){

  return delta_func[z][x];    
}
