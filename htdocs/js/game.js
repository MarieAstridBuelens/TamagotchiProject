let config = {
    type: Phaser.AUTO,
    width: 700,
    height: 700,
    physics: {
        default: 'arcade'
    },
    scene: {
        preload: preload,
        create: create
    },
    autoCenter: true
};

let game = new Phaser.Game(config);
let state;
let stateText;

function preload() {
    this.load.image('background', '/assets/Sprites/background.png');
    this.load.image('button', '/assets/Sprites/block.png');
}

function create() {
    let backImage = this.add.image(0, 0, 'background');
    backImage.setOrigin(0, 0);
    backImage.setScale(0.55);
    stateText = this.add.text(150, 80, "", 
        { fontFamily: 'Arial', fontSize: 18, color: '#00ff00' });
    let buttonImage = this.add.image(100, 100, 'button').setInteractive();
    buttonImage.setScale(0.3);
    buttonImage.on('pointerdown', feed);
    setInterval(updateState, 10000);
}

function updateState() {
    // envoyer la requête GET vers le serveur
    fetch('http://localhost:8000/state') 
    .then(function (response) { 
        return response.json(); 
        }) 
            .then(function (stateFromServer) { 
                stateText.text = stateFromServer.hunger; 
            }) 
    .catch(function (err) { 
        console.log("Something went wrong!", err); 
        });
}

function feed() {
    // envoyer la requête GET vers le serveur
    fetch('http://localhost:8000/hunger') 
    .then(function (response) { 
        return response.json(); 
        }) 
            .then(function (stateFromServer) { 
                stateText.text = state.hunger; 
            }) 
    .catch(function (err) { 
        console.log("Something went wrong!", err); 
        });
}