class Game {
  static init(userId, difficulty) {
    this.main = document.getElementById('main')
    this.state = {
      userId: userId,
      score: 0,
      difficulty: difficulty,
      level: 1
    }
    this.gc = {}
    this.canvas = {}
    this.ctx = {}
    this.currentScore = {}
    this.cellSize = 40
    this.speed = 10
    this.snake = {}
    this.food = {}
    this.icons = ["android", "csharp", "git", "github", "golang", "html5", "javascript", "jsx", "laravel", "node", "python", "react", "ruby", "sass", "sql", "swift", "unity", "vim", "vscode"]
    this.play

    this.draw = this.draw.bind(this);
    this.controller = this.controller.bind(this);
  }
  

  static setup(difficulty) {
    this.main.innerHTML = `
      <h1 class="not-dis">${this.currentScore}</h1>
      <div id="game-container">
        <canvas id="game" width='1600' height='800'></canvas>
      </div>
    `
    this.gc = document.getElementById('game-container')
    this.currentScore = document.querySelector('h1')
    this.currentScore.innerHTML = "Score: 0"
    this.canvas = document.getElementById("game");
    this.canvas.height = innerHeight - 10
    window.addEventListener('resize', () => {
      this.canvas.height = innerHeight - 10
    })
    this.ctx = this.canvas.getContext('2d');

    this.speed = difficulty*5
    this.snake = new Snake()

    document.addEventListener('keydown', this.controller)

    this.spawnFood()
  }

  static draw() {
    this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height);
    
    this.ctx.fillStyle = "#14191B";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
    if (this.snake.death()){
      clearInterval(this.play)
      API.addScore({user_id: this.state.userId, points: this.state.score})
      this.gameOver()
    };
    
    this.snake.update();
    this.snake.draw();
    
    if (this.snake.eat(this.food)){
      this.spawnFood();
      this.state.score+=10;
      if (this.state.score%100 === 0) {
        this.state.level++;
        this.update();
      }
    }

    //Drawing the food
    this.ctx.beginPath();
    let image = new Image()
    image.src = Game.food.imgSrc
    this.ctx.drawImage(image, Game.food.x, Game.food.y, Game.cellSize, Game.cellSize)
    this.ctx.closePath();    

    this.currentScore.innerHTML = `Score: ${this.state.score}`
  }
  
  static start() {
    this.state.score = 0;
    this.play = setInterval(this.draw, 1000/this.speed / (1 + (this.state.level/ 5)));
  }
  
  static update() {
    clearInterval(this.play);
    this.play = setInterval(this.draw, 1000/this.speed / (1 + (this.state.level/ 5)));
  }

  static spawnFood() {
    let cols = Math.floor(this.canvas.width/Game.cellSize);
    let rows = Math.floor(this.canvas.height/Game.cellSize);
    this.food = new Food(cols,rows);  
  }

  static controller(e) {
    if (e.keyCode === 38) {
      if (this.snake.ySpeed === 0) {
        this.snake.move(0, -1);   
      }
    } else if (e.keyCode === 40) {
      if (this.snake.ySpeed === 0) {
       this.snake.move(0, 1); 
      }
    } else if (e.keyCode === 39) {
      if (this.snake.xSpeed === 0) {
        this.snake.move(1, 0);
      }
    } else if (e.keyCode === 37) {
      if (this.snake.xSpeed === 0) {
       this.snake.move(-1, 0); 
      }
    }
  }

  static gameOver() {
    let gameOverBox = document.createElement('div')
    gameOverBox.id = "game-over"
    gameOverBox.innerHTML = `
      <div id="game-over-inner">
        <h2>GAME OVER</h2>
        <button class="" id="play-again">Play Again</button>
        <button class="" id="view-scoreboard">View Scoreboard</button>
      </div>
    `
    let h1 = document.querySelector('h1')
    h1.classList.remove('not-dis')
    this.gc.appendChild(gameOverBox)
    gameOverBox.addEventListener('click', (e) => {
      if (e.target.id === "play-again") {
        gameOverBox.remove()
        this.render()
      } else if (e.target.id === "view-scoreboard") {
        SetupScreen.controller.classList.remove("setup")
        SetupScreen.controller.classList.remove("trained")
        ScoreBoard.render()
      }
    })
  }

  static render () {
    this.setup(this.state.difficulty)
    this.start()
  }
}


class Snake {
  constructor() {
    this.x = (Math.floor(Game.canvas.width/Game.cellSize)*Game.cellSize / 2) - 200;
    this.y = (Math.floor(Game.canvas.width/Game.cellSize)*Game.cellSize / 2) - 200;
    this.xSpeed = 1;
    this.ySpeed = 0;
    this.total = 1;
    this.tail = [];
  }
  
  update() {
    if (this.total === this.tail.length) {
      for (let i = 0; i < this.tail.length - 1; i++) {
        this.tail[i] = this.tail[i + 1];
      } 
    }
    this.tail[this.total - 1] = new Block(this.x, this.y);
    
    this.x = this.x + this.xSpeed*Game.cellSize;
    this.y = this.y + this.ySpeed*Game.cellSize;
}
  
  eat(food) {
    let distance = Math.hypot(this.x - food.x, this.y - food.y);
    if (distance < 1) {
      this.total++;
      return true;
    } else {
      return false;
    }
  }
  
  move(x, y) {
    this.xSpeed = x;
    this.ySpeed = y;
  }
  
  death() {
    let dead = false
    
    for (let i = 0; i < this.tail.length; i++) {
      let pos = this.tail[i];
      let distance = Math.hypot(this.x -  pos.x, this.y - pos.y);
      if (distance < 1) {
        dead = true
      }
    }

    if ((this.x + this.xSpeed * Game.cellSize) < 0 || 
        (this.y + this.ySpeed * Game.cellSize) < 0 || 
        (this.x + this.xSpeed * Game.cellSize) > Game.canvas.width || 
        (this.y + this.ySpeed * Game.cellSize) > Game.canvas.height) {
      dead = true
    }
    
    return dead;
  }
  
  respawn() {
    this.total = 1;
    this.tail = [];
    this.x = Math.floor(Math.random()* Math.floor(Game.canvas.width/Game.cellSize))*Game.cellSize;
    this.y = Math.floor(Math.random()* Math.floor(Game.canvas.height/Game.cellSize))*Game.cellSize;
  }
  
  draw() {
    // Game.ctx.fillStyle = "#fff";
    for (let i = 0; i < this.tail.length; i++) {
      switch (i) {
        case (this.tail.length - 1):
          Game.ctx.fillStyle = `rgba(124,252,0, 1)`;
          break;
        case (this.tail.length - 2):
          Game.ctx.fillStyle = `rgba(124,252,0, 0.9)`;
          break;
        case (this.tail.length - 3):
          Game.ctx.fillStyle = `rgba(124,252,0, 0.85)`;
          break;
        case (this.tail.length - 4):
          Game.ctx.fillStyle = `rgba(124,252,0, 0.8)`;
          break;
        case (this.tail.length - 5):
          Game.ctx.fillStyle = `rgba(124,252,0, 0.75)`;
          break;
        case (this.tail.length - 6):
          Game.ctx.fillStyle = `rgba(124,252,0, 0.7)`;
          break;
        case (this.tail.length - 7):
          Game.ctx.fillStyle = `rgba(124,252,0, 0.65)`;
          break;
        case (this.tail.length - 8):
          Game.ctx.fillStyle = `rgba(124,252,0, 0.5)`;
          break;
        case (this.tail.length - 9):
          Game.ctx.fillStyle = `rgba(124,252,0, 0.45)`;
          break;
        default:
          Game.ctx.fillStyle = `rgba(124,252,0, 0.4)`;
          break;
      }
      Game.ctx.beginPath();
      Game.ctx.rect(this.tail[i].x, this.tail[i].y, Game.cellSize, Game.cellSize);
      Game.ctx.fill();
      Game.ctx.closePath();
    }
    
    Game.ctx.beginPath();
    Game.ctx.fillRect(this.x, this.y, Game.cellSize, Game.cellSize);
    Game.ctx.closePath();
  }
}

class Block {
  constructor(x,y){
    this.x = x;
    this.y = y;
  }  
}

class Food {
  constructor(cols,rows){
    this.imgSrc = `img/${Game.icons[Math.floor((Math.random() * 18) + 1)]}.png`
    this.x = Math.floor(Math.random()*cols)*Game.cellSize;
    this.y = Math.floor(Math.random()*rows)*Game.cellSize;
  }  
}
