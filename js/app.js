// Enemies our player must avoid
var Enemy = function(currentRow) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.imageOffset = 18;
    this.currentRow = currentRow;
    this.speed = Math.floor(Math.random() * (+6 - +2)) + +2;
    this.hitWidth = 90;
    this.hitHeight = 40;
};

Enemy.prototype.place = function() {
    let col = 1;
    this.x = imageWidth * (col-1);
    this.y = (imageHeight * (this.currentRow-1)) - this.imageOffset;
    //console.log(this.currentRow-1)
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x +=((this.speed*100)*dt);
    if(this.x > ctx.canvas.width) {
      this.x = -(Math.floor(Math.random() * (+500 - +1)) + +1);
      this.speed = Math.floor(Math.random() * (+6 - +2)) + +2;
    }
    //this.checkCollisions();
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.hitWidth = 90;
    this.hitHeight = 40;
    this.imageOffset = 9;
    this.isColliding = false;
    this.hasCrossed = false;
    this.crossings = 0;
    this.lives = 3;
};

Player.prototype.place = function() {
    //home position for player token
    let col = 3;
    let row = 6;
    this.x = imageWidth * (col-1);
    this.y = (imageHeight * (row-1)) - this.imageOffset;

};

Player.prototype.update = function(dt) {


    if (this.isColliding) {
      console.log('got hit!');
      //move token back to home
      this.place();
      //reset flag
      this.isColliding = false;
      //remove one life
      this.lives -= 1;

      if(this.lives == 0) {
        console.log('game over')
        callModal('game_over');
      }

      this.updateScore();

    }

    if (this.hasCrossed) {
      console.log('crossed!');
      //add one crossing
      this.crossings +=1;
      //move token back to home
      this.place();
      //reset flag
      this.hasCrossed = false;

      if(this.crossings == 5) {
        console.log('you win')
        callModal('win');
      }

      this.updateScore();
    }
};

Player.prototype.updateScore = function() {

  console.log('updateScore')
  let lives = document.querySelector('.lives');
  let crossings = document.querySelector('.crossings');

  lives.textContent = this.lives;
  crossings.textContent = this.crossings;

}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(KEY_STATUS) {

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

}

var callModal = function(state) {

  console.log('state = ' + state);

  let modal = document.getElementById('myModal');
  let modalText = document.querySelector('.modalText');
  let playAgain = document.getElementById("playAgain");

  if (state === 'intro') {

      modalText.innerHTML = '<h2>Welcome to Frogger.</h2><p>The object of this game is to get your frog across traffic <b>five</b> times in <b>30</b> seconds.</p><p>You have <b>three</b> lives to make it happen!</p>';
      playAgain.textContent = 'start game';
  }

  if (state === 'game_over') {
    if(player.crossings > 0) {
      modalText.textContent = `Nice try but the bugs were too fast. You did mangage to make ${player.crossings} crossings.`;
    }else{
      modalText.textContent = `Nice try but the bugs were too fast.`;
    }
    playAgain.textContent = 'play again';
  }

  if (state === 'win') {
      modalText.textContent = `Nice job frog!`;
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
      player.updateScore();

      //start countdown timer
      display = document.querySelector('#time');
      startTimer(1, display);
  }
}

var startTimer = function (duration, display) {
  console.log('start timer')
    var timer = duration, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10)
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            timer = duration;
            callModal('game_over');
            clearInterval(startTimer);
        }
    }, 1000);
}
//
callModal('intro');
