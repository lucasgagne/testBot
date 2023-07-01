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
      document.getElementById('resultText').textContent += '\n' +result + '\n';
      document.getElementById('userChatLog').textContent += '\n' +userInput + '\n';
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

 //Change image func below
 function changeImage(imageSource) {
  console.log("GOt here 1");
  
  var img = document.getElementById('image');
  img.src = imageSource;
}


var imageSources = [
  "{{ url_for('static', filename='images/dogpark.jpeg') }}"
];
function randomImage() {
  var img = document.getElementById('image');
  var randomIndex = Math.floor(Math.random() * imageSources.length);
  var randomImageSource = imageSources[randomIndex];
  changeImage(randomImageSource)
}

// Change theme function below for resurant
function setLangTutorRes(lang) {
  console.log("GOt here2");
  var xhr = new XMLHttpRequest();
  if (lang == "eng") {
    
    xhr.open("GET", "/set_lang_tutor_res_eng", true);
  } else {
    xhr.open("GET", "/set_lang_tutor_res", true);
  }
  
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      console.log(xhr.responseText);
    }
  };
  xhr.send();
}
// Change theme function below for dog park
function setLangTutorDog(lang) {
  console.log("GOt here2");
  var xhr = new XMLHttpRequest();
  if (lang == "eng") {
    xhr.open("GET", "/set_lang_tutor_dog_eng", true);
  } else {
    xhr.open("GET", "/set_lang_tutor_dog", true);
  }
  
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      console.log(xhr.responseText);
    }
  };
  xhr.send();
}
// Change theme function below for grocery store
function setLangTutorStore(lang) {
  console.log("GOt here2");
  var xhr = new XMLHttpRequest();
  if (lang == "eng") {
    xhr.open("GET", "/set_lang_tutor_store_eng", true);
  } else {
    xhr.open("GET", "/set_lang_tutor_store", true);
  }
  
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      console.log(xhr.responseText);
    }
  };
  xhr.send();
}

// Change theme function below for airport
function setLangTutorPort(lang) {
  console.log("GOt here2");
  var xhr = new XMLHttpRequest();
  if (lang == "eng") {
    xhr.open("GET", "/set_lang_tutor_port_eng", true);
  } else {
    xhr.open("GET", "/set_lang_tutor_port", true);
  }
  
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      console.log(xhr.responseText);
    }
  };
  xhr.send();
}
