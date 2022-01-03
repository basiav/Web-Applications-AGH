/**@type {HTMLCanvasElement} */
const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 600;
const CANVAS_HEIGHT = canvas.height = 400;
const numberOfEnemies = 15;
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
        this.x = getRandomNumberInBounds(0, canvas.width);
        this.y = getRandomNumberInBounds(canvas.height * 1 / 2, canvas.height - this.height / 2);
        this.speed =getRandomNumberInBounds(0.2, 1.5);
        this.frame = 0;
        this.flapSpeed = Math.floor(getRandomNumberInBounds(0, 4));
        this.dead = false;
        this.disappear = false;
    }

    setVisualProperties(){
        let vp = VisualProperties;
        let scale = getRandomNumberInBounds(1.9, 2.5);
        this.spriteWidth = vp.spriteWidth;
        this.spriteHeight = vp.spriteHeight;
        this.width = this.spriteWidth / scale;
        this.height = this.spriteHeight / scale;
    }

    killAndDisappear() {
        if(this.dead && !this.disappear){
            setInterval(() => this.disappear = true, 1500);
        }
    }

    isHeadShot(xShotCoord, yShotCoord) {
        let scale = 4 / 10;
        let headRadius = this.height * scale / 2;
        let xCenter = this.x + this.width / 2;
        let yCenter = this.y + headRadius;
        let isShot = (Math.pow(xCenter - xShotCoord, 2) + Math.pow(yCenter - yShotCoord, 2) <= Math.pow(headRadius, 2));
        if(isShot) {
            this.dead = true;
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

    update(){
        if(!this.dead){
            this.makeMove();
            this.moveFrame();
        }
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

for(let i = 0; i < numberOfEnemies; i++){
    var enemy = new Enemy();
    addEnemyToMap(enemy);
}

function checkIfEnemyDead(enemy) {
    return enemy.isHeadShot(mouseX, mouseY);
}

function updateEnemy(enemy) {
    // Check if enemy dead at the very moment
    var enemyDead = enemy.dead;
    // If enemy is alive for the time being, check whether it's been shot now
    if(!enemyDead) {
        enemyDead = checkIfEnemyDead(enemy);
    }
    // If it hasn't been shot - update it,
    // if it has - let it hang around for a few seconds and make it disappear.
    if(!enemy.dead) {
        enemy.update();
    } else {
        enemy.killAndDisappear();
    }

    // Draw it
    if(!enemy.disappear){
        enemy.draw();
    }
}

canvas.addEventListener('mousedown', e => {
    mouseX = e.offsetX;
    mouseY = e.offsetY;
});

function resetMouseCoords() {
    mouseX = mouseY = -1;
}

function drawScore() {
    ctx.font = "35px Arial";
    ctx.fillStyle = "#FFFFFF";
    // ctx.shadowColor =  "#ab58ac";
    ctx.shadowColor =  "#400d40";
    ctx.shadowBlur = 10;
    ctx.lineWidth = 5;
    ctx.strokeText("Score: " + score, scoreX, scoreY);
    ctx.shadowBlur = 0;
    ctx.fillText("Score: " + score, scoreX, scoreY);
    ctx.shadowBlur = 10;
}

function updateScore(){}

function updateEnemies() {
    var mapAsc = new Map([...enemiesMap.entries()].sort((a,b) => a[0] > b[0]));
    mapAsc.forEach((value, key) => { 
        value.forEach(enemy => {
            updateEnemy(enemy);
        })
     });
}

function animate(){
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    updateEnemies();

    drawScore();
    resetMouseCoords();

    gameFrame = (gameFrame % 100) + 1;
    requestAnimationFrame(animate);
}

animate();
