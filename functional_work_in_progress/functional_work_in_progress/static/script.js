
// function processInput() {
//     var userInput = document.getElementById('transcribedText').textContent;
//   // var userInput = "lucas gagne";
  
//     // Append the userInput as a query parameter to the URL
//     var url = '/hello?input=' + encodeURIComponent(userInput);
//     fetch(url)
//       .then(response => response.text())
//       .then(result => {
//         console.log('Result:', result);
//         // Handle the result from the Flask endpoint
//         // ...
//         document.getElementById('resultText').textContent = result;
//       })
//       .catch(error => {
//         console.error('Error:', error);
//         // Handle any errors that occur during the request
//       });
//   }
function processInput() {
  var userInput = document.getElementById('transcribedText').textContent;

  // Append the userInput as a query parameter to the URL
  var url = '/hello?input=' + encodeURIComponent(userInput);
  fetch(url)
    .then(response => response.text())
    .then(result => {
      console.log('Result:', result);
      // Handle the result from the Flask endpoint
      // ...
      document.getElementById('resultText').textContent = result;

      // Convert result text to speech and play
      var utterance = new SpeechSynthesisUtterance(result);
      speechSynthesis.speak(utterance);
    })
    .catch(error => {
      console.error('Error:', error);
      // Handle any errors that occur during the request
    });
}
  //Speech to text below
  document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('startButton');
    const stopButton = document.getElementById('stopButton');
    const transcribedText = document.getElementById('transcribedText');

    let recognition;

    startButton.addEventListener('click', () => {
        recognition = new webkitSpeechRecognition(); // Use vendor prefix for Chrome
        recognition.lang = 'en-US'; // Set the language
        recognition.continuous = true; // Enable continuous mode

        recognition.onstart = () => {
            console.log('Recording started');
        };

        recognition.onend = () => {
            console.log('Recording stopped');
        };

        recognition.onresult = (event) => {
            const transcript = event.results[event.results.length - 1][0].transcript;
            transcribedText.innerText = transcript;

            // Send the transcript to the Flask backend
            fetch('/process_transcript', {
                method: 'POST',
                body: JSON.stringify({ transcript: transcript }),
                headers: { 'Content-Type': 'application/json' }
            });
        };

        recognition.start();
    });

    stopButton.addEventListener('click', () => {
        if (recognition) {
            recognition.stop();
        }
    });
});
  