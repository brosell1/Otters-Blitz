const colours = ['pink', 'white', 'red', 'black', 'yellow'];
const pieces = ['pig', 'skull', 'car', 'ball', 'dragon'];
const sndBeep = new Audio("./SFX/beep.mp3");
const sndTrain = new Audio("./SFX/train.mp3");
const sndTick = new Audio("./SFX/tick.mp3");
const sndExplosion = new Audio("./SFX/explode.mp3");
var On = false;
var loop = false;

function looping(){
  let button = document.getElementById("loop");
  if(loop == false){
    button.innerHTML = "Stop Looping";
    loop = true;
  } else {
    button.innerHTML = "Loop";
    loop = false;
  }
}

function getRandom(n = pieces.length){
  return Math.floor(Math.random()*n);
}

function checkUnique(num, array) {
  return !array.includes(num);
}

// n unqiue random numbers
// // n = length of returned array
function getUniqueRandoms(n, result){
  result = result || [ getRandom() ];
  let count = result.length;
  while(count < n){
    let num = getRandom();
    if(checkUnique(num, result)){
      result.push(num);
      count++;
    }
  }
  return result;
}

function CardObject(piece, colour){
  return {
    piece: pieces[piece],
    colour: colours[colour],
    makeUrl: function(){
      return "./images/"+this.piece+"_"+this.colour+".png";
    },
    showCorrect: function(){
      let arr = [];
      if(piece == colour){
        return "./images/"+this.piece+"_"+this.colour+".png";
      } else {
        for(let i = 0; i < 5; i++){
          if(i != piece && i != colour){
            arr.push(i);
          }
        }
        return arr;
      }
    }
  }
}

function showCorrect(){
  let arr = [];
  if(piece == colour){
    return "./images/"+this.piece+"_"+this.colour+".png";
  } else {
    for(let i = 0; i < 5; i++){
      if(i != piece && i != colour){
        arr.push(i);
      }
    }
    return arr;
  }
}

function animate(){
  console.log("animation start");
  document.getElementById("spin").className += "spin";
}

function randomize(){
  let finalCard;
  let correctNum;
  let correct;
  var i = getRandom(6);
  console.log(i);
  if(i <= 1){
    const match = getRandom();
    const correctObject = new CardObject(match, match);
    console.log('correctObject:', correctObject);
    let used = [match];
    let newNums = getUniqueRandoms(3, used);
    newNums.shift();
    console.log(newNums);
    const incorrectObject = new CardObject(...newNums);
    finalCard = [correctObject, incorrectObject];
    if(i == 0){
      finalCard.reverse()
    }
    console.log("match " + i);
  } else {
    let nums = getUniqueRandoms(4);
    finalCard = [new CardObject(...nums.slice(0,2)), new CardObject(...nums.slice(2))];
  }
  console.log(finalCard[0].makeUrl());
  console.log(finalCard[1].makeUrl());
  console.log(finalCard);
  document.getElementById("first").src = finalCard[0].makeUrl();
  document.getElementById("second").src = finalCard[1].makeUrl();
  let arr1 = finalCard[0].showCorrect();
  console.log(arr1);
  let arr2 = finalCard[1].showCorrect();
  console.log(arr2);
  if(typeof(arr1) == "string"){
    correct = arr1;
  } else if(typeof(arr2) == "string"){
    correct = arr2;
  } else {
    for(let i = 2; i >= 0; i--){
      for(let j = 2; j >= 0; j--){
        if(arr2[j] == arr1[i]){
          correctNum = arr2[j];
        }
      }
    }
    console.log(correctNum);
    correct = "./images/"+pieces[correctNum]+"_"+colours[correctNum]+".png";
  }
  console.log(correct);
  wait(5000).then(() => {
    document.getElementById("first").src = correct;
    document.getElementById("second").src = "";
  })
}
const wait = time => new Promise((resolve) => setTimeout(resolve, time));
function beep(){
  sndBeep.play();
  console.log('beep');
}
function train(){
  sndTrain.play();
  console.log('train');
  randomize();
  animate();
}
function tick(){
  sndTick.play();
  console.log('tick');
}
function explosion(){
  sndTick.pause();
  sndExplosion.play();
  document.getElementById("spin").classList.remove("spin");
  On = false;
  console.log('boom');
  if(loop == true){
    noise();
  }
}
function noise(n = 5000){
  if(On == false){
    beep();
    wait(1000).then(() => beep());
    wait(2000).then(() => beep());
    wait(3000).then(() => train()).then(() => tick());
    wait(n+3000).then(() => explosion());
    On = true;
  }
}
