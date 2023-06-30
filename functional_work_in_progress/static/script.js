//Page navigation
// Function to handle the homepage link click event
// Wait for the HTML document to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Get all the navigation links
  const navLinks = document.querySelectorAll('nav ul li a');

  // Attach click event listeners to each navigation link
  navLinks.forEach(function(link) {
    link.addEventListener('click', function(event) {
      // Prevent the default link behavior
      event.preventDefault();

      // Get the target URL from the clicked link's href attribute
      const targetUrl = this.getAttribute('href');

      // Redirect to the target URL
      window.location.href = targetUrl;
    });
  });



});

//Calling python GPT API below
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
      var cleanedText =  result.replace(/[^\w\s]/gi, '');
      // Convert result text to speech and play
      var utterance = new SpeechSynthesisUtterance(cleanedText);
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
        // recognition.lang = 'en-US'; // Set the language
        recognition.lang = 'es-ES'; // Set the language

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
  