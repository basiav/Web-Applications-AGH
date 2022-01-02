/**@type {HTMLCanvasElement} */
const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext('2d');
CANVAS_WIDTH = canvas.width = 500;
CANVAS_HEIGHT = canvas.height = 400;
const numberOfEnemies = 100;
const enemiesArray = [];

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

class VisualProperties {
    static spriteWidth = parseInt(enemyImage.width / numberOfFrames);
    static spriteHeight = parseInt(enemyImage.height);
    static scale = 2.5;
}

// OLD CODE
// this.spriteWidth = parseInt(enemyImage.width / numberOfFrames);
// this.spriteHeight = parseInt(enemyImage.height);
// this.width = this.spriteWidth / 2.5;
// this.height = this.spriteHeight / 2.5;
class Enemy {
    constructor(){
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.speed = Math.random() * 4 - 2;
        this.setVisualProperties();
        this.frame = 0;
        this.flapSpeed = Math.floor(Math.random() * 5 + 1);
    }

    setVisualProperties(){
        var vp = VisualProperties;
        this.spriteWidth = vp.spriteWidth;
        this.spriteHeight = vp.spriteHeight;
        this.width = this.spriteWidth / vp.scale;
        this.height = this.spriteHeight / vp.scale;
    }

    update(){
        this.x += this.speed;
        this.y += this.speed;
        // animate sprites
        if(gameFrame % this.flapSpeed === 0){
            this.frame >= numberOfFrames ? this.frame = 0 : this.frame++;
        }
    }

    draw() {
        ctx.drawImage(enemyImage, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, 
            this.x, this.y, this.width, this.height);
    }
}

for(let i = 0; i < numberOfEnemies; i++){
    enemiesArray.push(new Enemy());
}

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
    enemiesArray.forEach(enemy => {
        enemy.update();
        enemy.draw();
    });
    gameFrame = (gameFrame % 100) + 1;

    drawScore();

    requestAnimationFrame(animate);
}

animate();

