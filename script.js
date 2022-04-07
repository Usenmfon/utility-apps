if('serviceWorker' in navigator){
  navigator.serviceWorker.register('/service-worker.js')
}

let SpeechRecognition = window.SpeechRecognition || webkitSpeechRecognition;
let SpeechGrammarList = window.SpeechGrammarList || webkitSpeechGrammarList
let SpeechRecognitionEvent = window.SpeechRecognitionEvent || webkitSpeechRecognitionEvent;

const diagnostic = document.querySelector('.audio')
const microphone = document.querySelector('.fa-microphone')
const network_name = document.querySelector('.network_name')
const error_message = document.querySelector('.error')
const search = document.getElementById("search");
const installApp = document.getElementById("install");

let synth = window.speechSynthesis;
let voices = [];

const numbers = ['0706', '0708', '0806','0812', '0703', '0808', '0805','0807','0705'];
const grammar = '#JSF V1.0; grammar numbers; public <numbers> = ' + numbers.join(' | ') + ' ;'

let recognition = new SpeechRecognition();
let speechRecognitionList = new SpeechGrammarList();

speechRecognitionList.addFromString(grammar, 1);

recognition.grammars = speechRecognitionList;
recognition.continuous = false;
recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1; 

error_message.textContent = "Say the first 4 digits"

let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
  deferredPrompt = e;
})

installApp.addEventListener('click', async () => {
  if(deferredPrompt !== null){
    deferredPrompt.prompt();
    const {outcome} = await deferredPrompt.userChoice;
    if(outcome === 'accepted'){
      deferredPrompt = null;
    }
  }
})

diagnostic.addEventListener('click', ()=> { 
  console.log('clicked')
  microphone.classList.add("audio_acive")
  recognition.start();
  console.log("Ready to receive a command.")
})

recognition.onresult = function(event) {
  let network = event.results[0][0].transcript;
  let value = handleNetwork(network)
  sSynthesis(value)
  // console.log('Confidence: ' + event.results[0][0].confidence)
}

function sSynthesis(netwok){
  voices = synth.getVoices();
  let utterThis = new SpeechSynthesisUtterance(netwok)
  utterThis.voice = voices[2]
  utterThis.pitch = 1;
  utterThis.rate = 1;
  synth.speak(utterThis);
  microphone.classList.remove("audio_acive")
}

recognition.onspeechend = function(){
  recognition.stop();
}

recognition.onnomatch = function(event){
  console.log("I didn\'t recognize that network")
}

recognition.onerror = function(event){
  error_message.textContent = event.error 
}

search.addEventListener("input", (e) => {
  let value = e.target.value;
  if(value === ""){
    network_name.textContent = "Network";
  }
  handleNetwork(value.slice(0,4));
});


function handleNetwork(network) {
  if (['0803', '0806', '0703', '0706', '0813', '0816', '0810', '0814', '0903'].includes(network)) {
    network_name.textContent = "MTN";
  }
  if (['0802', '0808', '0708', '0812', '0701', '0902',].includes(network)) {
    network_name.textContent = "AIRTEL";
}
  if (['0805','0807','0705','0815','0811','0905',].includes(network)) {
    network_name.textContent = "GLO";
  }
  if (['0809','0818','0817','0909'].includes(network)) {
    network_name.textContent = "9MOBILE";
  }
  return network_name.textContent
}