/**@type {HTMLCanvasElement} */
const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 600;
const CANVAS_HEIGHT = canvas.height = 400;
const numberOfEnemies = 10;
var enemiesMap = new Map();

const enemyImage = new Image();
enemyImage.src = 'images/walkingdead.png';
const deadEnemyImage = new Image();
deadEnemyImage.src = 'images/walkingdead-dead.png';
const numberOfFrames = 10;
let gameFrame = 0;

var score = 0;
const scorePosition = [200, 200];
const scoreX = scorePosition[0], scoreY = scorePosition[1];
const plusScore = 12;
const minusScore = -6;

var winningZombies = 0;
var zombiesCount = 0;
const zombiesOnMap = numberOfEnemies;
const loser = 3;
const gameRounds = 5;
const minSpawningTime = 0;
const maxSpawningTime = 10; // in seconds

var gameEnd = false;
var gameStatus;
var nickName;

const rect = canvas.getBoundingClientRect();
let mouseX = 0, mouseY = -1;

function getOffset() {
    return {
        left: rect.left + window.scrollX,
        top: rect.top + window.scrollY,
        right: rect.right,
        bottom: rect.bottom
    };
}

function getRenvasBounds(mouseX, mouseY) {
    if(mouseX >= 0 && mouseX <= canvas.width && mouseY >= 0 && mouseY <= canvas.height){
        return true;
    }
    return false;
}

function getRandomNumberInBounds(lower, upper){
    return Math.random() * (upper - lower) + lower;
}

class VisualProperties {
    static spriteWidth = parseInt(enemyImage.width / numberOfFrames);
    static spriteHeight = parseInt(enemyImage.height);
}

class Enemy {
    constructor(){
        this.setVisualProperties();
        this.x = canvas.width + 10;
        this.y = getRandomNumberInBounds(canvas.height * 2 / 5, canvas.height - this.height / 2);
        this.speed =getRandomNumberInBounds(1, 2.7);
        this.frame = 0;
        this.flapSpeed = Math.floor(getRandomNumberInBounds(1, 4));
        this.dead = false;
        this.disappear = false;
        this.started = false;
        this.reachedTheEnd = false;
    }

    setVisualProperties(){
        let vp = VisualProperties;
        let scale = getRandomNumberInBounds(1.9, 2.5);
        this.spriteWidth = vp.spriteWidth;
        this.spriteHeight = vp.spriteHeight;
        this.width = this.spriteWidth / scale;
        this.height = this.spriteHeight / scale;
    }

    makeDisappear() {
        if(this.dead && !this.disappear){
            setTimeout(() => {
                this.disappear = true;
            }, 1500);
        }
    }

    isHeadShot(xShotCoord, yShotCoord) {
        let scale = 4 / 10;
        let headRadius = this.height * scale / 2;
        let xCenter = this.x + this.width / 2;
        let yCenter = this.y + headRadius;
        let isShot = (Math.pow(xCenter - xShotCoord, 2) + Math.pow(yCenter - yShotCoord, 2) <= Math.pow(headRadius, 2));
        if(!this.dead && isShot) {
            this.dead = true;
            zombiesCount--;
        }
        return isShot;
    }

    makeMove() {
        this.x -= this.speed;
        this.y += getRandomNumberInBounds(-this.speed, this.speed);
    }

    // Animate sprites
    moveFrame() {
        if(gameFrame % this.flapSpeed === 0){
            this.frame >= numberOfFrames ? this.frame = 0 : this.frame++;
        }
    }

    step(){
        if(!this.dead){
            this.makeMove();
            this.moveFrame();
        }
    }

    won(){
        return this.x <= 0;
    }

    draw() {
        if(!this.dead){
            ctx.drawImage(enemyImage, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, 
                this.x, this.y, this.width, this.height);
        } else if(!this.disappear){
            ctx.drawImage(deadEnemyImage, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, 
                this.x, this.y, this.width, this.height);
        }
    }
}

function addEnemyToMap(enemy) {
    if(enemiesMap.has(enemy.y)) {
        enemiesMap.get(enemy.y).push(enemy);
    } else {
        enemiesMap.set(enemy.y, []);
        enemiesMap.get(enemy.y).push(enemy);
    }
}

function updateEnemy(enemy) {
    // If enemy hasn't been shot - update it,
    // if it has - let it hang around for a few seconds and then make it disappear.
    if(!enemy.dead) {
        enemy.step();
    } else if(!enemy.disappear){
        enemy.makeDisappear();
    }

    // Draw it
    if(!enemy.disappear){
        enemy.draw();
    }
}

function checkIfKilled(enemy){
    // if(!enemy.dead) prevents from counting as killed those that have been killed earlier
    if(!enemy.dead) {
        return enemy.isHeadShot(mouseX, mouseY);
    }
    return false;
}

function lookForDeads() {
    var targetKilled = false;
    var deadCount = 0;
    var mapDesc = new Map([...enemiesMap.entries()].sort((a,b) => a[0] < b[0]));
    mapDesc.forEach((value, key) => { 
        value.forEach(enemy => {
            let killed = checkIfKilled(enemy);
            if(killed){
                targetKilled = true;
                deadCount++;
            }
        })
     });
     return [targetKilled, deadCount];
}

function updateScore(value){
    score += value;
}

function manageShooting(){
    var killed = lookForDeads();
    var targetKilled = killed[0];
    var deadCount = killed[1];
    if(!targetKilled) {
        updateScore(minusScore);
    } else {
        updateScore(plusScore * deadCount);
    }
}

canvas.addEventListener('mousedown', e => {
    mouseX = e.offsetX;
    mouseY = e.offsetY;
    manageShooting();
});

function resetMouseCoords() {
    mouseX = mouseY = -1;
}

function drawScore() {
    ctx.font = "35px Arial";
    ctx.fillStyle = "#FFFFFF";
    ctx.shadowColor =  "#400d40";
    ctx.shadowBlur = 10;
    ctx.lineWidth = 5;
    ctx.strokeText("Score: " + score, scoreX, scoreY);
    ctx.shadowBlur = 0;
    ctx.fillText("Score: " + score, scoreX, scoreY);
    ctx.shadowBlur = 10;
}

function updateEnemies() {
    var mapAsc = new Map([...enemiesMap.entries()].sort((a,b) => a[0] > b[0]));
    mapAsc.forEach((value, key) => { 
        value.forEach(enemy => {
            if(enemy.started){
                updateEnemy(enemy);
                if(!enemy.reachedTheEnd && enemy.won()) {
                    enemy.reachedTheEnd = true;
                    winningZombies++;
                }
            }
        })
     });
}

function activateEnemy(enemy) {
    addEnemyToMap(enemy);
    enemy.started = true;
}

function spawnNewEnemy(counted) {
    if(!counted) {
        zombiesCount++;
    }
    var enemy = new Enemy();
    var msToWait = getRandomNumberInBounds(minSpawningTime, maxSpawningTime) * 1000;
    setTimeout(activateEnemy, msToWait, enemy);
}

function initialiseEnemies() {
    for(let i = 0; i < zombiesOnMap; i++){
        zombiesCount++;
        setTimeout(spawnNewEnemy, getRandomNumberInBounds(500, 6000), true);
    }
}

function gameEngineStep() {
    updateEnemies();
    if(winningZombies >= loser){
        gameEnd = true;
        gameStatus = "lost";
    }
    else if(zombiesCount < zombiesOnMap){
        spawnNewEnemy(false);
    }
}

function checkIfGameEnded() {
    if(gameEnd){
        let msgToShow;
        switch(gameStatus){
            case "lost":
                msgToShow = "You've lost :(. Try again!";
                break;
            default:
                msgToShow = "You've won!";
                break;
        }
        alert(msgToShow);
        return true;
    }
    return false;
}

function animate(){
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    gameEngineStep();

    drawScore();
    resetMouseCoords();

    if(checkIfGameEnded()){
        document.location.reload();
        return;
    }

    gameFrame = (gameFrame % 100) + 1;
    requestAnimationFrame(animate);
}

function showPropmt(){
    var nick = prompt("Please enter your nick:");
    if (nick === "") {
        // user pressed OK, but the input field was empty
        alert("It is required to enter a nickname.");
        showPropmt();
    } else if (nick) {
        // user typed something and hit OK
        document.getElementById("nick-holder").innerHTML = "Nickname: " + nick;
    } else {
        // user hit cancel
        alert("It is required to enter a nickname.");
        showPropmt();
    }
}

showPropmt();
initialiseEnemies();
animate();
