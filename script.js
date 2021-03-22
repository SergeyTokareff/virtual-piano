const piano = document.querySelector('#piano');
const pianoКeys = document.querySelectorAll('.piano-key');
const audio = document.querySelectorAll('audio');
const fullScreenButton = document.querySelector('.fullscreen');
const btnContainer = document.querySelector('.btn-container');
const btnNotes = document.querySelector('.btn-notes');
const btnLetters = document.querySelector('.btn-letters');


const startSound = (event) => {
    event.target.classList.add('piano-key-active', 'piano-key-active-pseudo');
    let note = event.target.dataset.letter;
    playAudio(note);
}

const stopSound = (event) => {
    event.target.classList.remove('piano-key-active', 'piano-key-active-pseudo');
}


const moveCursor = (event) => {   
    let note = event.target.dataset.letter;
    
    event.target.classList.add('piano-key-active', 'piano-key-active-pseudo');
    playAudio(note);
    pianoКeys.forEach((el) => {
        el.addEventListener('mouseover', startSound);
        el.addEventListener('mouseout', stopSound);
    });            
}

const stopMoveCursor = () => {
    pianoКeys.forEach((el) => {
        el.classList.remove('piano-key-active', 'piano-key-active-pseudo');
        el.removeEventListener('mouseover', startSound);
        el.removeEventListener('mouseout', stopSound);
    });
}

const pushKeyboards = (event) => {
    let note = event.key;
    let pianoКeys = document.querySelectorAll('.piano-key');
    
    if (event.repeat) {
        return;      
    } 
    playAudio(note);
    
    pianoКeys.forEach(elem => {
        if (elem.dataset.letter === note.toUpperCase()){
            elem.classList.add('piano-key-active', 'piano-key-active-pseudo');
        }
        document.addEventListener('keyup', () => {
            elem.classList.remove('piano-key-active', 'piano-key-active-pseudo');
        });
    });   
    
}

function playAudio (note) {
        
    for (let i = 0; i < audio.length; i++) {
        audio.currentTime = 0;
        if (audio[i].dataset.letter === note) {            
            audio[i].play();        
        }
    }

    for (let i = 0; i < audio.length; i++) {
        audio.currentTime = 0;
        if (audio[i].dataset.letter === note.toUpperCase()) {
            audio[i].play();
        }       
    }      
}

const toggleFullScreen = () => {
    document.fullscreenElement ? document.exitFullscreen() : document.documentElement.requestFullscreen();
}

const toggleBtns = (e) => {
    const btn = document.querySelectorAll('.btn');
    btn.forEach(el => {
        el.classList.remove('btn-active');
    });
    e.target.classList.add('btn-active');


    for (let el of btnLetters.classList){
        pianoКeys.forEach(elem => {
            if (el === 'btn-active') {
                elem.classList.add('piano-key-letter');
            } else {
                elem.classList.remove('piano-key-letter');
            }
        });
        
    }
}


piano.addEventListener('mousedown', moveCursor, false);
piano.addEventListener('mouseup', stopMoveCursor); 
document.addEventListener('keydown', pushKeyboards);
document.addEventListener('keyup', stopSound);
fullScreenButton.addEventListener('click', toggleFullScreen);
btnContainer.addEventListener('click', toggleBtns);





//console.log(pianoKeys);