/* ==========================================================
   HANAMI PROJECT
   Chapter IV • The Little Museum About You
========================================================== */

/* ==========================================================
   DATA
========================================================== */

const introStory = [
    "Sebelum kita melanjutkan...",
    "Aku ingin mengajakmu mendengarkan sesuatu.",
    "Lagu ini...",
    "Entah kenapa...",
    "Selalu berhasil mengingatkanku padamu."
];

const museumStory = [
    "Selamat datang...",
    "Di museum kecil...",
    "Yang diam-diam berisi...",
    "Hal-hal favoritmu.",
    "Dan entah kenapa...",
    "Semuanya selalu berhasil mengingatkanku padamu."
];

const exhibits = [
    {
        number: "Exhibit 01 / 08",
        title: "Ini Abadi",
        subtitle: "Lagu Favorit",
        description: "Setiap kali lagu ini terdengar, pikiranku selalu berjalan ke arah yang sama. Ke seseorang yang pernah memperkenalkannya kepadaku.",
        image: "../assets/img/perunggu.jpg",
        effect: "music"
    },
    {
        number: "Exhibit 02 / 08",
        title: "Kucing",
        subtitle: "Hewan Favorit",
        description: "Entah kenapa, setiap melihat kucing, aku selalu teringat kalau kamu menyukainya.",
        image: "../assets/img/cat.jpg",
        effect: "cat"
    },
    {
        number: "Exhibit 03 / 08",
        title: "Banana Milk",
        subtitle: "Minuman Favorit",
        description: "Sekarang setiap melihat Banana Milk, aku langsung kepikiran kamu.",
        image: "../assets/img/banana-milk.jpg",
        effect: "drink"
    },
    {
        number: "Exhibit 04 / 08",
        title: "Tiramisu",
        subtitle: "Makanan Favorit",
        description: "Aku jadi tahu ternyata ada orang yang bisa sesuka itu sama tiramisu.",
        image: "../assets/img/tiramisu.jpg",
        effect: "food"
    },
    {
        number: "Exhibit 05 / 08",
        title: "Fresh Flower",
        subtitle: "Hal yang Disukai",
        description: "Bunga putih, bunga pink. Selalu terasa tenang setiap melihatnya.",
        image: "../assets/img/flower.jpg",
        effect: "flower"
    },
    {
        number: "Exhibit 06 / 08",
        title: "Golden Sunset",
        subtitle: "Tempat Favorit",
        description: "Menikmati senja di tempat yang indah. Kedengarannya sederhana, tapi indah.",
        image: "../assets/img/sunset.jpg",
        effect: "sunset"
    },
    {
        number: "Exhibit 07 / 08",
        title: "Bernyanyi & Melukis",
        subtitle: "Hobi",
        description: "Dua hal kecil yang lama-lama menjadi bagian dari dirimu.",
        image: "../assets/img/hobby.jpg",
        effect: "paint"
    },
    {
        number: "Exhibit 08 / 08",
        title: "I Don't Know Yet",
        subtitle: "Keinginan",
        description: "Mungkin semesta masih menyiapkan plot twist terbaik untukmu.",
        image: "../assets/img/question.jpg",
        effect: "spotlight"
    }
];

const reflections = [
    "Lucu ya...",
    "Awalnya semua ini cuma daftar hal yang kamu sukai.",
    "Tapi lama-lama...",
    "Daftar itu berubah menjadi hal-hal yang selalu mengingatkanku padamu.",
    "Mungkin memang seperti itu cara seseorang tinggal di ingatan orang lain."
];

/* ==========================================================
   DOM
========================================================== */

const introSection        = document.getElementById("introSection");
const introText           = document.getElementById("introText");
const musicSection        = document.getElementById("musicSection");
const playButton          = document.getElementById("playButton");
const miniPlayer          = document.getElementById("miniPlayer");
const museumLabel         = document.getElementById("museumLabel");
const museumCounter       = document.getElementById("museumCounter");
const favoriteSection     = document.getElementById("favoriteSection");
const favoriteCard        = document.getElementById("favoriteCard");
const favoriteImage       = document.getElementById("favoriteImage");
const favoriteNumber      = document.getElementById("favoriteNumber");
const favoriteTitle       = document.getElementById("favoriteTitle");
const favoriteSubtitle    = document.getElementById("favoriteSubtitle");
const favoriteDescription = document.getElementById("favoriteDescription");
const reflectionSection   = document.getElementById("reflectionSection");
const reflectionText      = document.getElementById("reflectionText");
const endingSection       = document.getElementById("endingSection");
const endingTitle         = document.getElementById("endingTitle");
const endingDescription   = document.getElementById("endingDescription");
const nextChapter         = document.getElementById("nextChapter");
const bgMusic             = document.getElementById("favoriteMusic");
const sceneLayer          = document.getElementById("sceneLayer");

/* ==========================================================
   STATE
========================================================== */

let introIndex      = 0;
let museumIndex     = 0;
let exhibitIndex    = 0;
let reflectionIndex = 0;
let typingTimer     = null;
let exhibitTimer    = null;
let progressTimer   = null;
let isTyping        = false;
let musicStarted    = false;

/* nama untuk ending — diambil dari music card */
const recipientName = "Mawar";

/* ==========================================================
   TIMING
========================================================== */

const timing = {
    typing:    28,
    sentence:  1000,
    fade:      350,
    exhibit:   6000
};

/* ==========================================================
   CUSTOM CURSOR
========================================================== */

const cursorDot  = document.createElement("div");
const cursorRing = document.createElement("div");
cursorDot.className  = "cursor cursor-dot";
cursorRing.className = "cursor cursor-ring";
document.body.appendChild(cursorDot);
document.body.appendChild(cursorRing);

let mouseX = 0, mouseY = 0;
let ringX  = 0, ringY  = 0;

document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorDot.style.left = mouseX + "px";
    cursorDot.style.top  = mouseY + "px";
});

/* ring follows with slight lag */
(function animateRing() {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    cursorRing.style.left = ringX + "px";
    cursorRing.style.top  = ringY + "px";
    requestAnimationFrame(animateRing);
})();

/* ==========================================================
   PROGRESS BAR
========================================================== */

const progressWrap = document.createElement("div");
progressWrap.className = "exhibit-progress";
const progressBar = document.createElement("div");
progressBar.className = "exhibit-progress-bar";
progressWrap.appendChild(progressBar);
document.body.appendChild(progressWrap);

function startProgress(duration) {
    clearTimeout(progressTimer);
    progressBar.style.transition = "none";
    progressBar.style.width = "0%";

    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            progressBar.style.transition = `width ${duration}ms linear`;
            progressBar.style.width = "100%";
        });
    });
}

function resetProgress() {
    progressBar.style.transition = "none";
    progressBar.style.width = "0%";
}

/* ==========================================================
   TYPEWRITER
========================================================== */

function typeWriter(text, callback) {
    clearTimeout(typingTimer);
    isTyping = true;
    introText.textContent = "";
    introText.classList.remove("hideWord");
    introText.classList.add("showWord");

    let index = 0;

    function write() {
        if (index < text.length) {
            introText.textContent += text.charAt(index);
            index++;
            typingTimer = setTimeout(write, timing.typing);
        } else {
            isTyping = false;
            typingTimer = setTimeout(() => callback(), timing.sentence);
        }
    }

    write();
}

function hideSentence(callback) {
    introText.classList.remove("showWord");
    introText.classList.add("hideWord");
    setTimeout(() => callback(), timing.fade);
}

/* ==========================================================
   INTRO FLOW
========================================================== */

function playIntro() {
    if (introIndex >= introStory.length) {
        hideSentence(() => {
            introSection.classList.add("hidden");
            showMusicCard();
        });
        return;
    }
    typeWriter(introStory[introIndex], () => {
        hideSentence(() => {
            introIndex++;
            playIntro();
        });
    });
}

function showMusicCard() {
    musicSection.classList.remove("hidden");
    requestAnimationFrame(() => musicSection.classList.add("show"));
}

/* ==========================================================
   MUSEUM INTRO FLOW
========================================================== */

function playMuseumIntro() {
    if (museumIndex >= museumStory.length) {
        hideSentence(() => {
            introSection.classList.add("hidden");
            showMuseum();
        });
        return;
    }
    typeWriter(museumStory[museumIndex], () => {
        hideSentence(() => {
            museumIndex++;
            playMuseumIntro();
        });
    });
}

function startMuseumIntro() {
    introSection.classList.remove("hidden");
    introText.textContent = "";
    museumIndex = 0;
    playMuseumIntro();
}

/* ==========================================================
   MUSIC
========================================================== */

function playMusic() {
    if (!bgMusic) return;
    bgMusic.volume = 0;
    bgMusic.loop   = true;
    bgMusic.play().catch(() => {});

    let volume = 0;
    const fade = setInterval(() => {
        volume += 0.02;
        if (volume >= 0.45) { volume = 0.45; clearInterval(fade); }
        bgMusic.volume = volume;
    }, 100);
}

function fadeOutMusic() {
    if (!bgMusic) return;
    const fade = setInterval(() => {
        bgMusic.volume -= 0.02;
        if (bgMusic.volume <= 0) {
            bgMusic.pause();
            bgMusic.currentTime = 0;
            clearInterval(fade);
        }
    }, 80);
}

function stopMusic() {
    if (!bgMusic) return;
    bgMusic.pause();
    bgMusic.currentTime = 0;
}

/* ==========================================================
   START MUSEUM
========================================================== */

function startMuseum() {
    musicSection.classList.add("hidden");
    miniPlayer.classList.remove("hidden");
    miniPlayer.classList.add("show");
    museumLabel.classList.remove("hidden");
    museumLabel.classList.add("show");
    progressWrap.classList.add("show");
    startMuseumIntro();
}

/* ==========================================================
   PLAY BUTTON
========================================================== */

function handlePlayButton() {
    if (musicStarted) return;
    musicStarted = true;
    playButton.disabled = true;
    playButton.textContent = "♪ Sedang Diputar";
    playMusic();
    musicSection.classList.add("shrink");
    setTimeout(() => startMuseum(), 900);
}

playButton?.addEventListener("click", handlePlayButton);

/* ==========================================================
   MINI PLAYER — pause/play + disc animation
========================================================== */

const disc = miniPlayer?.querySelector(".disc");

miniPlayer?.addEventListener("click", () => {
    if (!bgMusic) return;
    if (bgMusic.paused) {
        bgMusic.play();
        disc?.classList.remove("paused");
    } else {
        bgMusic.pause();
        disc?.classList.add("paused");
    }
});

/* ==========================================================
   WINDOW FOCUS / BLUR
========================================================== */

window.addEventListener("focus", () => {
    if (bgMusic && !bgMusic.paused) bgMusic.volume = 0.45;
});

window.addEventListener("blur", () => {
    if (bgMusic && !bgMusic.paused) bgMusic.volume = 0.18;
});

/* ==========================================================
   MUSEUM ENGINE
========================================================== */

function showMuseum() {
    favoriteSection.classList.remove("hidden");
    requestAnimationFrame(() => favoriteSection.classList.add("show"));
    exhibitIndex = 0;
    loadExhibit();
}

function loadExhibit() {
    clearTimeout(exhibitTimer);

    if (exhibitIndex >= exhibits.length) {
        exitCard(() => {
            favoriteSection.classList.add("hidden");
            progressWrap.classList.remove("show");
            resetProgress();
            showReflection();
        });
        return;
    }

    const item = exhibits[exhibitIndex];

    /* flip number */
    favoriteNumber.classList.remove("flip");
    void favoriteNumber.offsetWidth;
    favoriteNumber.textContent = item.number;
    favoriteNumber.classList.add("flip");

    museumCounter.textContent       = item.number;
    favoriteTitle.textContent       = item.title;
    favoriteSubtitle.textContent    = item.subtitle;
    favoriteDescription.textContent = item.description;

    /* slide in from right */
    favoriteCard.classList.remove("show", "hide", "exit-to-left", "enter-from-right");
    favoriteCard.classList.add("enter-from-right");

    favoriteImage.onload = () => {
        requestAnimationFrame(() => {
            favoriteCard.classList.remove("enter-from-right");
            favoriteCard.classList.add("show");
        });
    };

    favoriteImage.onerror = () => {
        requestAnimationFrame(() => {
            favoriteCard.classList.remove("enter-from-right");
            favoriteCard.classList.add("show");
        });
    };

    favoriteImage.src = item.image;
    favoriteImage.alt = item.title;

    activateScene(item.effect);
    startProgress(timing.exhibit);

    exhibitTimer = setTimeout(() => nextExhibit(), timing.exhibit);
}

function exitCard(callback) {
    clearTimeout(exhibitTimer);
    resetProgress();
    favoriteCard.classList.remove("show");
    favoriteCard.classList.add("exit-to-left");
    setTimeout(() => callback(), 500);
}

function nextExhibit() {
    exitCard(() => {
        exhibitIndex++;
        loadExhibit();
    });
}

/* click / space to skip */
favoriteCard?.addEventListener("click", () => nextExhibit());

document.addEventListener("keydown", (e) => {
    if (favoriteSection.classList.contains("hidden")) return;
    if (e.code === "Space") {
        e.preventDefault();
        nextExhibit();
    }
});

/* ==========================================================
   SCENE ENGINE
========================================================== */

function activateScene(effect) {
    resetScene();
    switch (effect) {
        case "music":     createMusicNotes(); break;
        case "flower":    createPetals();     break;
        case "sunset":    sceneLayer.classList.add("sunset");    break;
        case "paint":     sceneLayer.classList.add("paint");     break;
        case "cat":       sceneLayer.classList.add("cat");       break;
        case "spotlight": sceneLayer.classList.add("spotlight"); break;
    }
}

function resetScene() {
    sceneLayer.className = "scene-layer";
    document.querySelectorAll(".music-note,.petal").forEach(el => el.remove());
}

function createMusicNotes() {
    sceneLayer.classList.add("music");
    const symbols = ["♪", "♫", "♬"];
    for (let i = 0; i < 12; i++) {
        const note = document.createElement("div");
        note.className = "music-note";
        note.textContent = symbols[Math.floor(Math.random() * 3)];
        note.style.left           = (15 + Math.random() * 70) + "%";
        note.style.bottom         = (5  + Math.random() * 20) + "%";
        note.style.animationDelay = (Math.random() * 2) + "s";
        sceneLayer.appendChild(note);
    }
}

function createPetals() {
    sceneLayer.classList.add("flower");
    for (let i = 0; i < 18; i++) {
        const petal = document.createElement("div");
        petal.className = "petal";
        petal.innerHTML = "❀";
        petal.style.left              = Math.random() * 100 + "vw";
        petal.style.top               = "-40px";
        petal.style.fontSize          = (18 + Math.random() * 16) + "px";
        petal.style.animationDuration = (6  + Math.random() * 4) + "s";
        petal.style.animationDelay    = (Math.random() * 2) + "s";
        sceneLayer.appendChild(petal);
    }
}

document.addEventListener("visibilitychange", () => {
    if (document.hidden) resetScene();
});

window.addEventListener("resize", () => {
    if (exhibitIndex >= 0 && exhibitIndex < exhibits.length) {
        activateScene(exhibits[exhibitIndex].effect);
    }
});

/* ==========================================================
   REFLECTION ENGINE
========================================================== */

function showReflection() {
    reflectionSection.classList.remove("hidden");
    reflectionIndex = 0;
    playReflection();
}

function playReflection() {
    if (reflectionIndex >= reflections.length) {
        setTimeout(showEnding, 800);
        return;
    }

    reflectionText.classList.remove("show", "fadeIn");

    setTimeout(() => {
        reflectionText.innerHTML = reflections[reflectionIndex];
        reflectionText.classList.add("show", "fadeIn");
        reflectionIndex++;
        setTimeout(playReflection, 2500);
    }, 300);
}

/* ==========================================================
   ENDING — dengan nama + typewriter pada tombol
========================================================== */

function showEnding() {
    reflectionSection.classList.add("hidden");
    endingSection.classList.remove("hidden");

    endingTitle.innerHTML = `Dan mungkin, ${recipientName}...`;

    endingDescription.innerHTML = `
        Aku memang tidak bisa mengingat semua percakapan kita.

        <br><br>

        Tapi anehnya...
        aku justru mengingat hal-hal kecil yang kamu sukai.

        <br><br>

        Lagu favoritmu. Banana Milk. Tiramisu. Senja. Bunga.
        Bahkan jawaban <b>"I don't know yet."</b>
        masih berhasil membuatku tersenyum setiap kali mengingatnya.

        <br><br>

        Mungkin...
        memang begitulah cara seseorang tinggal di hati orang lain.
    `;

    endingTitle.classList.add("showEnding");

    setTimeout(() => endingDescription.classList.add("showEnding"), 500);

    /* tombol muncul dengan efek typewriter */
    setTimeout(() => typewriterButton(nextChapter, "Lanjut ke Chapter V →"), 1200);
}

function typewriterButton(el, text) {
    el.style.opacity = "1";
    el.textContent   = "";
    el.classList.add("showEnding");

    let i = 0;
    const t = setInterval(() => {
        el.textContent += text.charAt(i);
        i++;
        if (i >= text.length) clearInterval(t);
    }, 45);
}

/* ==========================================================
   NEXT CHAPTER
========================================================== */

function goNext() {
    stopMusic();
    document.body.classList.add("chapterFade");
    setTimeout(() => {
        window.location.href = "../chapter5/index.html";
    }, 1000);
}

nextChapter?.addEventListener("click", goNext);

/* ==========================================================
   PRELOAD IMAGES
========================================================== */

function preloadImages() {
    exhibits.forEach(exhibit => {
        const img = new Image();
        img.src = exhibit.image;
    });
}

/* ==========================================================
   IMAGE DRAG DISABLE
========================================================== */

document.querySelectorAll("img").forEach(img => {
    img.draggable = false;
});

/* ==========================================================
   INITIALIZE
========================================================== */

document.addEventListener("DOMContentLoaded", () => {
    preloadImages();
    playIntro();
});