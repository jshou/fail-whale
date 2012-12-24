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

define(['easel'], function(createjs) {
  var Shark = function(stage, opts) {
    this.stage = stage;
    this.size = opts.size;

    this.speed = opts.speed;
    this.color = opts.color;

    // draw animated whale
    var sharkImage = new Image();
    sharkImage.src = 'images/shark.png';
    var spriteSheet = new createjs.SpriteSheet({
      // image to use
      images: [sharkImage],
      // width, height & registration point of each sprite
      frames: {width: 55, height: 55},
      animations: {
        swim: { // three frames per tick, slows down the animation
          frames:[0]
        }
      }
    });
    this.shape = new createjs.BitmapAnimation(spriteSheet);
    this.shape.y = this.stage.canvas.height - this.size;;
    this.shape.x = this.stage.canvas.width;
    this.shape.gotoAndPlay("swim");

    this.stage.addChild(this.shape);
  };

  Shark.prototype.left = function() {
    return this.shape.x;
  };

  Shark.prototype.right = function() {
    return this.shape.x + this.size;
  };

  Shark.prototype.height = function() {
    return this.stage.canvas.height - this.size;
  };

  Shark.prototype.top = function() {
    return this.shape.y;
  };

  Shark.prototype.tick = function() {
    this.shape.x -= this.speed;
  };

  Shark.prototype.destroy = function() {
    this.shape.visible = false;
  };

  Shark.prototype.collide = function(w) {
    return this.overlap(w) && (this.top() < w.bottom());
  }

  Shark.prototype.overlap = function(w) {
    var leftOverlap = this.left() <= w.right() && this.left() >= w.left();
    var rightOverlap = this.right() <= w.right() && this.right() >= w.left();

    return (leftOverlap || rightOverlap);
  }

  return Shark;
});
