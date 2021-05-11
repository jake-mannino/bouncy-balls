// setup canvas

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

// function to generate random number
function random(min, max) {
    const num = Math.floor(Math.random() * (max - min + 1)) + min;
    return num;
};

// balls
function Ball(x, y, velX, velY, color, size) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.color = color;
    this.size = size;
};

Ball.prototype.draw = function () {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
};

Ball.prototype.update = function () {
    if ((this.x + this.size) >= width) {
        this.velX = -(this.velX);
    }

    if ((this.x - this.size) <= 0) {
        this.velX = -(this.velX);
    }

    if ((this.y + this.size) >= height) {
        this.velY = -(this.velY);
    }

    if ((this.y - this.size) <= 0) {
        this.velY = -(this.velY);
    }

    this.x += this.velX;
    this.y += this.velY;
};
// 2D collison detection for circles
Ball.prototype.collisionDetect = function () {
    for (let j = 0; j < balls.length; j++) {
        if (!(this === balls[j])) {
            const dx = this.x - balls[j].x;
            const dy = this.y - balls[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < this.size + balls[j].size) {
                balls[j].color = this.color = 'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) + ')';
                balls[j].size = this.size = random(this.size - 3, this.size + 3);
                if (balls[j].size > 20) {
                    balls[j].velX = this.velx = random(this.x - 3 + this.x + this.y / 3/2, this.x * this.y * 3 + 60);
                    balls[j].vely = this.vely = random(this.y - 3 + this.y + this.x / 4/3, this.y + this.x * 3 + 60);
                }
                if (balls[j].size <= 20) {
                    balls[j].velX = this.velx = random(this.x - 3 + this.x + this.y / 4, this.x + 6);
                    balls[j].vely = this.vely = random(this.y - 3 + this.y + this.x / 4, this.y + 8);
                }

            }
        }
    }
};
let balls = [];
while (balls.length < 30) {
    let size = random(5, 45);
    let ball = new Ball(
        // ball position always drawn at least one ball width
        // away from the edge of the canvas, to avoid drawing errors
        random(0 + size, width - size),
        random(0 + size, height - size),
        random(-7, 7),
        random(-7, 7),
        'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) + ')',
        size
    );

    balls.push(ball);
};
function loop() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
    ctx.fillRect(0, 0, width, height);

    for (let i = 0; i < balls.length; i++) {
        balls[i].draw();
        balls[i].update();
        balls[i].collisionDetect();
    }
    requestAnimationFrame(loop);
}
loop();


