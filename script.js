const board = document.getElementById("board");
// board size = 900x450 px

var storageId = [];
var storage = [];
var flipCount = 0;
function flip(element) {
  if(storageId[0] === element.id && storageId[0] !== 'undefined'){
    alert('pick another card');
    return;
  }
  element.classList.add("flip");
  flipCount++;
  // pushing the value into the storage, for every card that is flip
  storage.push(element.children[1].id);
  storageId.push(element.id);
  // if two card have been flipped, flipCount = 2
  if (flipCount == 2) {
    flipCount = 0; // flipCount reset
    // check if the two card values the same
    if (storage[0] == storage[1]) {
      correctCard(storageId[0], storageId[1]);
    } else {
      flipCard();
    }
    // reset the storage after two card have been picked
    storage = [];
    storageId = [];
  }
  winCondition(); //check win 
}

// random value card generator
const char = ["A", "B", "C"];
const stg = [];
const pad = {
  A: 0,
  B: 0,
  C: 0,
}; //A , B, C -> total
for (let i = 0; i < 6; i++) {
  const random = Math.floor(Math.random() * char.length);
  const target = char.indexOf(`${char[random]}`);
  // input value line code
  stg[i] = char[random];

  // change char
  pad[`${char[random]}`]++;
  if (pad[`${char[random]}`] > 1) {
    char.splice(target, 1);
  }
}

// render value for each cards
renderValue();
function renderValue() {
  for (let i = 1; i < 7; i++) {
    const value = document.getElementById(i);
    value.textContent = `${stg[i - 1]}`;
    value.id = stg[i - 1];
  }
}

//win condition function
function winCondition() {
  var tes = document.getElementsByClassName("flip");
  if (tes.length == 6) {
    setTimeout(() => {
      alert("you win");
    }, 2000);
  }
}
// flip function
function flipCard(){
  var flipTarget = document.getElementsByClassName("card");
  let counter = 1;
  for (let e of flipTarget) {
    if(e.id === `card${counter}`) {
      setTimeout(() => {
        e.classList.remove("flip");
      }, 2000);
    }
    counter++;
  }
}
//un flip the correct card function
function correctCard(card1, card2){
  var cardFlip1 = document.getElementById(card1);
  var cardFlip2 = document.getElementById(card2);
  cardFlip1.id = 'correct';
  cardFlip2.id = 'correct';
}