class FlyingObject {
    constructor(x, y, size, color) {
      this.x = x;
      this.y = y;
      this.size = size;
      this.color = color;
      this.speed = 5;
  
      document.addEventListener('keydown', this.move.bind(this));
    }
  
    move(event) {
      switch(event.key) {
        case 'ArrowUp':
          this.y -= this.speed;
          break;
        case 'ArrowDown':
          this.y += this.speed;
          break;
        case 'ArrowLeft':
          this.x -= this.speed;
          break;
        case 'ArrowRight':
          this.x += this.speed;
          break;
      }
    }
  
    draw(ctx) {
      ctx.fillStyle = this.color;
      ctx.fillRect(this.x, this.y, this.size, this.size);
    }
  }
  class AutonomousObject {
    constructor(x, y, size, color) {
      this.x = x;
      this.y = y;
      this.size = size;
      this.color = color;
      this.dx = 2; // prędkość w osi x
      this.dy = 2; // prędkość w osi y
    }
  
    update(canvasWidth, canvasHeight) {
      this.x += this.dx;
      this.y += this.dy;
  
      // Odbijanie od krawędzi ekranu
      if (this.x <= 0 || this.x + this.size >= canvasWidth) {
        this.dx *= -1;
      }
      if (this.y <= 0 || this.y + this.size >= canvasHeight) {
        this.dy *= -1;
      }
    }
  
    draw(ctx) {
      ctx.fillStyle = this.color;
      ctx.fillRect(this.x, this.y, this.size, this.size);
    }
  }
  function detectCollision(obj1, obj2) {
    return (
      obj1.x < obj2.x + obj2.size &&
      obj1.x + obj1.size > obj2.x &&
      obj1.y < obj2.y + obj2.size &&
      obj1.y + obj1.size > obj2.y
    );
  }
  
  function handleCollision() {
    alert('Kolizja wykryta!');
  }
  const canvas = document.getElementById('gameCanvas');
  const ctx = canvas.getContext('2d');
  
  const player = new FlyingObject(50, 50, 30, 'blue');
  const enemy = new AutonomousObject(200, 200, 30, 'red');
  
  function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  
    player.draw(ctx);
    enemy.update(canvas.width, canvas.height);
    enemy.draw(ctx);
  
    if (detectCollision(player, enemy)) {
      handleCollision();
    }
  
    requestAnimationFrame(gameLoop);
  }
  
  gameLoop();
      