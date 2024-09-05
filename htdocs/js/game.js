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

let timeToWait3Actions=5000;
let timeToWaitSpriteChange=3000;

let backgroundMusic;
let eatSound;
let playSound;
let sleepSound;
let musicOn = false;

let CerberiusImage;
let CerberiusImageHunger;
let CerberiusImageSleep;
let CerberiusImagePlay;

let EatBarImage0;
let EatBarImage25;
let EatBarImage50;
let EatBarImage75;
let EatBarImage100;

let SleepBarImage0;
let SleepBarImage25;
let SleepBarImage50;
let SleepBarImage75;
let SleepBarImage100;

let PlayBarImage0;
let PlayBarImage25;
let PlayBarImage50;
let PlayBarImage75;
let PlayBarImage100;


function preload() {
    this.load.image('background', '/assets/Sprites/background2.jpg');
    this.load.image('death', '/assets/Sprites/dead.png');
    this.load.image('button', '/assets/Sprites/block.png');
    this.load.image('buttonEat', '/assets/Sprites/buttonEat.png');
    this.load.image('buttonSleep', '/assets/Sprites/buttonSleep.png');
    this.load.image('buttonPlay', '/assets/Sprites/buttonPlay.png');
    this.load.image('eat', '/assets/Sprites/eat.png');
    this.load.image('beast', '/assets/Sprites/beast.png');
    this.load.image('play', '/assets/Sprites/play.png');
    this.load.image('sleep', '/assets/Sprites/sleep.png');
    this.load.audio('backgroundMusic', '/assets/Sound/Alexander Ehlers - Flags.mp3');
    this.load.audio('beastEat', '/assets/Sound/beast_eat.wav');
    this.load.audio('beastPlay', '/assets/Sound/beast_play.wav');
    this.load.audio('beastSleep', '/assets/Sound/sleep.wav');


    this.load.image('emptyBar', '/assets/Sprites/emptyBar.png');
    this.load.image('EatBar1', '/assets/Sprites/eatBar1.png');
    this.load.image('EatBar2', '/assets/Sprites/eatBar2.png');
    this.load.image('EatBar3', '/assets/Sprites/eatBar3.png');
    this.load.image('EatBar4', '/assets/Sprites/eatBar4.png');

    this.load.image('SleepBar1', '/assets/Sprites/sleepBar1.png');
    this.load.image('SleepBar2', '/assets/Sprites/sleepBar2.png');
    this.load.image('SleepBar3', '/assets/Sprites/sleepBar3.png');
    this.load.image('SleepBar4', '/assets/Sprites/sleepBar4.png');

    this.load.image('PlayBar1', '/assets/Sprites/playBar1.png');
    this.load.image('PlayBar2', '/assets/Sprites/playBar2.png');
    this.load.image('PlayBar3', '/assets/Sprites/playBar3.png');
    this.load.image('PlayBar4', '/assets/Sprites/playBar4.png');
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

    buttonImageHunger = this.add.image(110, 615, 'buttonEat').setInteractive();
    buttonImageHunger.setScale(0.4);
    buttonImageHunger.on('pointerdown', feed);

    stateTextHunger = this.add.text(117, 550, "", 
        { fontFamily: 'Arial', fontSize: 18, color: '#ece2ad' });

    buttonImageSleep = this.add.image(355, 630, 'buttonSleep').setInteractive();
    buttonImageSleep.setScale(0.4);
    buttonImageSleep.on('pointerdown', sleep);
   
    stateTextSleep = this.add.text(350, 550, "", 
        { fontFamily: 'Arial', fontSize: 18, color: '#ece2ad' });

    buttonImagePlay = this.add.image(605, 615, 'buttonPlay').setInteractive();
    buttonImagePlay.setScale(0.4);
    buttonImagePlay.on('pointerdown', play);

    stateTextPlay = this.add.text(580, 550, "", 
        { fontFamily: 'Arial', fontSize: 18, color: '#ece2ad' });
    
    stateTextCounter = this.add.text(100, 100, "", 
        { fontFamily: 'Arial', fontSize: 18, color: '#ece2ad' });
    
    // 75% bar
    EatBarImage75= this.add.image(140, 50, 'EatBar3');
    EatBarImage75.setScale(0.6);
    EatBarImage75.alpha=1;

    SleepBarImage75= this.add.image(350, 50, 'SleepBar3');
    SleepBarImage75.setScale(0.6);
    SleepBarImage75.alpha=1;

    PlayBarImage75= this.add.image(560, 50, 'PlayBar3');
    PlayBarImage75.setScale(0.6);
    PlayBarImage75.alpha=1;

    // 0% bar
    EatBarImage0= this.add.image(140, 50, 'emptyBar');
    EatBarImage0.setScale(0.6);
    EatBarImage0.alpha=0;
    
    SleepBarImage0= this.add.image(350, 50, 'emptyBar');
    SleepBarImage0.setScale(0.6);
    SleepBarImage0.alpha=0;

    PlayBarImage0= this.add.image(560, 50, 'emptyBar');
    PlayBarImage0.setScale(0.6);
    PlayBarImage0.alpha=0;

    // 25% bar
    EatBarImage25= this.add.image(140, 50, 'EatBar1');
    EatBarImage25.setScale(0.6);
    EatBarImage25.alpha=0;
    
    SleepBarImage25= this.add.image(350, 50, 'SleepBar1');
    SleepBarImage25.setScale(0.6);
    SleepBarImage25.alpha=0;

    PlayBarImage25= this.add.image(560, 50, 'PlayBar1');
    PlayBarImage25.setScale(0.6);
    PlayBarImage25.alpha=0;

    // 50% bar
    EatBarImage50= this.add.image(140, 50, 'EatBar2');
    EatBarImage50.setScale(0.6);
    EatBarImage50.alpha=0;
    
    SleepBarImage50= this.add.image(350, 50, 'SleepBar2');
    SleepBarImage50.setScale(0.6);
    SleepBarImage50.alpha=0;

    PlayBarImage50= this.add.image(560, 50, 'PlayBar2');
    PlayBarImage50.setScale(0.6);
    PlayBarImage50.alpha=0;
    
    // 100% bar
    EatBarImage100= this.add.image(140, 50, 'EatBar4');
    EatBarImage100.setScale(0.6);
    EatBarImage100.alpha=0;
    
    SleepBarImage100= this.add.image(350, 50, 'SleepBar4');
    SleepBarImage100.setScale(0.6);
    SleepBarImage100.alpha=0;

    PlayBarImage100= this.add.image(560, 50, 'PlayBar4');
    PlayBarImage100.setScale(0.6);
    PlayBarImage100.alpha=0;

    backgroundMusic = this.sound.add('backgroundMusic');
    backgroundMusic.loop = true;

    eatSound = this.sound.add('beastEat');
    playSound = this.sound.add('beastPlay');
    sleepSound = this.sound.add('beastSleep');

    updateState();
    setInterval(updateState, 10000);
    clickCounter = 0;
}

function startGame(){
    buttonStart.alpha=0;
    resetSprite();
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
        setTimeout(resetCounter, timeToWait3Actions);
        
    }
}

function resetCounter(){
    if (deathImage.alpha == 0){
        clickCounter = 0;
        stateTextCounter.text = "Counter : " + clickCounter;
        buttonImageHunger.setInteractive();
        buttonImageHunger.alpha = 1;
        buttonImageSleep.setInteractive();
        buttonImageSleep.alpha = 1;
        buttonImagePlay.setInteractive();
        buttonImagePlay.alpha = 1;
        resetSprite();
    }
}

function updateCerberiusStats(stateFromServer){    
    stateTextHunger.text = "Hunger : " + stateFromServer.hunger;
    stateTextSleep.text = "Sleep : " + stateFromServer.sleep;
    stateTextPlay.text = "Mood : " + stateFromServer.mood;

    setTimeout(resetSprite, timeToWaitSpriteChange);
    
    //jauge 0%
    if (stateFromServer.hunger<=0){
        EatBarImage0.alpha=1;
        EatBarImage25.alpha=0;
        EatBarImage50.alpha=0;
        EatBarImage75.alpha=0;
        EatBarImage100.alpha=0;
    }

    if (stateFromServer.sleep<=0){
        SleepBarImage0.alpha=1;
        SleepBarImage25.alpha=0;
        SleepBarImage50.alpha=0;
        SleepBarImage75.alpha=0;
        SleepBarImage100.alpha=0;
    }

    if (stateFromServer.mood<=0){
        PlayBarImage0.alpha=1;
        PlayBarImage25.alpha=0;
        PlayBarImage50.alpha=0;
        PlayBarImage75.alpha=0;
        PlayBarImage100.alpha=0;
    }
    //jauge 25%
    if (stateFromServer.hunger>0 && stateFromServer.hunger<=25 ){
        EatBarImage25.alpha=1;
        EatBarImage0.alpha=0;
        EatBarImage50.alpha=0;
        EatBarImage75.alpha=0;
        EatBarImage100.alpha=0;
    }

    if (stateFromServer.sleep>0 && stateFromServer.sleep<=25 ){
        SleepBarImage25.alpha=1;
        SleepBarImage0.alpha=0;
        SleepBarImage50.alpha=0;
        SleepBarImage75.alpha=0;
        SleepBarImage100.alpha=0;
    }

    if (stateFromServer.mood>0 && stateFromServer.mood<=25 ){
        PlayBarImage25.alpha=1;
        PlayBarImage0.alpha=0;
        PlayBarImage50.alpha=0;
        PlayBarImage75.alpha=0;
        PlayBarImage100.alpha=0;
    }

    //jauge 50%
    if (stateFromServer.hunger>25 && stateFromServer.hunger<=50){
        EatBarImage0.alpha=0;
        EatBarImage25.alpha=0;
        EatBarImage50.alpha=1;
        EatBarImage75.alpha=0;
        EatBarImage100.alpha=0;
    }

    if (stateFromServer.sleep>25 && stateFromServer.sleep<=50){
        SleepBarImage0.alpha=0;
        SleepBarImage25.alpha=0;
        SleepBarImage50.alpha=1;
        SleepBarImage75.alpha=0;
        SleepBarImage100.alpha=0;
    }

    if (stateFromServer.mood>25 && stateFromServer.mood<=50){
        PlayBarImage0.alpha=0;
        PlayBarImage25.alpha=0;
        PlayBarImage50.alpha=1;
        PlayBarImage75.alpha=0;
        PlayBarImage100.alpha=0;
    }

    //jauge 75%
    if (stateFromServer.hunger>50 && stateFromServer.hunger<=75){
        EatBarImage0.alpha=0;
        EatBarImage25.alpha=0;
        EatBarImage50.alpha=0;
        EatBarImage75.alpha=1;
        EatBarImage100.alpha=0;
    }

    if (stateFromServer.sleep>50 && stateFromServer.sleep<=75){
        SleepBarImage0.alpha=0;
        SleepBarImage25.alpha=0;
        SleepBarImage50.alpha=0;
        SleepBarImage75.alpha=1;
        SleepBarImage100.alpha=0;
    }

    if (stateFromServer.mood>50 && stateFromServer.mood<=75){
        PlayBarImage0.alpha=0;
        PlayBarImage25.alpha=0;
        PlayBarImage50.alpha=0;
        PlayBarImage75.alpha=1;
        PlayBarImage100.alpha=0;
    }

    //jauge 100%
    if (stateFromServer.hunger>75){
        EatBarImage0.alpha=0;
        EatBarImage25.alpha=0;
        EatBarImage50.alpha=0;
        EatBarImage75.alpha=0;
        EatBarImage100.alpha=1;
    }

    if (stateFromServer.sleep>75){
        SleepBarImage0.alpha=0;
        SleepBarImage25.alpha=0;
        SleepBarImage50.alpha=0;
        SleepBarImage75.alpha=0;
        SleepBarImage100.alpha=1;
    }

    if (stateFromServer.mood>75){
        PlayBarImage0.alpha=0;
        PlayBarImage25.alpha=0;
        PlayBarImage50.alpha=0;
        PlayBarImage75.alpha=0;
        PlayBarImage100.alpha=1;
    }

    if (stateFromServer.death == true){
        //change asset Cerberius
        buttonImageHunger.disableInteractive();
        buttonImageHunger.alpha = 0.5;
        buttonImageSleep.disableInteractive();
        buttonImageSleep.alpha = 0.5;
        buttonImagePlay.disableInteractive();
        buttonImagePlay.alpha = 0.5;
        deathImage.alpha = 1;
        CerberiusImage.alpha = 0;
        CerberiusImageHunger.alpha = 0;
        CerberiusImagePlay.alpha = 0;
        CerberiusImageSleep.alpha = 0;
    }
    
}

function resetSprite(){
    if (deathImage.alpha == 0){
        CerberiusImage.alpha = 1;
        CerberiusImageHunger.alpha = 0;
        CerberiusImagePlay.alpha = 0;
        CerberiusImageSleep.alpha = 0;
    }
    
}