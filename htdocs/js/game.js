let config = {
    type: Phaser.AUTO,
    width: 700,
    height: 721,
    physics: {
        default: 'arcade'
    },
    scene: {
        preload: preload,
        create: create
    },
    autoCenter: true,
    audio: {
        disableWebAudio: true
    }
};

let game = new Phaser.Game(config);
let state;
let stateTextHunger;
let stateTextSleep;
let stateTextPlay;
let stateTextCounter;
let counter;
let deathImage;
let buttonStart;
let buttonImageHunger;
let buttonImageSleep;
let buttonImagePlay;
let timeToWait=5000;
let backgroundMusic;
let eatSound;
let playSound;
let sleepSound;
let musicOn = false;
let CerberiusImage;
let CerberiusImageHunger;
let CerberiusImageSleep;
let CerberiusImagePlay;


function preload() {
    this.load.image('background', '/assets/Sprites/background2.jpg');
    this.load.image('death', '/assets/Sprites/dead.png');
    this.load.image('button', '/assets/Sprites/block.png');
    this.load.image('eat', '/assets/Sprites/eat.png');
    this.load.image('beast', '/assets/Sprites/beast.png');
    this.load.image('play', '/assets/Sprites/play.png');
    this.load.image('sleep', '/assets/Sprites/sleep.png');
    this.load.audio('backgroundMusic', '/assets/Sound/Alexander Ehlers - Flags.mp3');
    this.load.audio('beastEat', '/assets/Sound/beast_eat.wav');
    this.load.audio('beastPlay', '/assets/Sound/beast_play.wav');
    this.load.audio('beastSleep', '/assets/Sound/sleep.wav');

}

function create() {
    let backImage = this.add.image(0, 0, 'background');
    backImage.setOrigin(0, 0);
    backImage.setScale(0.9);

    CerberiusImage = this.add.image(350, 350, 'beast');
    CerberiusImage.setScale(0.65);
    CerberiusImage.alpha = 0;
    
    CerberiusImageHunger = this.add.image(350, 350, 'eat');
    CerberiusImageHunger.setScale(0.65);
    CerberiusImageHunger.alpha = 0;

    CerberiusImagePlay = this.add.image(350, 350, 'play');
    CerberiusImagePlay.setScale(0.65);
    CerberiusImagePlay.alpha = 0;

    CerberiusImageSleep = this.add.image(350, 350, 'sleep');
    CerberiusImageSleep.setScale(0.65);
    CerberiusImageSleep.alpha = 0;

    deathImage = this.add.image(350, 350, 'death');
    deathImage.setScale(0.65);
    deathImage.alpha = 0;
    
    buttonStart = this.add.image(350, 350, 'button').setInteractive();
    buttonStart.on('pointerdown', startGame);

    buttonImageHunger = this.add.image(117, 650, 'button').setInteractive();
    buttonImageHunger.setScale(0.3);
    buttonImageHunger.on('pointerdown', feed);

    stateTextHunger = this.add.text(117, 600, "", 
        { fontFamily: 'Arial', fontSize: 18, color: '#00ff00' });

    buttonImageSleep = this.add.image(360, 650, 'button').setInteractive();
    buttonImageSleep.setScale(0.3);
    buttonImageSleep.tint = 0x1673F8;
    buttonImageSleep.on('pointerdown', sleep);
   
    stateTextSleep = this.add.text(350, 600, "", 
        { fontFamily: 'Arial', fontSize: 18, color: '#00ff00' });

    buttonImagePlay = this.add.image(600, 650, 'button').setInteractive();
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

    backgroundMusic = this.sound.add('backgroundMusic');
    backgroundMusic.loop = true;

    eatSound = this.sound.add('beastEat');
    playSound = this.sound.add('beastPlay');
    sleepSound = this.sound.add('beastSleep');
    
}

function startGame(){
    buttonStart.setAlpha(0);
    CerberiusImage.alpha = 1;
    backgroundMusic.play();
    musicOn = true;
}

function updateState() {
    // envoyer la requête GET vers le serveur
    fetch('http://localhost:8000/state') 
    .then(function (response) { 
        return response.json(); 
        }) 
            .then(function (stateFromServer) { 
                updateCerberiusStats(stateFromServer);
                if (musicOn == false){
                    backgroundMusic.play();
                    musicOn = true;
                }
            }) 
    .catch(function (err) { 
        console.log("Something went wrong!", err); 
        });
}

function feed() {
    counterManager();
    CerberiusImage.alpha = 0;
    CerberiusImageHunger.alpha = 1;
    CerberiusImagePlay.alpha = 0;
    CerberiusImageSleep.alpha = 0;
    eatSound.play();
    // envoyer la requête GET vers le serveur
    fetch('http://localhost:8000/hunger') 
    .then(function (response) { 
        return response.json(); 
        }) 
            .then(function (stateFromServer) {
                updateCerberiusStats(stateFromServer);
                   
            }) 
    .catch(function (err) { 
        console.log("Something went wrong!", err); 
        });
}

function sleep() {
    counterManager();
    CerberiusImageSleep.alpha = 1;
    CerberiusImage.alpha = 0;
    CerberiusImageHunger.alpha = 0;
    CerberiusImagePlay.alpha = 0;
    sleepSound.play();
    // envoyer la requête GET vers le serveur
    fetch('http://localhost:8000/sleep') 
    .then(function (response) { 
        return response.json(); 
        }) 
            .then(function (stateFromServer) {
                updateCerberiusStats(stateFromServer);
                
            }) 
    .catch(function (err) { 
        console.log("Something went wrong!", err); 
        });
}

function play() {
    
    counterManager();
    CerberiusImage.alpha = 0;
    CerberiusImageHunger.alpha = 0;
    CerberiusImagePlay.alpha = 1;
    CerberiusImageSleep.alpha = 0;
    playSound.play();
    // envoyer la requête GET vers le serveur
    fetch('http://localhost:8000/mood') 
    .then(function (response) { 
        return response.json(); 
        }) 
            .then(function (stateFromServer) {
                updateCerberiusStats(stateFromServer);
                
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
    if (deathImage.alpha == 0){
        clickCounter = 0;
        stateTextCounter.text = "Counter : " + clickCounter;
        buttonImageHunger.setInteractive();
        buttonImageHunger.setAlpha(1);
        buttonImageSleep.setInteractive();
        buttonImageSleep.setAlpha(1);
        buttonImagePlay.setInteractive();
        buttonImagePlay.setAlpha(1);
        CerberiusImage.alpha = 0;
        CerberiusImageHunger.alpha = 0;
        CerberiusImagePlay.alpha = 0;
        CerberiusImageSleep.alpha = 0;
    }
}

function updateCerberiusStats(stateFromServer){    
    stateTextHunger.text = "Hunger : " + stateFromServer.hunger;
    stateTextSleep.text = "Sleep : " + stateFromServer.sleep;
    stateTextPlay.text = "Mood : " + stateFromServer.mood;
    if (stateFromServer.death == true){
        //change asset Cerberius
        buttonImageHunger.disableInteractive();
        buttonImageHunger.setAlpha(0.5);
        buttonImageSleep.disableInteractive();
        buttonImageSleep.setAlpha(0.5);
        buttonImagePlay.disableInteractive();
        buttonImagePlay.setAlpha(0.5);
        deathImage.alpha = 1;
        CerberiusImage.alpha = 0;
        CerberiusImageHunger.alpha = 0;
        CerberiusImagePlay.alpha = 0;
        CerberiusImageSleep.alpha = 0;
    }
}