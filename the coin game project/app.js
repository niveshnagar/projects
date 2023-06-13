// variable declarations;
// player and coin
const avatar = document.querySelector("#player");
const coin = document.querySelector("#coin");

// stones
const stone1 = document.querySelector("#stone1");
const stone2 = document.querySelector("#stone2");
const stone3 = document.querySelector("#stone3");
const stone4 = document.querySelector("#stone4");
const stone5 = document.querySelector("#stone5");
const stone6 = document.querySelector("#stone6");
const stone7 = document.querySelector("#stone7");
const stone8 = document.querySelector("#stone8");
const stone9 = document.querySelector("#stone9");
const stone10 = document.querySelector("#stone10");

const stones = [stone1, stone2, stone3, stone4, stone5, stone6, stone7, stone8, stone9, stone10];

const gameMap = document.getElementById("gameArea");
const mapHeight = window.innerHeight;
const mapWidth = window.innerWidth;
const avatarStyles = getComputedStyle(avatar);
const avatarHeight = avatarStyles.height;
const avatarWidth = avatarStyles.width;
const maxAllowedTop = mapHeight - extractPixel(avatarHeight) - 50;
const maxAllowedLeft = mapWidth - extractPixel(avatarWidth) - 50;
const scoreCounter = document.querySelector("#score");

// functions declarations;
function extractPixel(stringHeight) {
  if (!stringHeight) return 0;
  return parseInt(stringHeight.slice(0, -2));
}

function isTouching(a, b) {
  const aRect = a.getBoundingClientRect();
  const bRect = b.getBoundingClientRect();

  return !(
    aRect.top + aRect.height < bRect.top ||
    aRect.top > bRect.top + bRect.height ||
    aRect.left + aRect.width < bRect.left ||
    aRect.left > bRect.left + bRect.width
  );
}

function moveCoin() {
  coin.style.left = `${Math.floor(Math.random() * maxAllowedLeft)}px`;
  coin.style.top = `${Math.floor(Math.random() * maxAllowedTop)}px`;
}

function placeStone(stone){
  stone.style.left = `${
    Math.floor(Math.random() * (maxAllowedLeft - 100)) + 100
  }px`;
  stone.style.top = `${
    Math.floor(Math.random() * (maxAllowedTop - 100)) + 100
  }px`;
}

function generateMap() {
  // place stone 1;
  placeStone(stone1);

  // place stone 2;
  placeStone(stone2);
  while (isTouching(stone1, stone2)) {
    placeStone(stone2);
  }

  // place stone 3;
  placeStone(stone3);
  while (
    isTouching(stone1, stone3) ||
    isTouching(stone2, stone3) 
  ) {
    placeStone(stone3);
  }

  // place stone 4;
  placeStone(stone4);
  while (
    isTouching(stone1, stone4) ||
    isTouching(stone2, stone4) ||
    isTouching(stone3, stone4)
  ) {
    placeStone(stone4);
  }

  // place stone 5;
  placeStone(stone5);
  while (
    isTouching(stone1, stone5) ||
    isTouching(stone2, stone5) ||
    isTouching(stone3, stone5) ||
    isTouching(stone4, stone5) 
  ) {
    placeStone(stone5);
  }
  // place stone 6;
  placeStone(stone6);
  while (
    isTouching(stone1, stone6) ||
    isTouching(stone2, stone6) ||
    isTouching(stone3, stone6) ||
    isTouching(stone4, stone6) ||
    isTouching(stone5, stone6)
  ) {
    placeStone(stone6);
  }

  // place stone 7;
  placeStone(stone7);
  while (
    isTouching(stone1, stone7) ||
    isTouching(stone2, stone7) ||
    isTouching(stone3, stone7) ||
    isTouching(stone4, stone7) ||
    isTouching(stone5, stone7) ||
    isTouching(stone6, stone7)
  ) {
    placeStone(stone7);
  }

  // place stone 8;
  placeStone(stone8);
  while (
    isTouching(stone1, stone8) ||
    isTouching(stone2, stone8) ||
    isTouching(stone3, stone8) ||
    isTouching(stone4, stone8) ||
    isTouching(stone5, stone8) ||
    isTouching(stone6, stone8) ||
    isTouching(stone7, stone8)
  ) {
    placeStone(stone8);
  }

  // place stone 9;
  placeStone(stone9);
  while (
    isTouching(stone1, stone9) ||
    isTouching(stone2, stone9) ||
    isTouching(stone3, stone9) ||
    isTouching(stone4, stone9) ||
    isTouching(stone5, stone9) ||
    isTouching(stone6, stone9) ||
    isTouching(stone7, stone9) ||
    isTouching(stone8, stone9)
  ) {
    placeStone(stone9);
  }

  // place stone 10;
  placeStone(stone10);
  while (
    isTouching(stone1, stone10) ||
    isTouching(stone2, stone10) ||
    isTouching(stone3, stone10) ||
    isTouching(stone4, stone10) ||
    isTouching(stone5, stone10) ||
    isTouching(stone6, stone10) ||
    isTouching(stone7, stone10) ||
    isTouching(stone8, stone10) ||
    isTouching(stone9, stone10) 
  ) {
    placeStone(stone10);
  }
}
generateMap();

// making the game map;
gameMap.style.height = `${mapHeight - 51}px`;
gameMap.style.backgroundImage = `url("./assets/grasstile.jpeg")`;

// write code to move the player;
window.addEventListener("keyup", function (event) {
  if (event.key === "w") {
    const currTop = extractPixel(avatar.style.top);
    if (currTop > 50) {
      avatar.style.top = `${currTop - 50}px`;
    }
    if (isTouching(avatar, coin)) {
      moveCoin();
      let coinCount = parseInt(scoreCounter.innerText);
      scoreCounter.innerText = `${coinCount + 1}`;
    }
  } else if (event.key === "s") {
    const currTop = extractPixel(avatar.style.top);
    if (currTop <= maxAllowedTop) {
      avatar.style.top = `${currTop + 50}px`;
    }
    if (isTouching(avatar, coin)) {
      moveCoin();
      let coinCount = parseInt(scoreCounter.innerText);
      scoreCounter.innerText = `${coinCount + 1}`;
    }
  } else if (event.key === "a") {
    const currLeft = extractPixel(avatar.style.left);
    if (currLeft >= 50) {
      avatar.style.left = `${currLeft - 50}px`;
    }
    avatar.style.transform = "scale(-1,1)";
    if (isTouching(avatar, coin)) {
      moveCoin();
      let coinCount = parseInt(scoreCounter.innerText);
      scoreCounter.innerText = `${coinCount + 1}`;
    }
  } else if (event.key === "d") {
    const currLeft = extractPixel(avatar.style.left);
    if (currLeft <= maxAllowedLeft) {
      avatar.style.left = `${currLeft + 50}px`;
    }
    avatar.style.transform = "scale(+1,1)";
    if (isTouching(avatar, coin)) {
      moveCoin();
      let coinCount = parseInt(scoreCounter.innerText);
      scoreCounter.innerText = `${coinCount + 1}`;
    }
  }
});
