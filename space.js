"use strict";

let movingRightRed = 10;
let min = 0;
let sec1 = 5;
let sec2 = 9;
let minRed1Left = 60;
let maxRed1Left = 520;

let minRed2left = 670;
let maxRed2left = 1130;

let current1 = minRed1Left;
let current2 = maxRed2left;
// red players

let movingRightWhite = 10;
let maxWhite1left = 520;
let minWhite1left = 60;

let minWhite2left = 670;
let maxWhite2left = 1130;

let current3 = maxWhite1left;
let current4 = minWhite2left;

let rightRed;
let leftRed;
let rightWhite;
let leftWhite;

let arrowUp;
let letterW;

let whiteHealthNum = 200;
let redHealthNum = 200;

let newGreenBullet = document.createElement("div");
let newBlueBullet = document.createElement("div");

const firstArea = document.querySelector(".player-area-1");
const secondArea = document.querySelector(".player-area-2");

const redPlayer1 = document.querySelector(".player-1");
const whitePlayer2 = document.querySelector(".player-2");
const redPlayer3 = document.querySelector(".player-3");
const whitePlayer4 = document.querySelector(".player-4");
const starter = document.querySelector(".start");
const timer = document.querySelector(".timer");
const redHealth = document.querySelector(".red-health");
const whiteHealth = document.querySelector(".white-health");
const reset = document.querySelector(".reset");
const playerRedbar = document.querySelector(".player-red");
const playerWhitebar = document.querySelector(".player-white");
const redBullet = document.querySelector(".red-bullet"); //
const blueBullet = document.querySelector(".blue-bullet"); //

const newBulletBlue = whitePlayer4.closest(".blue-bullet"); //

/////////////////////////////////// -- variables--

redPlayer1.style.left = `${minRed1Left}px`;
redPlayer3.style.left = `${maxRed2left}px`;

whitePlayer2.style.left = `${maxWhite1left}px`;
whitePlayer4.style.left = `${minWhite2left}px`;

let redPlayer1Point = redPlayer1.getBoundingClientRect().x + 90;
let redPlayer3Point = redPlayer3.getBoundingClientRect().x + 90;
let whitePlayer2Point = whitePlayer2.getBoundingClientRect().x + 90;
let whitePlayer4Point = whitePlayer4.getBoundingClientRect().x + 90;

///////////////////////////////////-- setting initial values for left property --

const game = function () {
  document.addEventListener("keydown", function (e) {
    if (e.key === "a" || e.key === "A") leftRed = true;
    if (e.key === "d" || e.key === "D") rightRed = true;
    if (e.key === "ArrowLeft") leftWhite = true;
    if (e.key === "ArrowRight") rightWhite = true;
    if (e.key === "ArrowUp") arrowUp = true;

    if (e.key === "w" || e.key === "W") letterW = true;
    // console.log(leftRed, leftWhite, rightRed, rightWhite);
    whitePlayer();
    redPlayer();
    fire();
    fireBlue();
    // console.log(redPlayer1Range)
  });

  document.addEventListener("keyup", function (e) {
    if (e.key === "a" || e.key === "A") leftRed = false;
    if (e.key === "d" || e.key === "D") rightRed = false;
    if (e.key === "ArrowLeft") leftWhite = false;
    if (e.key === "ArrowRight") rightWhite = false;
    if (e.key === "ArrowUp") arrowUp = false;
    if (e.key === "w" || e.key === "W") letterW = false;
    // console.log(leftRed, leftWhite, rightRed, rightWhite);
    whitePlayer();
    redPlayer();
    fire();
    fireBlue();
  });

  const redPlayer = function () {
    if (leftRed == true) {
      if (redPlayer1.style.left !== `${minRed1Left}px`) {
        redPlayer1.style.left = `${(current1 -= movingRightRed)}px`;
        redPlayer3.style.left = `${(current2 += movingRightRed)}px`;
        // setting codrdinates
        if (redPlayer1Point !== minRed1Left) redPlayer1Point = current1;
        if (redPlayer3Point !== maxRed2left) redPlayer3Point = current2;
      } else if (redPlayer1.style.left === `${minRed1Left}px`) {
        redPlayer1.style.left = `${minRed1Left}px`;
      }
    } else if (rightRed == true) {
      if (redPlayer1.style.left !== `${maxRed1Left}px`) {
        redPlayer1.style.left = `${(current1 += movingRightRed)}px`;
        redPlayer3.style.left = `${(current2 -= movingRightRed)}px`;

        // setting cordinates
        if (redPlayer1Point !== maxRed1Left) redPlayer1Point = current1;
        if (redPlayer3Point !== minRed2left) redPlayer3Point = current2;
      } else if (redPlayer1.style.left === `${maxRed1Left}px`) {
        redPlayer1.style.left = `${maxRed1Left}px`;
      }
    }
  };

  const whitePlayer = function () {
    if (leftWhite == true) {
      if (whitePlayer4.style.left !== `${minWhite2left}px`) {
        whitePlayer4.style.left = `${(current4 -= movingRightWhite)}px`;
        whitePlayer2.style.left = `${(current3 += movingRightWhite)}px`;
        //setting cordenaties
        if (whitePlayer4Point !== minWhite2left) whitePlayer4Point = current4;
        if (whitePlayer2Point !== maxWhite1left) whitePlayer2Point = current3;
      } else if (whitePlayer4.style.left === `${minWhite2left}px`) {
        whitePlayer4.style.left = `${minWhite2left}px`;
      }
    } else if (rightWhite == true) {
      if (whitePlayer4.style.left !== `${maxWhite2left}px`) {
        whitePlayer4.style.left = `${(current4 += movingRightWhite)}px`;
        whitePlayer2.style.left = `${(current3 -= movingRightWhite)}px`;

        // setting cordinates

        if (whitePlayer4Point !== maxWhite2left) whitePlayer4Point = current4;
        if (whitePlayer2Point !== minWhite1left) whitePlayer2Point = current3;
      } else if (whitePlayer4.style.left === `${maxWhite2left}px`) {
        whitePlayer4.style.left = `${maxWhite2left}px`;
      }
    }
  };
};
/////////////////////////////////// -- playeres functionality
let alarm;
starter.addEventListener("click", function () {
  game();
  // redPlayer1.classList.add('left')
  alarm = setInterval(function () {
    if (redHealthNum == 0) {
      document.body.innerHTML = `<div class="winner">the winner is 
            the <span class ="win-white">White Player</span></div>`;
    } else if (whiteHealthNum == 0) {
      document.body.innerHTML = `<div class = "winner">the winner is 
            the <span class = "win-red">Red Player</span></div>`;
    }
    if (sec1 !== 0 && sec2 !== 0) {
      timer.innerHTML = `${min}:${sec1}${sec2}`;
      sec2--;
    } else if (sec1 !== 0 && sec2 == 0) {
      timer.innerHTML = `${min}:${sec1}${sec2}`;
      sec1--;
      sec2 = 9;
    } else if (sec1 == 0 && sec2 !== 0) {
      sec1 = 0;
      timer.innerHTML = `${min}:${sec1}${sec2}`;

      sec2--;
    } else {
      sec1 = 0;
      sec2 = 0;
      timer.innerHTML = `${0}:${0}${0}`;
      movingRightRed = 0;
      movingRightWhite = 0;
      document.body.innerHTML = ``;
      if (whiteHealthNum > redHealthNum) {
        document.body.innerHTML = `<div class="winner">the winner is 
                the <span class ="win-white">White Player</span></div>`;
      } else if (whiteHealthNum < redHealthNum) {
        document.body.innerHTML = `<div class = "winner">the winner is 
                the <span class = "win-red">Red Player</span></div>`;
      } else {
        document.body.innerHTML = `<div class="winner">it is a Draw</div>`;
      }
      clearTimeout(alarm);
    }
  }, 1000);
});

reset.addEventListener("click", function () {
  movingRightRed = 10;
  min = 0;
  sec1 = 5;
  sec2 = 9;
  minRed1Left = 60;
  maxRed1Left = 520;

  minRed2left = 670;
  maxRed2left = 1130;

  current1 = minRed1Left;
  current2 = maxRed2left;
  // red players

  movingRightWhite = 10;
  maxWhite1left = 520;
  minWhite1left = 60;

  minWhite2left = 670;
  maxWhite2left = 1130;

  current3 = maxWhite1left;
  current4 = minWhite2left;

  rightRed = false;
  leftRed = false;
  rightWhite = false;
  leftWhite = false;
  redPlayer1.style.left = `${minRed1Left}px`;
  redPlayer3.style.left = `${maxRed2left}px`;

  whitePlayer2.style.left = `${maxWhite1left}px`;
  whitePlayer4.style.left = `${minWhite2left}px`;
  timer.innerHTML = `${1}:${0}${0}`;
  redHealth.innerHTML = 200;
  whiteHealth.innerHTML = 200;

  playerRedbar.style.height = "200px";
  playerWhitebar.style.height = "200px";
  clearTimeout(alarm);
  whiteHealthNum = 200;
  redHealthNum = 200;
});

////////////////////////////////////////////// --timer

let blue = false;
let blueBulletTop = whitePlayer4.getBoundingClientRect().top - 70;
let blueBulletTop2 = whitePlayer2.getBoundingClientRect().top - 70;
let bulletBlueGun = document.createElement("div");
let secondBulletBlueGun = document.createElement("div");
bulletBlueGun.style.top = `${blueBulletTop}px`;
secondBulletBlueGun.style.top = `${blueBulletTop2}px`;

let blueBullet1Interval;

let blueBulletX;
const fireBlue = function () {
  if (arrowUp) {
    if (!blue) {
      blueBulletX = current4;

      bulletCreaterBlue(bulletBlueGun, secondBulletBlueGun);
      bulletBlueGun.style.left = `${current4 - 900}px`;
      secondBulletBlueGun.style.left = `${current3 - 300}px`;

      movingBulletBlue(
        bulletBlueGun,
        whitePlayer4,
        secondArea,
        80,
        blueBullet1Interval,
        redPlayer3,
        secondBulletBlueGun,
        firstArea,
        whitePlayer2
      );
    }
  }
};

let topShift = 3;
let green = false;
let greenBulletTop = redPlayer1.getBoundingClientRect().top - 70;
let greenBulletTop2 = redPlayer3.getBoundingClientRect().top - 70;
let bulletGreenGun = document.createElement("div");
bulletGreenGun.style.top = `${greenBulletTop}px`;
let secondBulletGreenGun = document.createElement("div");
secondBulletGreenGun.style.top = `${greenBulletTop2}px`;
let greenBullet1Interval;
let bulletX;

const fire = function () {
  if (letterW) {
    if (!green) {
      bulletX = current1;
      bulletCreater(bulletGreenGun, secondBulletGreenGun);
      bulletGreenGun.style.left = `${current1 - 20}px`;
      secondBulletGreenGun.style.left = `${current2 - 635}px`;

      movingBullet(
        bulletGreenGun,
        redPlayer1,
        firstArea,
        80,
        greenBullet1Interval,
        whitePlayer2,
        secondBulletGreenGun,
        secondArea,
        redPlayer3
      );
    }
  }
};

const bulletCreater = function (bullet, bullet2) {
  // bullet = document.createElement('div')
  bullet.classList.add("green-bullet");
  bullet.classList.add("shoot1");
  bullet2.classList.add("green-bullet");
  bullet2.classList.add("shoot1");

  firstArea.append(bullet);
  secondArea.append(bullet2);
};
const bulletCreaterBlue = function (bullet, bullet2) {
  bullet.classList.add("blue-bullet");
  bullet.classList.add("shoot1");
  bullet2.classList.add("blue-bullet");
  bullet2.classList.add("shoot1");
  firstArea.append(bullet2);
  secondArea.append(bullet);
};

const movingBullet = function (
  bullet,
  playershooter,
  Area,
  resetTop,
  timer,
  recieverPlayer,
  secondBullet,
  secondArea,
  secondPlayerShooter
) {
  if (!green) {
    green = true;
    timer = setInterval(function () {
      if (bullet.getBoundingClientRect().top >= 41) {
        bullet.style.top = `${(greenBulletTop -= topShift)}px`;
        secondBullet.style.top = `${(greenBulletTop2 += topShift)}px`;
      } else {
        greenBulletTop = playershooter.getBoundingClientRect().top - 70;
        bullet.style.top = `${
          playershooter.getBoundingClientRect().top - resetTop
        }px`; // playershooter = redplayer1
        greenBulletTop2 = secondPlayerShooter.getBoundingClientRect().top - 70;
        secondBullet.style.top = `${
          secondPlayerShooter.getBoundingClientRect().top + resetTop
        }px`;
        Area.removeChild(bullet);
        secondArea.removeChild(secondBullet);
        green = false;

        clearInterval(timer);

        if (
          bulletX >= recieverPlayer.getBoundingClientRect().left - 45 &&
          bulletX <= recieverPlayer.getBoundingClientRect().left + 45
        ) {
          playerWhitebar.style.height = `${(whiteHealthNum -= 20)}px`;
          whiteHealth.textContent = whiteHealthNum;
        }
      }
    });
  }
};
const movingBulletBlue = function (
  bullet,
  playershooter,
  Area,
  resetTop,
  timer,
  recieverPlayer,
  secondBullet,
  secondArea,
  secondPlayerShooter
) {
  if (!blue) {
    blue = true;
    timer = setInterval(function () {
      if (bullet.getBoundingClientRect().top >= 41) {
        bullet.style.top = `${(blueBulletTop -= topShift)}px`;
        secondBullet.style.top = `${(blueBulletTop2 += topShift)}px`;
      } else {
        blueBulletTop = playershooter.getBoundingClientRect().top - 70;
        bullet.style.top = `${
          playershooter.getBoundingClientRect().top - resetTop
        }px`; // playershooter = redplayer1
        blueBulletTop2 = secondPlayerShooter.getBoundingClientRect().top - 70;
        secondBullet.style.top = `${
          secondPlayerShooter.getBoundingClientRect().top + resetTop
        }px`;
        Area.removeChild(bullet);
        secondArea.removeChild(secondBullet);
        blue = false;

        clearInterval(timer);

        if (
          blueBulletX >= recieverPlayer.getBoundingClientRect().left - 45 &&
          blueBulletX <= recieverPlayer.getBoundingClientRect().left + 45
        ) {
          playerRedbar.style.height = `${(redHealthNum -= 20)}px`;
          redHealth.textContent = redHealthNum;
        }
      }
    });
  }
};
