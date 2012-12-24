require.config({
  shim: {
    easel: {
      exports: 'createjs'
    },
  },
  paths: {
    easel: 'easeljs-0.5.0.min',
  }
});

define(['easel', 'keypress'], function(createjs) {
  var Whale = function(stage, opts) {
    this.stage = stage;
    this.size = opts.size;
    this.height = opts.height;
    this.width = opts.width;

    // attributes
    this.forward = true;
    this.speed = opts.speed;
    this.color = opts.color;
    this.jumpVelocity = opts.jumpVelocity;
    this.gravity = opts.gravity;
    this.lastJump = 0;

    // draw animated whale
    var whaleImage = new Image();
    whaleImage.src = 'images/whale.png';
    var spriteSheet = new createjs.SpriteSheet({
      // image to use
      images: [whaleImage],
      // width, height & registration point of each sprite
      frames: {width: 173, height: 98},
      animations: {
        swim: { // three frames per tick, slows down the animation
          frames:[0,0,0,1,1,1,2,2,2,3,3,3,4,4,4,5,5,5,6,6,6,7,7,7,8,8,8,9,9,9,10,10,10,11,11,11,11,12,12,12]
        }
      }
    });
    this.shape = new createjs.BitmapAnimation(spriteSheet);
    this.shape.y = this.stage.canvas.height - this.height;;
    this.shape.x = this.stage.canvas.width / 2 - this.width / 2;
    this.shape.gotoAndPlay("swim");

    this.stage.addChild(this.shape);
  };

  Whale.prototype.jump = function() {
    if (!this.lastJump) {
      this.lastJump = 1;
    }
  };

  Whale.prototype.left = function() {
    return this.shape.x;
  };

  Whale.prototype.right = function() {
    return this.shape.x + this.width;
  },

  Whale.prototype.bottom = function() {
    return this.shape.y + this.height;
  },

  Whale.prototype.tick = function() {
    if (this.lastJump) {
      var height = this.jumpVelocity * this.lastJump + 0.5 * this.gravity * Math.pow(this.lastJump, 2);
      this.shape.y = this.stage.canvas.height - this.height - height;
      this.lastJump++;

      if (this.shape.y > this.stage.canvas.height - this.height) {
        this.lastJump = 0;
        this.shape.y = this.stage.canvas.height - this.height;
      }
    }
  }

  return Whale;
});
