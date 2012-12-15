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
  var Shark = function(stage, size) {
    this.stage = stage;
    this.size = size;

    this.speed = 3;
    this.color = 'rgba(0,0,255,1)';

    // initialize shape
    this.shape = new createjs.Shape();
    this.shape.graphics.beginFill(this.color).drawRect(0,0, this.size, this.size);
    this.shape.y = this.stage.canvas.height - this.size;
    this.shape.x = this.stage.canvas.width;
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

  return Shark;
});

