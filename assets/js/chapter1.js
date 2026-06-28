/* =========================
   Intro Lines
========================= */
const lines = [
    "Setiap orang...",
    "memiliki cerita.",
    "Dan setiap cerita...",
    "selalu memiliki seseorang.",
    "Hari ini...",
    "aku ingin mengajakmu melihat sebuah cerita."
];

const text = document.getElementById("text");
const finalSection = document.getElementById("final");

let currentIndex = 0;

/* =========================
   Text Sequence
========================= */
function showNextLine() {
    if (currentIndex >= lines.length) {
        text.style.display = "none";

        finalSection.classList.remove("hide");
        finalSection.style.opacity = "1";
        finalSection.style.transform = "translateY(0)";

        return;
    }

    text.textContent = lines[currentIndex];
    text.classList.add("show");

    setTimeout(() => {
        text.classList.remove("show");
        currentIndex++;

        setTimeout(showNextLine, 800);
    }, 2200);
}

/* =========================
   Start Intro
========================= */
setTimeout(showNextLine, 1200);

/* =========================
   Falling Petals
========================= */
setInterval(() => {
    const petal = document.createElement("div");

    petal.className = "petal";
    petal.textContent = Math.random() > 0.5 ? "🌸" : "❀";

    petal.style.left = `${Math.random() * 100}vw`;
    petal.style.animationDuration =
        `${8 + Math.random() * 6}s`;

    document.body.appendChild(petal);

    setTimeout(() => {
        petal.remove();
    }, 15000);
}, 600);