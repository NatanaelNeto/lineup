var click = new Howl({
   src:['click.mp3'],
   volume: 0.5
});

var congrats = new Howl({
   src:['congrats.mp3'],
   volume: 1
});

var startLoad = setInterval(sLoad, 50);
var cLoad = 0;
var arrayGame = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
function sLoad() {
   document.getElementById(cLoad).style.opacity = '1';
   document.getElementById(cLoad).style.marginTop = '0';
   cLoad++;
   console.log(cLoad);
   if(cLoad === 20){
      clearInterval(startLoad);
   }
}
var tryCongrats = true;
function update(){
   if(arrayGame[0] === 1){
      tryCongrats = true;
   }else{
      tryCongrats = false;
   }
   for(var i = 0; i < 20; i++){
      document.getElementById(i).innerText = arrayGame[i];
      if(i > 1){
         if(tryCongrats){
            tryCongrats = (arrayGame[i-1] + 1 === arrayGame[i]);
         }
      }
   }
   if(tryCongrats){
      congrats.play();
      if(scrambled){
         alert("Parabéns!");
         scrambled = false;
      }
   }
}
var scrambled = false;

var sRight = document.getElementById('swapRight');
var sLeft = document.getElementById('swapLeft');
var r = document.getElementById('rotate');
var shuffle = document.getElementById('shuffle');

sRight.addEventListener("click", function(){
   swapRight();
   update();
   click.play();
});

sLeft.addEventListener("click", function(){
   swapLeft();
   update();
   click.play();
});

r.addEventListener("click", function(){
   rotate();
   update();
   click.play();
});

function swapRight(){
   var init = arrayGame[19]
   for(var i = 19; i > 0; i--){
      arrayGame[i] = arrayGame[i-1];
   }
   arrayGame[0] = init;
}

function swapLeft(){
   var init = arrayGame[0]
   for(var i = 0; i < 19; i++){
      arrayGame[i] = arrayGame[i+1];
   }
   arrayGame[19] = init;
}

function rotate(){
   var a = arrayGame[8];
   var b = arrayGame[9];
   arrayGame[8] = arrayGame[11];
   arrayGame[9] = arrayGame[10];
   arrayGame[10] = b;
   arrayGame[11] = a;
}

shuffle.addEventListener("click", function(){
   var getCounter = Math.floor((Math.random()*500) + 500);

   for (var i = 0; i < getCounter; i++){
      var getA = Math.floor(Math.random()*19);
      for(var a = 0; a < getA; a++){
         swapLeft();
      }
      rotate();
      var getB = Math.floor(Math.random()*19);
      for(var b = 0; b < getB; b++){
         swapRight();
      }
   }
   update();
   scrambled = true;
   click.play();
});