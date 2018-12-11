"use strict";

class Character {

  constructor() {
    this.speed = Math.floor(Math.random() * (+6 - +2)) + +2;
    //tweak hit width and height for collision
    this.hitWidth = 90;
    this.hitHeight = 40;
  }

  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }

}

class Enemy extends Character {

  constructor(currentRow) {
    super();
    this.imageOffset = 18;
    this.sprite = 'images/enemy-bug.png';
    this.currentRow = currentRow;
  }

  place() {
    let col = 1;
    this.x = imageWidth * (col-1);
    this.y = (imageHeight * (this.currentRow-1)) - this.imageOffset;
  }

  update(dt) {
    this.x +=((this.speed*100)*dt);
    //puts enemies back to home position and generates a randon speed
    if(this.x > ctx.canvas.width) {
      this.x = -(Math.floor(Math.random() * (+500 - +1)) + +1);
      this.speed = Math.floor(Math.random() * (+6 - +2)) + +2;
    }
  }

}

class Player extends Character {
    constructor(){
      super();
      this.sprite = 'images/char-boy.png';
      this.imageOffset = 9;
      this.isColliding = false;
      this.hasCrossed = false;
      this.crossings = 0;
      this.lives = 3;
    }

    place() {
      let col = 3;
      let row = 6;
      this.x = imageWidth * (col-1);
      this.y = (imageHeight * (row-1)) - this.imageOffset;
    }

    update(dt) {
      //collision trigger
      if (this.isColliding) {
        //move token back to home
        this.place();
        //reset flag
        this.isColliding = false;
        //remove one life
        this.lives -= 1;

        if(this.lives == 0) {
          callModal('game_over');
        }

        this.updateScore();

      }

      //crossing trigger
      if (this.hasCrossed) {
        //add one crossing
        this.crossings +=1;
        //move token back to home
        this.place();
        //reset flag
        this.hasCrossed = false;

        if(this.crossings == 5) {
          callModal('win');
        }

        this.updateScore();
      }

    }

    updateScore() {
      let lives = document.querySelector('.lives');
      let crossings = document.querySelector('.crossings');

      lives.textContent = this.lives;
      crossings.textContent = this.crossings;
    }

    handleInput(KEY_STATUS) {
      if (KEY_STATUS=='left') {
          this.x -= imageWidth
          if (this.x <= 0)
              this.x = 0;
      } else if (KEY_STATUS=='right') {
          this.x += imageWidth
          if (this.x >= ctx.canvas.width - imageWidth)
              this.x = ctx.canvas.width - imageWidth;
      } else if (KEY_STATUS=='up') {
          this.y -= imageHeight;
            if (this.y <= -this.imageOffset)
                this.y = -this.imageOffset;
      } else if (KEY_STATUS=='down') {
          this.y += imageHeight;
          if ((this.y >= ((rows-1) * imageHeight) - this.imageOffset))
              this.y = ((rows-1) * imageHeight) - this.imageOffset;
      }
    }
}


// Now instantiate your objects.
const enemyOne = new Enemy(2);
const enemyTwo = new Enemy(3);
const enemyThree = new Enemy(4);
// Place all enemy objects in an array called allEnemies
const allEnemies = [enemyOne, enemyTwo, enemyThree];

// Place the player object in a variable called player
const player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

var initGame = function() {

  player.place();

  allEnemies.forEach(function(enemy) {
      enemy.place();
  });

};

//modal window has three states: intro, game_over and win
var callModal = function(state) {

  let modal = document.getElementById('myModal');
  let modalText = document.querySelector('.modalText');
  let playAgain = document.getElementById("playAgain");
  let gameTime = document.getElementById('time').innerHTML;

  if (state === 'intro') {

      modalText.innerHTML = '<h2>Welcome to Frogger.</h2><p>The object of this game is to get your frog across traffic <b>five</b> times in <b>30</b> seconds.</p><p>You have <b>three</b> lives to make it happen!</p>';
      playAgain.textContent = 'start game';
  }

  if (state === 'game_over') {

    clearInterval(gameClock);

    if(player.crossings > 0) {
      modalText.textContent = `Nice try but the bugs were too fast. You did mangage to make ${player.crossings} crossing(s).`;
    }else{
      modalText.textContent = `Nice try but the bugs were too fast.`;
    }
    playAgain.textContent = 'play again';
  }

  if (state === 'win') {
      clearInterval(gameClock);
      modalText.textContent = `Nice job frog! You won with ${gameTime} seconds to spare and ${player.lives} lives remaining.`;
      playAgain.textContent = 'play again';
  }

  modal.style.display = "block";

  playAgain.onclick = function() {
      modal.style.display = "none";
      //clear stats
      player.crossings = 0;
      player.lives = 3;
      if(state == 'intro'){
        initGame();
      }

      //start countdown timer
      let display = document.getElementById('time');
      console.log('display: ' + document.getElementById('time'))
      startTimer(30, display);

      player.updateScore();
  }
}

//simple countdown timer
var startTimer = function (duration, display) {
  console.log('start timer')
    let timer = duration, minutes, seconds;
        gameClock = setInterval(function () {
        minutes = parseInt(timer / 60, 10)
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            timer = duration;
            callModal('game_over');
        }
    }, 1000);
}
//
callModal('intro');
