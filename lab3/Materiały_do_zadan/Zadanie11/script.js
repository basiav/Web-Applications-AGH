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

class Enemy {
    constructor(){
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.speed = Math.random() * 4 - 2;
        this.spriteWidth = parseInt(enemyImage.width / numberOfFrames);
        this.spriteHeight = parseInt(enemyImage.height);
        this.width = this.spriteWidth / 2.5;
        this.height = this.spriteHeight / 2.5;
        this.frame = 0;
        this.flapSpeed = Math.floor(Math.random() * 3 + 1);
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

function animate(){
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    enemiesArray.forEach(enemy => {
        enemy.update();
        enemy.draw();
    });
    gameFrame = (gameFrame % 100) + 1;

    requestAnimationFrame(animate);
}

animate();
