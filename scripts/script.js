function selectGame() {
    /** Options before playing */
    document.getElementById("main-logo").style.cssText = "display: none";
    document.getElementById("main-welcome").style.cssText = "display: none";
    document.getElementById("main-menu").style.cssText = "display: grid; margin-top: 10%";
}

function chooseGameQuick() {
    /** Highlights the "Quick game" option */
    document.getElementById("menu-custom").style.cssText = "background-color: rgb(200, 20, 100); border: none";
    document.getElementById("menu-quick").style.cssText = "background-color: rgb(241, 65, 145); border-bottom: solid 2px white";
    document.getElementById("custom-options").style.cssText = "display: none";
    
}

function chooseGameCustom() {
    /** Highlights the "Custom game" option */
    document.getElementById("menu-quick").style.cssText = "background-color: rgb(200, 20, 100); border: none";
    document.getElementById("menu-custom").style.cssText = "background-color: rgb(241, 65, 145); border-bottom: solid 2px white";
    document.getElementById("custom-options").style.cssText = "display: block";
}

function startGame() {
    /** Prepares the game after clicking on "Start" */
    document.getElementById("main-language").style.cssText = "display: none";
    document.getElementById("main-menu").style.cssText = "display: none";
    document.getElementById("main-game").style.cssText = "display: grid";
    document.getElementById("the-body").style.cssText = "background-image: url(../images/city-skyline.png); background-repeat: repeat-x; background-position: center top;";
    getInput();
};

function getInput() {
    /** Starts up the game */
    document.getElementById("game-hint").style.cssText = "display: block";
    document.getElementById("game-giveup").style.cssText = "display: block";
    document.getElementById("game-replay").style.cssText = "display: none";

    // Generating word to guess
    document.getElementById("game-header-status").innerHTML = "";
    word_to_guess = wordGenerator();
    raw_answer = Array(word_to_guess.length).fill("_");
    displayAnswer(raw_answer);

    // Setting up the score
    score = document.getElementById("game-figure");
    score.innerHTML = 0;
    
    wrongs = []; // List of incorrect guesses
    document.getElementById("game-wrongs").innerHTML = ""; // Resets list of incorrect guesses

    document.addEventListener('keydown', mainProcess, false);
    document.getElementById("game-giveup").addEventListener("click", gameOver)
}

function mainProcess() {
    /** Records key stroke, verifies if it's a correct guess */
    var name = event.key.toString().toLowerCase();
    var abc = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
    // Making a correct guess
    if (word_to_guess.includes(name)) {
        for (i = 0; i<word_to_guess.length; i++) {
            if (word_to_guess[i] == name) { // Guessing a letter
                raw_answer[i] = name;
            }
        };
        displayAnswer(raw_answer);
        // Winning the game
        if (raw_answer.join("") == word_to_guess) {
            document.getElementById("game-points").innerHTML ++;
            gameOver();
            document.getElementById("game-header-status").innerHTML = "You won!";
        }
    // Making an incorrect guess    
    } else if (abc.includes(name) && !(wrongs.includes(name))) {
        wrongs.push(name);
        addMistake(wrongs);
        score.innerHTML++;
        if (score.innerHTML == 7) {
            gameOver();
        };
    // Reusing letters
    } else if (wrongs.includes(name)) {
        document.getElementById("game-header-status").innerHTML = "Try another letter!"
    // Invalid input
    } else {
        document.getElementById("game-header-status").innerHTML = "Only letters, please!"
    }    
}

function addMistake(list) {
    /** Adds incorrect guesses into a list */
    document.getElementById("game-wrongs").innerHTML = list.join();
};

function wordGenerator() {
    /** Generates the word to be guessed */
    var possibleWords = ["abril", "amor", "esperanza", "futuro", "sonrisa", "felicidad"];
    var choice = possibleWords[Math.floor(Math.random() * possibleWords.length)]
    return choice
}

function displayAnswer(word) {
    /** Displays the current state of the answer and updates it every time a letter is guessed correctly */
    document.getElementById("game-attempts").innerHTML = word.join(" ")
}

function gameOver() {
    /** Reveals correct answer, gives option of playing again */
    document.getElementById("game-hint").style.cssText = "display: none";
    document.getElementById("game-giveup").style.cssText = "display: none";
    document.getElementById("game-replay").style.cssText = "display: block";
    document.getElementById("game-header-status").innerHTML = `Game over. The answer was ${word_to_guess}`;
    document.getElementById("game-figure").innerHTML = "x";
    // Resetting the event listener for key strokes
    document.removeEventListener('keydown', mainProcess);
    document.getElementById("game-replay").addEventListener("click", getInput);
};