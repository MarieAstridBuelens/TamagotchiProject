// npm install express
const express = require('express'); 
const app = express();

// pour utiliser le folder spécifié comme racine (root) du serveur HTTP (Web)
app.use('/', express.static(__dirname + "/htdocs"));

app.listen(8000, function() { 
    console.log('Listening on port 8000');
   });

let state = {
    hungry : 5
};

app.get('/feed', function(request, response) {
    state.hungry += 1;
    response.setHeader('Content-Type', 'application/json'); 
    response.send(state);
   });

app.get('/state', function(request, response) {
    response.setHeader('Content-Type', 'application/json'); 
    response.send(state);
   });

function updateState() {
    state.hungry -= 1;
}

setInterval(updateState, 10000);