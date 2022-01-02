/**@type {HTMLCanvasElement} */
const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 600;
const CANVAS_HEIGHT = canvas.height = 400;
const numberOfEnemies = 10;
const enemiesArray = [];
var enemiesMap = new Map();

const enemyImage = new Image();
enemyImage.src = 'images/walkingdead.png';
const numberOfFrames = 10;
let gameFrame = 0;

const scorePosition = [200, 200]; 
// console.log("---------DIMS---------");
// // var rect = canvas.getBoundingClientRect();
// var rect = document.body.getBoundingClientRect();
// console.log(rect.top, rect.right, rect.bottom, rect.left);
// var bodyRect = document.body.getBoundingClientRect(),
//     elemRect = element.getBoundingClientRect(),
//     offset   = elemRect.top - bodyRect.top;

// alert('Element is ' + offset + ' vertical pixels from <body>');

const rect = canvas.getBoundingClientRect();

function getOffset(el) {
    return {
        left: rect.left + window.scrollX,
        top: rect.top + window.scrollY,
        right: rect.right,
        bottom: rect.bottom
    };
}

function getRelativePositionToCanvas(xAbsolute, yAbsolute) {
    let rect = canvas.getBoundingClientRect();
    let xRelative = xAbsolute - rect.left;
    let yRelative = yAbsolute - rect.top;
    if(xRelative < 0 || yRelative < 0){
        console.log("ERROR: X or Y is negative! " + xRelative + " " + yRelative);
    }
    return xRelative, yRelative;
}

function getRandomNumberInBounds(lower, upper){
    return Math.random() * (upper - lower) + lower;
}

// function getRandomXInCanvasBounds(){
//     return getRandomNumberInBounds(0, canvas.width);
// }

// function getRandomYInCanvasBounds(){
//     console.log(rect)
//     return getRandomNumberInBounds(0, canvas.height - );
// }

class VisualProperties {
    static spriteWidth = parseInt(enemyImage.width / numberOfFrames);
    static spriteHeight = parseInt(enemyImage.height);
    static scale = 2.5;
}

class Enemy {
    constructor(){
        this.setVisualProperties();
        this.x = getRandomNumberInBounds(0, canvas.width);
        this.y = getRandomNumberInBounds(canvas.height * 1 / 2, canvas.height - this.height);
        this.speed = Math.random() * 4 - 2;
        this.frame = 0;
        this.flapSpeed = Math.floor(Math.random() * 5 + 1);
        this.dead = false;
    }

    setVisualProperties(){
        var vp = VisualProperties;
        this.spriteWidth = vp.spriteWidth;
        this.spriteHeight = vp.spriteHeight;
        this.width = this.spriteWidth / vp.scale;
        this.height = this.spriteHeight / vp.scale;
    }

    isHeadShot(xShotCoord, yShotCoord) {
        let scale = 4 / 10;
        let headRadius = this.height * scale / 2;
        let xCenter = this.width / 2;
        let yCenter = headRadius;
        let isShot = (Math.pow(xCenter - xShotCoord, 2) + Math.pow(yCenter - yShotCoord, 2) <= headRadius);
        if(isShot) {
            this.dead = true;
        }
        return isShot;
    }

    makeMove() {
        // this.x += this.speed;
        // this.y += this.speed;
    }

    // animate sprites
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
        ctx.drawImage(enemyImage, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, 
            this.x, this.y, this.width, this.height);
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
    // enemiesArray.push(enemy);
    addEnemyToMap(enemy);
}

function shootEnemy(enemy) {
    enemy.dead = true;
}

function updateEnemy(enemy) {
    enemy.update();
    enemy.draw();
}

let mouseX = 0, mouseY = 0;

window.addEventListener("click", e => {
    x = e.offsetX;
    y = e.offsetY;
})



var score = 0;
const scoreX = scorePosition[0], scoreY = scorePosition[1];

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

function animate(){
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    var mapAsc = new Map([...enemiesMap.entries()].sort((a,b) => a[0] > b[0]));
    mapAsc.forEach((value, key) => { 
        value.forEach(enemy => {
            enemy.update();
            enemy.draw();
        })
     });

    gameFrame = (gameFrame % 100) + 1;

    drawScore();

    requestAnimationFrame(animate);
}

animate();
