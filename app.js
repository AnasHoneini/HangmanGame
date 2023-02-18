const wordE1 = document.getElementById('word');
const wrongLettersE1 = document.getElementById('wrong-letters');
const playAgainbtn = document.getElementById('play');
const popup = document.getElementById('popup-box');
const notification = document.getElementById('notification-box');
const finalMessage = document.getElementById('final-msg');

const figureParts = document.querySelectorAll(".parts");

const words =['application', 'programming', 'interface', 'wizard'];

let selectedWord = words[Math.floor(Math.random() * words.length)];

const correctedLetters = [];
const wrongLetters = [];

function displayWord(){
    wordE1.innerHTML = `
    ${selectedWord
    .split('')
    .map(
        letter =>`
        <span class="letter">
        ${correctedLetters.includes(letter) ? letter : ''}
        </span>
        `
    )
    .join('')}
    `;

    const innerWord = wordE1.innerText.replace(/\n/g, '')

    if(innerWord=== selectedWord){
        finalMessage.innerText = 'CONGRATS!! YOU WON';
        popup.style.display='flex';
    }
}

function updateWrongLetterE1(){
    wrongLettersE1.innerHTML = `
    ${wrongLetters.length>0?'<p>Wrong</p>': ``}
    ${wrongLetters.map(letter => `<span>${letter}</span>`)}
    `;

    figureParts.forEach((part,index) =>{
        const errors = wrongLetters.length;

        if(index<errors){
            part.style.display='block';
        }
        else{
            part.style.display='none';
        }
    });

    if(wrongLetters.length === figureParts.length){
        finalMessage.innerText = 'You lost';
        popup.style.display='flex';
    }
}

function showNotification(){
    notification.classList.add('show');

    setTimeout(()=>{
        notification.classList.remove('show');
    },2000);
}

window.addEventListener('keydown', e =>{
    if(e.keyCode >= 65 && e.keyCode <=90){
        const letter = e.key;

        if(selectedWord.includes(letter)){
            if(!correctedLetters.includes(letter)){
                correctedLetters.push(letter);

                displayWord();
            }
            else{
                showNotification();
            }
        }
        else{
            if(!wrongLetters.includes(letter)){
                wrongLetters.push(letter);

                updateWrongLetterE1();
            }
            else{
                showNotification();
            }
        }
    }
});

playAgainbtn.addEventListener('click', ()=>{
    correctedLetters.splice(0);
    wrongLetters.splice(0);

    selectedWord=words[Math.floor(Math.random()*words.length)];

    displayWord();

    updateWrongLetterE1();

    popup.style.display = 'none';
});

displayWord();
