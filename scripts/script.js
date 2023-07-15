function giveUp() {
    document.getElementById("game-figure").innerHTML = "Game over. The answer was XXX";   
};

function startGame() {
    document.getElementById("welcome").style.cssText = "display: none";
    document.getElementById("main-game").style.cssText = "display: grid";
};

function addMistake(letter) {
    const para = document.createElement("li");
    const node = document.createTextNode(letter); // wrong letter to add
    para.appendChild(node);
    document.getElementById("game-info").appendChild(para);
};

function getInput() {
    var wordInstance = wordGenerator();
    constructAnswer(wordInstance);
    document.addEventListener('keydown', (event) => {
        var name = event.key.toString().toLowerCase();
        var abc = ["a", "b", "c", "d", "e,", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
        if (wordInstance.includes(name)) {
            alert("letter correct")
        } else if (abc.includes(name)) {
            addMistake(name);
            document.getElementById("game-figure").innerHTML++;
            if (document.getElementById("game-figure").innerHTML == 7) {
                document.getElementById("game-figure").innerHTML = "Game Over. You lost."
            };
        }
      }, false);
}

function wordGenerator() {
    var possibleWords = ["abril", "amor", "esperanza", "futuro", "sonrisa", "felicidad"];
    var choice = possibleWords[Math.floor(Math.random() * possibleWords.length)]
    return choice
}

function constructAnswer(word) {
    document.getElementById("game-attempts").innerHTML = "_ ".repeat(word.length);
}
