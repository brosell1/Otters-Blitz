const colours = ['pink', 'white', 'red', 'black', 'yellow'];
const pieces = ['pig', 'skull', 'car', 'ball', 'dragon'];
const sndBeep = new Audio("beep.mp3");
const sndTrain = new Audio("train.mp3");
const sndTick = new Audio("tick.mp3");
const sndExplosion = new Audio("explode.mp3");



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
    makeUrl: function(){return "./images/"+this.piece+"_"+this.colour+".png"}
  }
}

function randomize(){
  let finalCard;
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
}
function tick(){
  sndTick.play();
  console.log('tick');
}
function explosion(){
  sndTick.pause();
  sndExplosion.play();
  console.log('boom');
}
function noise(n = 5000){
  beep()
  wait(1000).then(() => beep());
  wait(2000).then(() => beep());
  wait(3000).then(() => train()).then(() => tick());
  wait(n+3000).then(() => explosion());
}
