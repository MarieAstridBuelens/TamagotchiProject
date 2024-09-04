// npm install express
const express = require('express'); 
const app = express();

// pour utiliser le folder spécifié comme racine (root) du serveur HTTP (Web)
app.use('/', express.static(__dirname + "/htdocs"));

app.listen(8000, function() { 
    console.log('Listening on port 8000');
   });

let state = {
    hunger : 75,
    sleep : 75,
    mood : 75,
};

app.get('/hunger', function(request, response) {
    state.hunger += 25;
    state.sleep -= 25;
    response.setHeader('Content-Type', 'application/json'); 
    response.send(state);
   });

app.get('/sleep', function(request, response) {
    state.sleep += 25;
    state.hunger -= 25;
    response.setHeader('Content-Type', 'application/json'); 
    response.send(state);
   });

app.get('/mood', function(request, response) {
    state.mood += 25;
    state.hunger -= 25;
    state.sleep -= 25;
    response.setHeader('Content-Type', 'application/json'); 
    response.send(state);
   });

app.get('/state', function(request, response) {
    response.setHeader('Content-Type', 'application/json'); 
    response.send(state);
   });

function updateState() {
    state.mood -= 25;
    state.hunger -= 25;
    state.sleep -= 25;
}

setInterval(updateState, 10000);