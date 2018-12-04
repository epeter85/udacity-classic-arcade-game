// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
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
    this.imageOffset = 9;
};

Player.prototype.place = function() {
    //home position for player token
    let col = 3;
    let row = 6;
    this.x = imageWidth * (col-1);
    this.y = (imageHeight * (row-1)) - this.imageOffset;

};

Player.prototype.update = function(dt) {

};

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
      console.log(ctx.canvas.height, this.y)
        this.y += imageHeight;
        if ((this.y >= ((rows-1) * imageHeight) - this.imageOffset))
            this.y = ((rows-1) * imageHeight) - this.imageOffset;
    }

}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
const enemyOne = new Enemy();
const allEnemies = [];

// Place the player object in a variable called player
const player = new Player();

//console.log(window)
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
