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
    console.log('Player init')
};

Player.prototype.place = function() {
    //home position for player token
    let col = 3;
    let row = 5;
    this.x = (ctx.canvas.width / columns) * (col-1);
    this.y = (ctx.canvas.height / rows) * (row-1);

};

Player.prototype.update = function(dt) {

};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(KEY_STATUS) {

    let offsetToCenter = 18;
    let squareHeight = (ctx.canvas.height / rows) - offsetToCenter;
    let squareWidth = ctx.canvas.width / columns;

    if (KEY_STATUS=='left') {
        this.x -= squareWidth
        // if (this.x <= 0) // Kep player within the screen
        //     this.x = 0;
    } else if (KEY_STATUS=='right') {
        this.x += squareWidth
        // if (this.x >= this.canvasWidth - this.width)
        //     this.x = this.canvasWidth - this.width;
    } else if (KEY_STATUS=='up') {
        this.y -= squareHeight;
        // if (this.y <= this.canvasHeight/4*3)
        //     this.y = this.canvasHeight/4*3;
    } else if (KEY_STATUS=='down') {
        this.y += squareHeight;
        // if (this.y >= this.canvasHeight - this.height)
        //     this.y = this.canvasHeight - this.height;
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
