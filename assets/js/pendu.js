/*global log, byId, select, selectAll, app*/
var pendu = (function pendu() {
    "use strict";
    var init,
        observer,
        keysEvent,
        createLetterCase,
        html,
        listWord,
        wordSelected,
        addLetter,
        errorKeys,
        checkGame,
        endGame,
        motifEndGame,
        restartGame,
        nbGame = 0;

    init = function init() {
        listWord = [
            'rouge',
            'bleu',
            'vert',
            'jaune',
            'violet',
            'orange',
            'gris'
        ];

        html = {};
        html.keys = selectAll('.keys');
        html.letterCase = select('.letter-case');
        html.perso = selectAll('.perso');
        wordSelected = listWord[Math.floor(Math.random() * listWord.length)];
        createLetterCase(wordSelected);
        endGame = false;
        html.endGame = byId('endGame');
        html.btnRestart = select('#endGame button');
        observer();
    };

    createLetterCase = function createLetterCase(str) {
        var i;
        for (i = 0; i < str.length; i += 1) {
            html.letterCase.innerHTML += '<div class="letters"></div>';
        }
    };

    addLetter = function addLetter(source) {
        var i;
        if (nbGame === 0) {
            for (i = 0; i < wordSelected.length; i += 1) {
                if (wordSelected[i] === source.innerText.toLowerCase()) {
                    html.letterCase.childNodes[i + 1].innerText = source.innerText.toLowerCase();
                }
            }
        } else if (nbGame > 0) {
            for (i = 0; i < wordSelected.length; i += 1) {
                if (wordSelected[i] === source.innerText.toLowerCase()) {
                    html.letterCase.childNodes[i].innerText = source.innerText.toLowerCase();
                }
            }
        }
    };

    errorKeys = function errorKeys() {
        var i;
        for (i = 0; i < html.perso.length; i += 1) {
            if (html.perso[i].classList.contains('is_hidden')) {
                html.perso[i].classList.remove('is_hidden');
                break;
            }
        }

    };

    checkGame = function checkGame() {
        var i,
            j,
            count = 0;
        for (i = 0; i < html.perso.length; i += 1) {
            if (!html.perso[i].classList.contains('is_hidden')) {
                endGame = true;
                motifEndGame = 'fail';
            } else {
                endGame = false;
            }
        }
        if (endGame === false) {
            for (j = 1; j < html.letterCase.childNodes.length; j += 1) {
                if (html.letterCase.childNodes[j].innerText !== '') {
                    count += 1;
                }
            }
            if (count === (html.letterCase.childNodes.length - 1)) {
                endGame = true;
                motifEndGame = 'success';
                app.client.life += 1;
                app.refreshLifeZone();
            } else {
                endGame = false;
            }
        }
    };

    restartGame = function restartGame() {
        var i;
        wordSelected = listWord[Math.floor(Math.random() * listWord.length)];
        html.letterCase.innerHTML = '';
        createLetterCase(wordSelected);
        for (i = 0; i < html.perso.length; i += 1) {
            if (html.perso[i].classList.contains('perso')) {
                html.perso[i].classList.add('is_hidden');
            }
        }
        for (i = 0; i < html.keys.length; i += 1) {
            if (html.keys[i].classList.contains('failed')) {
                html.keys[i].classList.remove('failed');
            } else if (html.keys[i].classList.contains('success')) {
                html.keys[i].classList.remove('success');
            }
        }
        html.endGame.childNodes[1].innerText = '';
        html.endGame.classList.add('is_hidden');
        endGame = false;
        nbGame += 1;
    };

    keysEvent = function keysEvent(evt) {
        var source = evt.target || evt.srcElement,
            i;

        if (endGame === false) {
            if (wordSelected.search(source.innerText.toLowerCase()) !== -1) {
                if (!!source.classList.contains('failed') || !source.classList.contains('success')) {
                    source.classList.toggle('success');
                    addLetter(source);
                }
            } else {
                if (!source.classList.contains('failed') || !!source.classList.contains('success')) {
                    source.classList.toggle('failed');
                    errorKeys();
                }
            }
            checkGame();
            if (endGame) {
                if (motifEndGame === 'fail') {
                    html.endGame.childNodes[1].innerText = 'GAME OVER !';
                    if (nbGame === 0) {
                        for (i = 0; i < wordSelected.length; i += 1) {
                            html.letterCase.childNodes[i + 1].innerText = wordSelected[i];
                        }
                    } else if (nbGame > 0) {
                        for (i = 0; i < wordSelected.length; i += 1) {
                            html.letterCase.childNodes[i].innerText = wordSelected[i];
                        }
                    }
                } else if (motifEndGame === 'success') {
                    html.endGame.childNodes[1].innerText = 'BRAVO VOUS AVEZ GAGNE !';
                }
                html.endGame.style.height = 'auto';
                html.endGame.classList.remove('is_hidden');

            }
        }
    };

    observer = function observer() {
        var i;
        for (i = 0; i < html.keys.length; i += 1) {
            html.keys[i].onclick = keysEvent;
        }
        html.btnRestart.onclick = restartGame;
    };

    return {
        init: init
    };
}());