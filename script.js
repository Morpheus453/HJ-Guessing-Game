const date = new Date();
const episodes = [
   "(S2) Ep. 87 - Blue-on-Blue", "(S2) Ep. 86 - A Sharp Game", "(S2) Ep. 85 - The New Opponent", "(S2) Ep. 84 - King Piece", "(S2) Ep. 83 - Deserve No Mercy", "(S2) Ep. 82 - Team Sports", "(S2) Ep. 81 - Beast Hunting", "(S2) Ep. 80 - Crow, Heron, Wolf", "(S2) Ep. 79 - Stress Fractures", "(S2) Ep. 78 - Why Her?", "(S2) Ep. 77 - Bloodlust", "(S2) Ep. 76 - The Level Tens", "(S2) Ep. 75 - Gates of Horn and Ivory", "(S2) Ep. 74 - The Better Sister", "(S2) Ep. 73 - The Girl and the Devil", "(S2) Ep. 72 - Blood Covenant", "(S2) Ep. 71 - Unsettled Debts", "(S2) Ep. 70 - The Trump Card", "(S2) Ep. 69 - A Real Monster", "(S2) Ep. 68 - No Holding Back", "(S2) Ep. 67 - Dead Man Walking", "(S2) Ep. 66 - Cage Fight", "(S2) Ep. 65 - Mind Over Matter", "(S2) Ep. 64 - Cheese in a Trap", "(S2) Ep. 63 - End of the Tunnel", "(S2) Ep. 62 - Sayeon's Idea of Friendship", "(S2) Ep. 61 - Battle of Egos", "(S2) Ep. 60 - An Eye for Talent", "(S2) Ep. 59 - Cell Five", "(S2) Ep. 58 - Old Dogs", "(S2) Ep. 57 - Trust In Me", "(S2) Ep. 56 - Red and White", "(S2) Ep. 55 - Traitor, Traitor", "(S2) Ep. 54 - Season 2 Premiere", "Ep. 53 - Unmaker (Season Finale)", "Ep. 52 - Sacrifices", "Ep. 51 - Aberrants", "Ep. 50 - Godlings", "Ep. 49 - Cell 4's Day Off", "Ep. 48 - A Cadmean Victory", "Ep. 47 - Chesspieces", "Ep. 46 - Chance Encounter", "Ep. 45 - Wolf in Sheep's Clothing", "Ep. 44 - Freak", "Ep. 43 - A Perfect Lie", "Ep. 42 - Cross to Bear", "Ep. 41 - We're Just No Threat", "Special Episode - Character QnA", "Ep. 40 - Wishing Well", "Ep. 39 - The Final Round (5)", "Ep. 38 - The Final Round (4)", "Ep. 37 - The Final Round (3)", "Ep. 36 - The Final Round (2)", "Ep. 35 - The Final Round", "Ep. 34 - Round Two (3)", "Ep. 33 - Round Two (2)", "Ep. 32 - Round Two", "Ep. 31 - Round One (2)", "Ep. 30 - Round One", "Ep. 29 - Bootlicker", "Ep. 28 - Capture the Flag", "Ep. 27 - The Absolute Worst", "Ep. 26 - Common Ancestor", "Ep. 25 - The Crimson Society", "Ep. 24 - Welcome to the Underside", "Ep. 23 - Play Dirty", "Ep. 22 - Fight Club", "Ep. 21 - Punch Me", "Ep. 20 - Lost Time", "Ep. 19 - I, Chronos", "Ep. 18 - Home Invasion", "Ep. 17 - Revenge Story", "Ep. 16 - Unforgivable!", "Ep. 15 - The Butchered", "Ep. 14 - Don't Look Down", "Ep. 13 - The Butcher", "Ep. 12 - Bad Vibes", "Ep. 11 - No-Kill Rule", "Ep. 10 - Rapture", "Ep. 9 - Suiting Up", "Ep. 8 - Red Letter", "Ep. 7 - The Fourth Cell", "Ep. 6 - The Instructor", "Ep. 5 - New Horizons", "Ep. 4 - Flying the Nest", "Ep. 3 - Final Test", "Ep. 2 - Yellow Ties", "Ep. 1 - Beginning of the End"
]
const lengths = [141, 77, 91, 106, 114, 80, 73, 12, 93, 66, 55, 53, 59, 58, 87, 60, 71, 56, 0, 0, 89, 17, 62, 52, 51, 52, 53,60, 46, 42, 57, 69, 58, 52, 50, 47, 73, 61, 50, 50, 22, 81, 74, 79, 71, 51, 58, 59, 52, 52, 66, 51, 60, 109, 72, 52, 43, 61, 49, 43, 44, 53, 54, 42, 58, 43, 48, 53, 46, 56, 70, 55, 48, 46, 37, 57, 43, 39, 43, 56, 67, 45, 49, 64, 40, 41, 32, ]

// Set the time to midnight on the current day
date.setHours(0, 0, 0, 0);

/**
 * A basic seeded random number generator that uses the timestamp for the current day as the seed.
 */

var seed = date.getTime();

function seeded_random_number() {
    seed = (((1664525 * seed) + 1013904223) % 4294967296);
    return seed;
}

/**
 * Loading the panel images into the game
 */

const episode = seeded_random_number() % episodes.length;
const number_of_panels = lengths[episode];
const panels = [];

const panelImg = document.getElementById("panel-img");
const panelNumber = document.getElementById("panel-number");
var currentPanel = 0;
var guessesRemaining = 3;
var alreadyGuessed = false;

document.getElementById("chapter").innerText = episodes[episodes.length-1 - episode];

if (localStorage.getItem("solved-at") == date.toDateString()) {
    console.log("?");
    gameOver();

    document.getElementById("episode-select").value = episode;

    alreadyGuessed = true;

    console.log(document.getElementById("episode-select").value);

    let results = localStorage.getItem("guessDist");

    if (results == null) {
        results = [0,0,0];
    } else {
        results = results.split(",").map(v => parseInt(v));
    }

    let bars = document.getElementsByClassName("bar");

    let sum = results[0] + results[1] + results[2];

    for (let i = 0; i < bars.length; i++) {
        bars[i].innerText = results[i];
        bars[i].style.width = (100*results[i] / (sum == 0 ? 1 : sum)) + "%";
    }

    if (localStorage.getItem("result") == "0") {
        document.getElementById("res").innerText = "Better luck next time..."
    } else if (localStorage.getItem("result") == "1") {
        document.getElementById("res").innerText = "You got it!";
    }
}

for (let i = 0; i < 5; i++) {
    let number = seeded_random_number() % number_of_panels;

    console.log(episode);

    while (panels.includes(number)) {
        number = (number+1) % number_of_panels;
    }

    panels.push(number);
}

for (let i = 0; i < episodes.length; i++) {
    document.getElementById("episode-select").insertAdjacentHTML("beforeend", `<option value=${i}>${episodes[episodes.length-1 - i]}</option>`)
}

panelImg.src = `./panels/chapter_${episode+1}/split_${panels[0]+1}.webp`;

function gameOver() {
    document.getElementById("episode-select").classList.add("no-input");
    document.getElementById("submit").innerText = "View results";
}

function toggleResults() {
    document.getElementById("result").classList.toggle("visible")
}

document.getElementById("left-button").addEventListener("click", e => {

    if (currentPanel > 0) {
        currentPanel--;
        panelNumber.innerText = currentPanel+1;
        panelImg.src = `./panels/chapter_${episode+1}/split_${panels[currentPanel]+1}.webp`;
    }

})

document.getElementById("panel-img").addEventListener("click", e => {
    document.getElementById("magnified-img").src = document.getElementById("panel-img").src;
    document.getElementById("magnified").style.display = "block";
});

document.getElementById("magnified-back").addEventListener("click", e => {
    document.getElementById("magnified").style.display = "none";
})

document.getElementById("right-button").addEventListener("click", e => {

    if (currentPanel < panels.length-1) {
        currentPanel++;
        panelNumber.innerText = currentPanel+1;
        panelImg.src = `./panels/chapter_${episode+1}/split_${panels[currentPanel]+1}.webp`;
    }

})

document.getElementById("submit").addEventListener("click", e => {
    if (guessesRemaining == 0 || alreadyGuessed) {
        toggleResults();
        return;
    }

    let guess = parseInt(document.getElementById("episode-select").value);


    if (guess == episode) {
        toggleResults();
        alreadyGuessed = true;
        confetti();

        let results = localStorage.getItem("guessDist");

        if (results == null) {
            results = [0,0,0];
        } else {
            results = results.split(",").map(v => parseInt(v));
        }

        let guessNum = 3 - guessesRemaining;

        let sum = results[0] + results[1] + results[2];

        results[guessNum] = results[guessNum] + 1;

        let bars = document.getElementsByClassName("bar");

        bars[guessNum].classList.add("current-bar");

        for (let i = 0; i < bars.length; i++) {
            bars[i].innerText = results[i];
            bars[i].style.width = (100*results[i] / (sum == 0 ? 1 : sum)) + "%";
        }

        localStorage.setItem("guessDist", results);
        localStorage.setItem("result", 1);
        localStorage.setItem("solved-at", date.toDateString());

        gameOver();
    } else {
        guessesRemaining--;
        document.getElementById("guesses").innerText = `Guesses remaining: ${guessesRemaining}`;

        if (guessesRemaining == 0) {
            toggleResults();
            document.getElementById("res").innerText = "Better luck next time..."

            let results = localStorage.getItem("guessDist");

            if (results == null) {
                results = [0,0,0];
            } else {
                results = results.split(",").map(v => parseInt(v));
            }

            let bars = document.getElementsByClassName("bar");

            let sum = results[0] + results[1] + results[2];

            for (let i = 0; i < bars.length; i++) {
                bars[i].innerText = results[i];
                bars[i].style.width = (100*results[i] / (sum == 0 ? 1 : sum)) + "%";
            }

            localStorage.setItem("result", 1);
            localStorage.setItem("solved-at", date.toDateString());

            gameOver();
        }
    }
})

document.getElementById("back-img").addEventListener("click", e => {
    toggleResults();
})