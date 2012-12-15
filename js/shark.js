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
  var Shark = function(canvas, stage, size) {
    // attributes
    var speed = 0.5;
    var color = 'rgba(0,0,255,1)';
    var frozen = false;

    // initialize shape
    var shape = new createjs.Shape();
    shape.graphics.beginFill(color).drawRect(0,0, size, size);
    stage.addChild(shape);
    shape.y = stage.canvas.height - size;
    shape.x = stage.canvas.width;

    // tick function
    var tick = function() {
      if (!frozen) {
        shape.x -= speed;
      }
    };

    var destroy = function() {
      shape.visible = false;
    };

    var left = function() {
      return shape.x;
    }

    var right = function() {
      return shape.x + size;
    }

    var height = function() {
      return canvas.height - size;
    }

    var freeze = function() {
      frozen = true;
    }

    return {
      left: left,
      right: right,
      freeze: freeze,
      height: height,
      tick: tick,
      destroy: destroy,
    };
  };

  return Shark;
});

