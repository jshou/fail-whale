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

    // attributes
    this.forward = true;
    this.speed = opts.speed;
    this.color = opts.color;
    this.jumpVelocity = opts.jumpVelocity;
    this.gravity = opts.gravity;
    this.lastJump = 0;

    // initialize shape
    this.shape = new createjs.Shape();
    this.shape.graphics.beginFill(this.color).drawRect(0,0, this.size, this.size);
    this.shape.y = this.stage.canvas.height - this.size;
    this.shape.x = this.stage.canvas.width / 2 - this.size / 2;
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
    return this.shape.x + this.size;
  },

  Whale.prototype.bottom = function() {
    return this.shape.y + this.size;
  },

  Whale.prototype.tick = function() {
    if (this.lastJump) {
      var height = this.jumpVelocity * this.lastJump + 0.5 * this.gravity * Math.pow(this.lastJump, 2);
      this.shape.y = this.stage.canvas.height - this.size - height;
      this.lastJump++;

      if (this.shape.y > this.stage.canvas.height - this.size) {
        this.lastJump = 0;
        this.shape.y = this.stage.canvas.height - this.size;
      }
    }
  }

  return Whale;
});
