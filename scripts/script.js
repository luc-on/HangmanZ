function startGame() {
    // Prepares the game after clicking on "Play"
    document.getElementById("main-language").style.cssText = "display: none";
    document.getElementById("main-logo").style.cssText = "display: none";
    document.getElementById("main-welcome").style.cssText = "display: none";
    document.getElementById("main-game").style.cssText = "display: grid";
    getInput();
};

function getInput() {
    // Starts up the game
    word_to_guess = wordGenerator();
    var raw_answer = Array(word_to_guess.length).fill("_");
    displayAnswer(raw_answer);
    var score = document.getElementById("game-figure");
    var wrongs = [];
    document.addEventListener('keydown', function(event) {
        var name = event.key.toString().toLowerCase();
        var abc = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
        if (word_to_guess.includes(name)) {
            for (i = 0; i<word_to_guess.length; i++) {
                if (word_to_guess[i] == name) {
                    raw_answer[i] = name;
                }
            };
            displayAnswer(raw_answer);
            if (raw_answer.join("") == word_to_guess) {
                document.getElementById("game-header-status").innerHTML = "You won!";
                terminateEvent();
            }
        } else if (abc.includes(name) && !(wrongs.includes(name))) {
            wrongs.push(name);
            addMistake(wrongs);
            score.innerHTML++;
            if (score.innerHTML == 7) {
                gameOver();
            };
        } else if (wrongs.includes(name)) {
            document.getElementById("game-header-status").innerHTML = "Try another letter!"
        } else {
            document.getElementById("game-header-status").innerHTML = "Only letters, please!"
        }    
    }, false);
    document.getElementById("game-giveup").addEventListener("click", gameOver)
    // removeEventListener
}

function addMistake(list) {
    // Adds incorrect guesses into a list
    document.getElementById("game-wrongs").innerHTML = list.join();
};

function wordGenerator() {
    // Generates the word to be guessed
    var possibleWords = ["abril", "amor", "esperanza", "futuro", "sonrisa", "felicidad"];
    var choice = possibleWords[Math.floor(Math.random() * possibleWords.length)]
    return choice
}

function displayAnswer(word) {
    // Displays the current state of the answer and updates it every time a letter is guessed correctly
    document.getElementById("game-attempts").innerHTML = word.join(" ")
}

function gameOver() {
    // Reveals correct answer
    document.getElementById("game-header-status").innerHTML = `Game over. The answer was ${word_to_guess}`;
    document.getElementById("game-figure").innerHTML = "x";
};