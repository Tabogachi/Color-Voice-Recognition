const SpeechRecognition = window.SpeechRecognition || webkitSpeechRecognition;
const SpeechGrammarList = window.SpeechGrammarList || webkitSpeechGrammarList;
const SpeechRecognitionEvent = window.SpeechRecognitionEvent || webkitSpeechRecognitionEvent;
//setup speech recogniton

//list of words to be recognized
const colors = [ 'red', 'orange', 'yellow', 'green', 'blue', 'purple', 'pink', 'black', 'beige', 'aqua', 'chocolate' /* … */ ];
//declaring what version and words we want recognized
const grammar = `#JSGF V1.0; grammar colors; public <color> = ${colors.join(' | ')};`

//define speech recognition
const recognition = new SpeechRecognition();
const speechRecognitionList = new SpeechGrammarList();

//add colors list to speech recognition list
speechRecognitionList.addFromString(grammar, 1);

//settings for language and other settings
recognition.grammars = speechRecognitionList;
recognition.continuous = false;
recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

//creating variables for outputs, background and hints
const diagnostic = document.querySelector('.output');
const bg = document.querySelector('html');
const hints = document.querySelector('.hints');

let colorHTML = '';
colors.forEach((color, i) => {
    console.log(color, i);
    colorHTML += `<span style ="background-color:${color};"> ${color} </span>`;   
});
hints.innerHTML = `Click the page, then say a color to change the background color of the app!`;

//Starts speech recogniton
document.body.onclick = () => {
    recognition.start();
    console.log('Ready to receive a color command.');
  };

//starts recognition
recognition.onresult = (event) => {
   const color = event.results[0][0].transcript; //receives input, and gets the result and alternative, then outputs the transcript
   diagnostic.textContent = `Result received: ${color}.`; //edits output text with the color received
   bg.style.backgroundColor = color; //sets background color to the said color
   console.log(`Confidence: ${event.results[0][0].confidence}`); //logs the diagnostic message
}

//ends speech recognition (until page is clicked and speech recognition is started again)
recognition.onspeechend = () => {
    recognition.stop();
  }

//error recognizing color
recognition.onnomatch = (event) => {
    diagnostic.textContent = "I didn't recognize that color.";
}

//the actual speech recognition is messed up
recognition.onerror = (event) => {
    diagnostic.textContent = `Error occurred in recognition: ${event.error}`;
  }