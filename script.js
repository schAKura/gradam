window.onload = function() {
    class MovingObject {
      constructor(elementId, x, y, size, speed = 5) {
        this.element = document.getElementById(elementId);
        this.x = x;
        this.y = y;
        this.size = size;
        this.speed = speed;
        this.updatePosition();
      }
  
      updatePosition() {
        this.element.style.left = this.x + 'px';
        this.element.style.top = this.y + 'px';
      }
    }
  
    class Player extends MovingObject {
      constructor(elementId, x, y, size) {
        super(elementId, x, y, size);
        document.addEventListener('keydown', this.move.bind(this));
      }
  
      move(event) {
        switch(event.key) {
            case 'ArrowUp':
                if(this.y != 0)
                    this.y -= this.speed;
                break;
            case 'ArrowDown':
                if(this.y != 570)
                    this.y += this.speed;
              break;
            case 'ArrowLeft':
                if(this.x != 0)
                    this.x -= this.speed;
              break;
            case 'ArrowRight':
                if(this.x != 770)
                    this.x += this.speed;
              break;
          }
        this.updatePosition();
      }
    }
  
    class AutonomousObject extends MovingObject {
      constructor(elementId, x, y, size) {
        super(elementId, x, y, size);
        this.dx = 1;
        this.dy = 1;
      }
  
      update(canvasWidth, canvasHeight, targetX, targetY) {
        if (this.x < targetX) {
          this.x += this.dx;
        } else if (this.x > targetX) {
          this.x -= this.dx;
        }
  
        if (this.y < targetY) {
          this.y += this.dy;
        } else if (this.y > targetY) {
          this.y -= this.dy;
        }
  
        if (this.x <= 0 || this.x + this.size >= canvasWidth) {
          this.dx *= -1;
        }
        if (this.y <= 0 || this.y + this.size >= canvasHeight) {
          this.dy *= -1;
        }
  
        this.updatePosition();
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
      alert('Policja złapała czarnucha!');
    }
  
    const player = new Player('player', 50, 50, 30);
    const police = new AutonomousObject('police', 200, 200, 30);
  
    function gameLoop() {
      const gameArea = document.getElementById('gameArea');
      const canvasWidth = gameArea.clientWidth;
      const canvasHeight = gameArea.clientHeight;
  
      police.update(canvasWidth, canvasHeight, player.x, player.y);
  
      if (detectCollision(player, police)) {
        handleCollision();
      }
  
      requestAnimationFrame(gameLoop);
    }
  
    gameLoop();
  }
  