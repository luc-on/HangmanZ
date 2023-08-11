function selectGame() {
    /** Options before playing */
    document.getElementById("main-logo").style.cssText = "display: none";
    document.getElementById("main-welcome").style.cssText = "display: none";
    document.getElementById("main-menu").style.cssText = "display: grid; margin-top: 10%";
    document.getElementById("main-lost").style.cssText = "display: none";
    document.getElementById("main-game").style.cssText = "display: none";
    document.getElementById("game-back").style.cssText = "display: none";
}

function chooseGameQuick() {
    /** Highlights the "Quick game" option */
    document.getElementById("menu-custom").style.cssText = "background-color: rgb(200, 20, 100); border: none";
    document.getElementById("menu-quick").style.cssText = "background-color: rgb(241, 65, 145); border-radius: 5px;";
    document.getElementById("custom-options").style.cssText = "display: none";
    
}

function chooseGameCustom() {
    /** Highlights the "Custom game" option */
    document.getElementById("menu-quick").style.cssText = "background-color: rgb(200, 20, 100); border: none";
    document.getElementById("menu-custom").style.cssText = "background-color: rgb(241, 65, 145); border-radius: 5px;";
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
    document.getElementById("game-back").style.cssText = "display: none";

    // Generating word to guess
    document.getElementById("game-info-status").innerHTML = "";
    word_to_guess = wordGenerator();
    raw_answer = Array(word_to_guess.length).fill("_");
    displayAnswer(raw_answer);

    // Setting up the score
    score = 0;
    figureUpdater(score);
    
    // Resetting info
    wrongs = []; // List of incorrect guesses
    document.getElementById("game-info-wrongs-list").innerHTML = "";
    document.getElementById("game-info-wrongs-message").innerHTML = "Wrong guesses: ";
    document.getElementById("game-info-attempts-amount").innerHTML = "6";
    document.getElementById("game-info-hints-amount").innerHTML = "0";

    if (document.getElementById("game-lives").innerHTML == 0){
        gameLost();
    } // In case one loses all of their lives by giving up

    document.addEventListener('keydown', mainProcess, false);
    document.getElementById("game-giveup").addEventListener("click", gameOver)
    document.getElementById("game-hint").addEventListener("click", hint)
}

function mainProcess() {
    /** Records key stroke, verifies if it's a correct guess */
    var name = event.key.toString().toLowerCase();
    var abc = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
    // If no lives left
    if (document.getElementById("game-lives").innerHTML == 0){
        gameLost();
    // Making a correct guess
    } else if (word_to_guess.includes(name)) {
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
            document.getElementById("game-info-status").innerHTML = "You won!";
        }
    // Making an incorrect guess    
    } else if (abc.includes(name) && !(wrongs.includes(name))) {
        wrongs.push(name);
        addMistake(wrongs);
        score++;
        document.getElementById("game-info-wrongs-message").innerHTML = `Wrong guesses: ${wrongs.length}`
        document.getElementById("game-info-attempts-amount").innerHTML = `${6-score}`
        figureUpdater(score);
        // Losing the game
        if (score == 6) {
            gameOver();
        };
    // Reusing letters
    } else if (wrongs.includes(name)) {
        document.getElementById("game-info-status").innerHTML = "Try another letter!"
    // Invalid input
    } else {
        document.getElementById("game-info-status").innerHTML = "Only letters, please!"
    }    
}

function figureUpdater(number) {
    let figure = document.getElementById("game-figure")
    switch (number) {
        case 0:
            document.getElementById("game-figure-head").style.cssText = "background-color: black; color: black;";
            document.getElementById("game-figure-torso").style.cssText = "background-color: black; color: black;";
            document.getElementById("game-figure-leftarm").style.cssText = "background-color: black; color: black;";
            document.getElementById("game-figure-rightarm").style.cssText = "background-color: black; color: black;";
            document.getElementById("game-figure-leftleg").style.cssText = "background-color: black; color: black;";
            document.getElementById("game-figure-rightleg").style.cssText = "background-color: black; color: black;";
            break;
        case 1:
            document.getElementById("game-figure-head").style.cssText = "background-color: white; color: white;";
            break;
        case 2:
            document.getElementById("game-figure-torso").style.cssText = "background-color: white; color: white;";
            break;
        case 3:
            document.getElementById("game-figure-leftarm").style.cssText = "background-color: white; color: white;";
            break;
        case 4:
            document.getElementById("game-figure-rightarm").style.cssText = "background-color: white; color: white;";
            break;
        case 5:
            document.getElementById("game-figure-leftleg").style.cssText = "background-color: white; color: white;";
            break;
        case 6:
            document.getElementById("game-figure-rightleg").style.cssText = "background-color: white; color: white;";
            break;
    }
}

function addMistake(list) {
    /** Adds incorrect guesses into a list */
    document.getElementById("game-info-wrongs-list").innerHTML = list.join();
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
    /** Reveals correct answer, gives option of playing again, player may lose a life*/
    document.getElementById("game-hint").style.cssText = "display: none";
    document.getElementById("game-giveup").style.cssText = "display: none";
    document.getElementById("game-replay").style.cssText = "display: block";
    document.getElementById("game-back").style.cssText = "display: block";
    document.getElementById("game-info-status").innerHTML = `Game over. The answer was "${word_to_guess}"`;
    
    // Losing one life if one of these conditions is met
    condition1 = score!=0
    // So that the player can give up and not lose any lives if no guesses were made (and no hints were given!)
    condition2 = document.getElementById("game-info-hints-amount").innerHTML != "0" 
    condition3 = raw_answer.join("") != word_to_guess
    if ((condition1 && condition3) || ((!condition1)&&condition2)) {
        document.getElementById("game-lives").innerHTML--;
    }

    score = 0;
    
    // Resetting the event listener for key strokes
    document.removeEventListener('keydown', mainProcess);
    document.getElementById("game-replay").addEventListener("click", getInput);
    document.getElementById("game-back").addEventListener("click", selectGame);
};

function gameLost() {
    document.removeEventListener('keydown', mainProcess);
    document.getElementById("game-lives").innerHTML = 3;
    document.getElementById("main-game").style.cssText = "display: none";
    document.getElementById("main-lost").style.cssText = "display: block";
    document.getElementById("main-welcome").style.cssText = "display: block";   
}

function hint() {
    //* Gives a hint to the player by revealing the first letter*/
    let hint_index = randomNumber(0,word_to_guess.length-1);
    // Making sure that the hint is valid and doesn't coincide with an already-guessed letter
    while (raw_answer[hint_index] != "_") {
        hint_index = randomNumber(0,word_to_guess.length-1)
    }
    // After a letter is revealed, if the word to guess has more occurences of such letter, then those will also be shown
    for (i=0; i<word_to_guess.length; i++) {
        if (word_to_guess[i]==word_to_guess[hint_index]) {
            raw_answer[i] = word_to_guess[hint_index];
        }
    }
    displayAnswer(raw_answer);
    document.getElementById("game-points").innerHTML--; // Subtracting one point every time the "hint" button is used
    document.getElementById("game-info-hints-amount").innerHTML++;
    // If hint makes you win the game
    if (raw_answer.join("") == word_to_guess) {
        document.getElementById("game-points").innerHTML ++;
        gameOver();
        document.getElementById("game-info-status").innerHTML = "You won!";
    };
}

function randomNumber(min, max) {
    //* Auxiliary function to generate a random number in between min and max (inclusive) */
    return Math.floor(Math.random() * (max-min+1))+min;
}