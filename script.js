// ===============================
// Elements
// ===============================

const intro = document.getElementById("intro");
const music = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");

const yesBtn = document.querySelector(".yes-btn");
const noBtn = document.querySelector(".no-btn");

const questionContainer = document.querySelector(".question-container");
const resultContainer = document.querySelector(".result-container");

const resultVideo = document.getElementById("resultVideo");

const hearts = document.getElementById("hearts");

let musicStarted = false;

// ===============================
// Intro (1 Second)
// ===============================

window.onload = () => {

    setTimeout(() => {

        intro.style.opacity = "0";

        setTimeout(() => {

            intro.style.display = "none";

        },600);

    },1000);

};

// ===============================
// Music
// ===============================

music.volume = 0.5;

document.addEventListener("click",()=>{

    if(!musicStarted){

        music.play().catch(()=>{});

        musicStarted = true;

    }

},{once:true});

musicBtn.onclick = ()=>{

    if(music.paused){

        music.play();

        musicBtn.innerHTML="🔊";

    }else{

        music.pause();

        musicBtn.innerHTML="🔇";

    }

};

// ===============================
// YES Button
// ===============================

yesBtn.addEventListener("click", () => {

    questionContainer.style.opacity = "0";
    questionContainer.style.transform = "scale(.9)";

    setTimeout(() => {

        questionContainer.style.display = "none";

        resultContainer.style.display = "block";

        resultContainer.style.opacity = "0";

        setTimeout(() => {

            resultContainer.style.opacity = "1";

            resultContainer.style.transform = "scale(1)";

        },100);

        resultVideo.currentTime = 0;

        resultVideo.play().catch(()=>{});

    },500);

});

// ===============================
// Floating Hearts
// ===============================

function createHeart(){

    const heart = document.createElement("div");

    heart.className = "heart";

    heart.innerHTML = "❤️";

    heart.style.left = Math.random() * 100 + "vw";

    heart.style.fontSize = (12 + Math.random() * 18) + "px";

    heart.style.animationDuration = (5 + Math.random() * 4) + "s";

    hearts.appendChild(heart);

    setTimeout(() => {

        heart.remove();

    },9000);

}

setInterval(createHeart,900);

// ===============================
// Music Icon
// ===============================

music.addEventListener("play",()=>{

    musicBtn.innerHTML="🔊";

});

music.addEventListener("pause",()=>{

    musicBtn.innerHTML="🔇";

});

// ===============================
// Resize
// ===============================

window.addEventListener("resize",()=>{

    noBtn.style.left="";

    noBtn.style.top="";

});

// ===============================
// Small Animation
// ===============================

setInterval(()=>{

    yesBtn.animate(

        [

            {transform:"scale(1)"},

            {transform:"scale(1.08)"},

            {transform:"scale(1)"}

        ],

        {

            duration:1200

        }

    );

},2500);

// ===============================
// Move NO Button Inside The Picture Frame
// دايمًا باينة فوق جوه الصورة، وكل ما حد يقرب منها تتحرك
// ===============================

const frame = document.querySelector(".media-frame");

function moveButton() {

    const frameRect = frame.getBoundingClientRect();

    const btnWidth = noBtn.offsetWidth;
    const btnHeight = noBtn.offsetHeight;

    // مسافة أمان من كل حواف الصورة عشان الزرار يفضل باين بالكامل جواها
    const padding = 14;

    const maxX = Math.max(0, frameRect.width - btnWidth - padding * 2);
    const maxY = Math.max(0, frameRect.height - btnHeight - padding * 2);

    const x = padding + Math.random() * maxX;
    const y = padding + Math.random() * maxY;

    noBtn.classList.add("move");

    noBtn.style.left = x + "px";
    noBtn.style.top = y + "px";

    setTimeout(() => {

        noBtn.classList.remove("move");

    }, 250);

}

// حركة فورية لو دوست/دست عليها فعلًا
noBtn.addEventListener("mouseenter", moveButton);

noBtn.addEventListener("touchstart", function (e) {

    e.preventDefault();

    moveButton();

});

// ===============================
// دودج مبكر: تتحرك بمجرد ما الماوس/الإصبع يقرب منها
// ===============================

let dodgeCooldown = false;

const dodgeRadius = 70; // بالبكسل، كل ما تقرب من الزرار بالمسافة دي هتتحرك

function maybeDodge(clientX, clientY) {

    if (dodgeCooldown) return;

    const btnRect = noBtn.getBoundingClientRect();

    const btnCenterX = btnRect.left + btnRect.width / 2;
    const btnCenterY = btnRect.top + btnRect.height / 2;

    const distance = Math.hypot(clientX - btnCenterX, clientY - btnCenterY);

    if (distance < dodgeRadius) {

        moveButton();

        dodgeCooldown = true;

        setTimeout(() => {

            dodgeCooldown = false;

        }, 300);

    }

}

document.addEventListener("mousemove", (e) => {

    maybeDodge(e.clientX, e.clientY);

});

document.addEventListener("touchmove", (e) => {

    const touch = e.touches[0];

    if (touch) maybeDodge(touch.clientX, touch.clientY);

}, { passive: true });