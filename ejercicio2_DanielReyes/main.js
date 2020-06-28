let textContainer = document.getElementById('container').innerHTML; 
let container = document.getElementById('container');

//worker
var worker = new Worker('word_worker.js');
worker.addEventListener('message', function(e) {
  container.innerHTML = e.data;
}, false);


const words = async (url) => { //return a promise
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const myJson = await response.json();
  return myJson;
}
//call to function when DOM is loaded
document.addEventListener("DOMContentLoaded", function(event) {
  getKeywords();
});

//Get the words 
async function getKeywords(){
  var myJson = await words(' https://cors-anywhere.herokuapp.com/http://51.38.34.197/getKeywords.json');
  
  setTimeout(function(){ 
    worker.postMessage([myJson, textContainer]); 
}, 3000);
}

