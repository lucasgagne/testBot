


function processInput() {
    var userInput = document.getElementById('inputField').value;
  // var userInput = "lucas gagne";
  
    // Append the userInput as a query parameter to the URL
    var url = '/hello?input=' + encodeURIComponent(userInput);
    fetch(url)
      .then(response => response.text())
      .then(result => {
        console.log('Result:', result);
        // Handle the result from the Flask endpoint
        // ...
        document.getElementById('resultText').textContent = result;
      })
      .catch(error => {
        console.error('Error:', error);
        // Handle any errors that occur during the request
      });
  }
  