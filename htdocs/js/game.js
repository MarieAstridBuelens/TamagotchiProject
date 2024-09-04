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
let stateTextHunger;
let stateTextSleep;
let stateTextPlay;
let stateTextCounter;
let counter;
let buttonImageHunger;
let buttonImageSleep;
let buttonImagePlay;
let timeToWait=5000;


function preload() {
    this.load.image('background', '/assets/Sprites/background.png');
    this.load.image('button', '/assets/Sprites/block.png');
}

function create() {
    let backImage = this.add.image(0, 0, 'background');
    backImage.setOrigin(0, 0);
    backImage.setScale(0.55);

    buttonImageHunger = this.add.image(117, 650, 'button').setInteractive();
    buttonImageHunger.setScale(0.3);
    buttonImageHunger.on('pointerdown', feed);

    stateTextHunger = this.add.text(117, 600, "", 
        { fontFamily: 'Arial', fontSize: 18, color: '#00ff00' });

    buttonImageSleep = this.add.image(350, 650, 'button').setInteractive();
    buttonImageSleep.setScale(0.3);
    buttonImageSleep.tint = 0x1673F8;
    buttonImageSleep.on('pointerdown', sleep);
   
    stateTextSleep = this.add.text(350, 600, "", 
        { fontFamily: 'Arial', fontSize: 18, color: '#00ff00' });

    buttonImagePlay = this.add.image(580, 650, 'button').setInteractive();
    buttonImagePlay.setScale(0.3);
    buttonImagePlay.tint = 0xffa500;
    buttonImagePlay.on('pointerdown', play);

    stateTextPlay = this.add.text(580, 600, "", 
        { fontFamily: 'Arial', fontSize: 18, color: '#00ff00' });
    
    stateTextCounter = this.add.text(100, 100, "", 
        { fontFamily: 'Arial', fontSize: 18, color: '#00ff00' });
    
    updateState();
    setInterval(updateState, 10000);
    clickCounter = 0;
}

function updateState() {
    // envoyer la requête GET vers le serveur
    fetch('http://localhost:8000/state') 
    .then(function (response) { 
        return response.json(); 
        }) 
            .then(function (stateFromServer) { 
                stateTextHunger.text = "Hunger : " + stateFromServer.hunger;
                stateTextSleep.text = "Sleep : " + stateFromServer.sleep;
                stateTextPlay.text = "Mood : " + stateFromServer.mood;
            }) 
    .catch(function (err) { 
        console.log("Something went wrong!", err); 
        });
}

function feed() {
    counterManager();

    // envoyer la requête GET vers le serveur
    fetch('http://localhost:8000/hunger') 
    .then(function (response) { 
        return response.json(); 
        }) 
            .then(function (stateFromServer) {
                stateTextHunger.text = "Hunger : " + stateFromServer.hunger;
                stateTextSleep.text = "Sleep : " + stateFromServer.sleep;
                stateTextPlay.text = "Mood : " + stateFromServer.mood;             
            }) 
    .catch(function (err) { 
        console.log("Something went wrong!", err); 
        });
}

function sleep() {
    counterManager();

    // envoyer la requête GET vers le serveur
    fetch('http://localhost:8000/sleep') 
    .then(function (response) { 
        return response.json(); 
        }) 
            .then(function (stateFromServer) {
                
                stateTextHunger.text = "Hunger : " + stateFromServer.hunger;
                stateTextSleep.text = "Sleep : " + stateFromServer.sleep;
                stateTextPlay.text = "Mood : " + stateFromServer.mood;
            }) 
    .catch(function (err) { 
        console.log("Something went wrong!", err); 
        });
}

function play() {
    counterManager()

    // envoyer la requête GET vers le serveur
    fetch('http://localhost:8000/mood') 
    .then(function (response) { 
        return response.json(); 
        }) 
            .then(function (stateFromServer) {
                if(counter <= 0){
                    buttonImagePlay.disableInteractive();
                    buttonImagePlay.setAlpha(0.5);
                }
                stateTextHunger.text = "Hunger : " + stateFromServer.hunger;
                stateTextSleep.text = "Sleep : " + stateFromServer.sleep;
                stateTextPlay.text = "Mood : " + stateFromServer.mood;
            }) 
    .catch(function (err) { 
        console.log("Something went wrong!", err); 
        });
}

function counterManager(){
    clickCounter++;
    stateTextCounter.text = "Counter : " + clickCounter;
    if(clickCounter >= 3){
        buttonImageHunger.disableInteractive();
        buttonImageHunger.setAlpha(0.5);
        buttonImageSleep.disableInteractive();
        buttonImageSleep.setAlpha(0.5);
        buttonImagePlay.disableInteractive();
        buttonImagePlay.setAlpha(0.5);
        setTimeout(resetCounter, timeToWait);
    }
}

function resetCounter(){
    clickCounter = 0;
    stateTextCounter.text = "Counter : " + clickCounter;
    buttonImageHunger.setInteractive();
    buttonImageHunger.setAlpha(1);
    buttonImageSleep.setInteractive();
    buttonImageSleep.setAlpha(1);
    buttonImagePlay.setInteractive();
    buttonImagePlay.setAlpha(1);
}