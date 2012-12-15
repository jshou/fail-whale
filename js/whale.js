require.config({
  shim: {
    easel: {
      exports: 'createjs'
    },

    keypress: {
      exports: 'keypress'
    },
  },
  paths: {
    easel: 'easeljs-0.5.0.min',
    keypress: 'keypress',
  }
});

define(['easel', 'keypress'], function(createjs, k) {
  var Whale = function(canvas, stage, size) {
    // attributes
    var forward = true;
    var speed = 1;
    var color = 'rgba(255,0,0,1)';
    var jumpVelocity = 5;
    var gravity = -0.1;
    var lastJump = 0;

    // initialize shape
    var shape = new createjs.Shape();
    shape.graphics.beginFill(color).drawRect(0,0, size, size);
    stage.addChild(shape);
    shape.y = stage.canvas.height - size;
    shape.x = stage.canvas.width / 2 - size / 2;

    k.combo('space', function() {
      if (!lastJump) {
        lastJump = 1;
      }
    });

    // tick function
    var tick = function() {
      // handle jump
      if (lastJump) {
        var height = jumpVelocity * lastJump + 0.5 * gravity*Math.pow(lastJump, 2);
        shape.y = canvas.height - size - height;
        lastJump++;

        if (shape.y > stage.canvas.height - size) {
          lastJump = 0;
          shape.y = stage.canvas.height - size;
        }
      }

      // bounce back and forth
      if (shape.x + size >= canvas.width || shape.x < 0) {
        forward = !forward;
      }

      if (forward) {
        shape.x += speed;
      } else {
        shape.x -= speed;
      }
    };

    return {
      shape: shape,
      tick: tick
    };
  };

  return Whale;
});
