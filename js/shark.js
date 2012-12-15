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
    var speed = 3;
    var color = 'rgba(0,0,255,1)';
    var frozen = false;

    // initialize shape
    var shape = new createjs.Shape();
    shape.graphics.beginFill(color).drawRect(0,0, size, size);
    stage.addChild(shape);
    shape.y = stage.canvas.height - size;
    shape.x = stage.canvas.width;

    return {
      left: function() {
        return shape.x;
      },

      right: function() {
        return shape.x + size;
      },

      freeze: function() {
        frozen = true;
      },

      height: function() {
        return canvas.height - size;
      },

      top: function() {
        return shape.y;
      },

      tick: function() {
        if (!frozen) {
          shape.x -= speed;
        }
      },

      destroy: function() {
        shape.visible = false;
      },
    };
  };

  return Shark;
});

