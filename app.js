let start = false;
let level = 0;
let gameseq = [];
let userseq = [];
let btns = ["yellow", "green", "red", "purple"];
let h2 = document.querySelector('h2');

document.addEventListener('keypress', function() {
    if (start == false) {
        console.log("started");
        start = true;
        level = 0; // Reset level
        gameseq = []; // Reset game sequence
        levelup();
    }
});

function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function() {
        btn.classList.remove("flash");
    }, 250);
}

function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(function() {
        btn.classList.remove("userflash");
    }, 250);
}

function levelup() {
    userseq = [];
    level++;
    h2.innerText = `level-${level}`;
    let idx = Math.floor(Math.random() * 4); // Change to 4 to include all colors
    let randcolor = btns[idx];
    let randbtn = document.querySelector(`.${randcolor}`);
    gameseq.push(randcolor);
    console.log(gameseq);
    gameFlash(randbtn);
}

function checkans(idx) {
    if (userseq[idx] == gameseq[idx]) {
        if (userseq.length == gameseq.length) {
            setTimeout(levelup, 1000);
        }
    } else {
        h2.innerHTML = `incorrect,Your score was <b>${level}</b> <br>please press any key to restart`;
        document.querySelector("body").style.background="red";
        setTimeout(function(){
            document.querySelector("body").style.background="white"
        },150);
        start = false; // Stop the game
    }
}

function btnpress() {
    let btn = this;
    userFlash(btn);

    let usercolor = btn.getAttribute("id");
    console.log(usercolor);
    userseq.push(usercolor); // Update user sequence with the current button press
    checkans(userseq.length - 1);
}

let allbtns = document.querySelectorAll(".btn");
for (let btn of allbtns) {
    btn.addEventListener("click", btnpress);
}
