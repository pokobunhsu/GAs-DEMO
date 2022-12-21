let chars = " abcdefghijklmnopqrstuwvxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"; //密碼可能的字元
let pops = []; //存放要猜的密碼
let key = "";
let end = false;
let total = 0;
let itera = 20; //每次產出組數
setPassword(prompt("請輸入密碼", "Genetic Algorithm"));
// setPassword("69f6af9b45f88e2fdeacab42647f8bb72183b0ef");
first();

function first() {
  for (let j = 0; j < itera; j++) {
    let guess = "";
    for (var i = 0; i < key.length; i++) {
      let rand = Math.floor(Math.random() * chars.length);
      guess += chars[rand];
    }
    pops.push(guess);
    // var result = password(guess);
    // console.log(guess, result);
  }
  total += itera;
}

function password(str) {
  let count = 0;

  //如果有猜的字串中有符合的，count就會+1
  for (var i = 0; i < key.length; i++) {
    if (key[i] === str[i]) count++;
  }

  // if (!gameOver) {
  //     logs.unshift([str, count]);
  // }

  //如果結束不等於true，以及字串的長度與解答長度相符、以及符合的與解答長度相同，代表結束要設為true
  if (!end && str.length == key.length && count === key.length) {
    end = true;
  }

  return count;
}

function setPassword(str) {
  key = str;
}

function nextGeneration() {
  let arr = [];
  pops.forEach((element) => {
    arr.push({ score: password(element), gene: element });
  });
  arr.sort((a, b) => {
    return b.score - a.score;
  });
  let parentA = arr[0].gene;
  let parentB = arr[1].gene;
  arr.forEach((element, index) => {
    pops[index] = crossover(parentA, parentB);
  });
  print();
  total += itera;
}

function crossover(a, b) {
  let child_gene = "";
  for (let i = 0; i < a.length; i++) {
    if (Math.random() < 0.1) {
      // 0.1機率做基因突變
      child_gene += chars[Math.floor(Math.random() * chars.length)];
    } else {
      //0.9機率不做基因突變，基因來自於父母
      if (Math.random() < 0.5) {
        child_gene += a[i];
      } else {
        child_gene += b[i];
      }
    }
  }
  return child_gene;
}

function print() {
  //console.log(pops);
  document.querySelector(".box").innerHTML = "";
  document.querySelector(".generation").innerHTML = total;
  pops.forEach((element) => {
    if (element == key) {
      document.querySelector(".box").innerHTML += `
        <h1>${password(element)} ${element}</h1><br>
        `;
    } else {
      document.querySelector(".box").innerHTML += `
        ${password(element)} ${element}<br>
        `;
    }
  });
}

window.addEventListener("keydown", (e) => {
  if (e.key == " " && !end) {
    nextGeneration();
  }
});

var btn = document.querySelector(".btn");
var timer = null;
var touchstartHander = function (event) {
  timer = setInterval(LongPress, 10);
};

var touchmoveHander = function (event) {
  event.preventDefault();
  clearTimeout(timer);
  timer = null;
};

var touchendHander = function (event) {
  event.preventDefault();
  clearInterval(timer);
  btn.textContent = "按我"
  return false;
};

btn.addEventListener("touchstart", touchstartHander, false);
btn.addEventListener("touchmove", touchmoveHander, false);
btn.addEventListener("touchend", touchendHander, false);

function LongPress() {
  if (!end) {
    btn.textContent = "終極加速中"
    nextGeneration();
  }
}
