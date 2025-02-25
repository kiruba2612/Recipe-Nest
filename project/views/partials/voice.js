// function textToSpeech(text) {
//   if ("speechSynthesis" in window) {
//     const synth = window.speechSynthesis;
//     const utterance = new SpeechSynthesisUtterance(text);

//     // Optional: Customize voice and properties
//     utterance.lang = "en-US"; // Set language
//     utterance.pitch = 1; // Set pitch (0 to 2, default is 1)
//     utterance.rate = 1; // Set rate (0.1 to 10, default is 1)
//     utterance.volume = 1; // Set volume (0 to 1, default is 1)

//     synth.speak(utterance);
//   } else {
//     console.error("Speech synthesis is not supported in this browser.");
//   }
// }

// // Example usage
// module.exports = textToSpeech();
