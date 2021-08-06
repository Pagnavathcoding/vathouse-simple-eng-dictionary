let input = document.getElementById("input");
let search = document.getElementById("search");
let sound = document.getElementById("sound");
let audio = document.getElementById("audio");
let word = document.getElementById("word");
let clearSearch = document.getElementById("clear-search");
let record = document.getElementById("record");
let play = document.getElementById("play");
let definition = document.getElementById("definition");
let syn = document.getElementById("syn");
input.addEventListener("input", (e) => {
    if (e.target.value != "") {
        clearSearch.style.display = "flex";
    }
    else {
        clearSearch.style.display = "none";
    }
});

clearSearch.addEventListener("click", () => {
    input.value = '';
    clearSearch.style.display = "none";
})
// Default
async function engDictDefault() {
    const def = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en_US/${input.value}`);
    return def.json().then((data) => {
        word.innerHTML = input.value;
        let displayTextVoice = '';
        for (let voice = 0; voice < data.length; voice++) {
            let read = data[voice].phonetics;
            for (let r = 0; r < read.length; r++) {
                displayTextVoice += `
                    <div class="voice">
                        <p>${read[r].text}</p>
                        <audio src=${read[r].audio} id="playSound"></audio>
                    </div>
                `;
            }
        }
        record.innerHTML = displayTextVoice;
        play.addEventListener("click", () => {
            document.getElementById("playSound").play();
        })
        // meaning
        let counter = 0;
        let partOfSpeech = '';
        for (let mean = 0; mean < data.length; mean++) {
            let meanings = data[mean].meanings;
            for (let means = 0; means < meanings.length; means++) {
                console.log(meanings[means].partOfSpeech)
                counter += 1;
                partOfSpeech += `
                    <div class="meaning">
                        <p>${counter}: ${meanings[means].partOfSpeech}</p>
                    </div>
                `;
            }
        }
        document.getElementById("part-of-speech").innerHTML = partOfSpeech;
        // definition
        let anotherCounter = 0;
        let displayDefinition = '';
        for (let defin = 0; defin < data.length; defin++) {
            let next = data[defin].meanings;
            for (let defi = 0; defi < next.length; defi++) {
                let nextOne = next[defi].definitions;
                for (let def = 0; def < nextOne.length; def++) {
                    anotherCounter += 1;
                    displayDefinition += `
                        <div class="def">
                            <p>${anotherCounter}: ${nextOne[def].definition}</p>
                            <p>${nextOne[def].example === undefined ? nextOne[def].example = '' : "Ex: " + nextOne[def].example}</p>
                        </div>
                    `
                }
            }
        }
        definition.innerHTML = displayDefinition;
        // synonyms
        let synWords = '';
        for (let same = 0; same < data.length; same++) {
            let sameNext = data[same].meanings;
            for (let s = 0; s < sameNext.length; s++) {
                let nextSame = sameNext[s].definitions;
                for (let n = 0; n < nextSame.length; n++) {
                    let nextNextSame = nextSame[n].synonyms;
                    nextNextSame = (nextNextSame == undefined ? nextNextSame = '' : nextNextSame);
                    for (let another = 0; another < nextNextSame.length; another++) {
                        synWords += `
                        <div class="liSame">
                            <li>${nextNextSame[another] == undefined ? nextNextSame[another] = 'Nothing' : nextNextSame[another]}</li>
                        </div>
                        `
                    }

                }
            }
        }
        syn.innerHTML = synWords;
    }).catch((err) => {
        console.log(err);
    })
}
engDictDefault();
// Starter
search.addEventListener("click", () => {
    async function engDict() {
        const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en_US/${input.value}`);
        return res.json().then((data) => {
            word.innerHTML = input.value;
            let displayTextVoice = '';
            for (let voice = 0; voice < data.length; voice++) {
                let read = data[voice].phonetics;
                for (let r = 0; r < read.length; r++) {
                    displayTextVoice += `
                    <div class="voice">
                        <p>${read[r].text}</p>
                        <audio src=${read[r].audio} id="playSound"></audio>
                    </div>
                `;
                }
            }
            record.innerHTML = displayTextVoice;
            play.addEventListener("click", () => {
                document.getElementById("playSound").play();
            })
            // meaning
            let counter = 0;
            let partOfSpeech = '';
            for (let mean = 0; mean < data.length; mean++) {
                let meanings = data[mean].meanings;
                for (let means = 0; means < meanings.length; means++) {
                    console.log(meanings[means].partOfSpeech)
                    counter += 1;
                    partOfSpeech += `
                    <div class="meaning">
                        <p>${counter}: ${meanings[means].partOfSpeech}</p>
                    </div>
                `;
                }
            }
            document.getElementById("part-of-speech").innerHTML = partOfSpeech;
            // definition
            let anotherCounter = 0;
            let displayDefinition = '';
            for (let defin = 0; defin < data.length; defin++) {
                let next = data[defin].meanings;
                for (let defi = 0; defi < next.length; defi++) {
                    let nextOne = next[defi].definitions;
                    for (let def = 0; def < nextOne.length; def++) {
                        anotherCounter += 1;
                        displayDefinition += `
                        <div class="def">
                            <p>${anotherCounter}: ${nextOne[def].definition}</p>
                            <p>${nextOne[def].example === undefined ? nextOne[def].example = '' : "Ex: " + nextOne[def].example}</p>
                        </div>
                    `
                    }
                }
            }
            definition.innerHTML = displayDefinition;
            // synonyms
            let synWords = '';
            for (let same = 0; same < data.length; same++) {
                let sameNext = data[same].meanings;
                for (let s = 0; s < sameNext.length; s++) {
                    let nextSame = sameNext[s].definitions;
                    for (let n = 0; n < nextSame.length; n++) {
                        let nextNextSame = nextSame[n].synonyms;
                        nextNextSame = (nextNextSame == undefined ? nextNextSame = '' : nextNextSame);
                        for (let another = 0; another < nextNextSame.length; another++) {
                            synWords += `
                        <div class="liSame">
                            <li>${nextNextSame[another] == undefined ? nextNextSame[another] = 'Nothing' : nextNextSame[another]}</li>
                        </div>
                        `
                        }

                    }
                }
            }
            syn.innerHTML = synWords;
        }).catch((err) => {
            return err;
        })
    }
    engDict();
});

// input : Enter
input.addEventListener("keypress", (e) => {
    if (e.key == "Enter") {
        async function enter() {
            const en = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en_US/${input.value}`);
            return en.json().then((data) => {
                word.innerHTML = input.value;
                let displayTextVoice = '';
                for (let voice = 0; voice < data.length; voice++) {
                    let read = data[voice].phonetics;
                    for (let r = 0; r < read.length; r++) {
                        displayTextVoice += `
                    <div class="voice">
                        <p>${read[r].text}</p>
                        <audio src=${read[r].audio} id="playSound"></audio>
                    </div>
                `;
                    }
                }
                record.innerHTML = displayTextVoice;
                play.addEventListener("click", () => {
                    document.getElementById("playSound").play();
                })
                // meaning
                let counter = 0;
                let partOfSpeech = '';
                for (let mean = 0; mean < data.length; mean++) {
                    let meanings = data[mean].meanings;
                    for (let means = 0; means < meanings.length; means++) {
                        counter += 1;
                        partOfSpeech += `
                    <div class="meaning">
                        <p>${counter}: ${meanings[means].partOfSpeech}</p>
                    </div>
                `;
                    }
                }
                document.getElementById("part-of-speech").innerHTML = partOfSpeech;
                // definition
                let anotherCounter = 0;
                let displayDefinition = '';
                for (let defin = 0; defin < data.length; defin++) {
                    let next = data[defin].meanings;
                    for (let defi = 0; defi < next.length; defi++) {
                        let nextOne = next[defi].definitions;
                        for (let def = 0; def < nextOne.length; def++) {
                            anotherCounter += 1;
                            displayDefinition += `
                        <div class="def">
                            <p>${anotherCounter}: ${nextOne[def].definition}</p>
                            <p>${nextOne[def].example === undefined ? nextOne[def].example = '' : "Ex: " + nextOne[def].example}</p>
                        </div>
                    `
                        }
                    }
                }
                definition.innerHTML = displayDefinition;
                // synonyms
                let synWords = '';
                for (let same = 0; same < data.length; same++) {
                    let sameNext = data[same].meanings;
                    for (let s = 0; s < sameNext.length; s++) {
                        let nextSame = sameNext[s].definitions;
                        for (let n = 0; n < nextSame.length; n++) {
                            let nextNextSame = nextSame[n].synonyms;
                            nextNextSame = (nextNextSame == undefined ? nextNextSame = '' : nextNextSame)
                            for (let another = 0; another < nextNextSame.length; another++) {
                                synWords += `
                                    <div class="liSame">
                                        <li>${nextNextSame[another] == undefined ? nextNextSame[another] = 'Null' : nextNextSame[another]}</li>
                                    </div>
                        `
                            }

                        }
                    }
                }
                syn.innerHTML = synWords;
            }).catch((err) => {
                return err;
            })
        }
        enter();
    }
})

// console