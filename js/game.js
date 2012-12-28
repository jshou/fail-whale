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

define(['easel', 'keypress', 'whale', 'shark'], function(createjs, k, Whale, Shark) {
  var Game = function(finish) {
    var WHALE_HEIGHT = 98;
    var WHALE_WIDTH = 173;
    var WHALE_SPEED = 1;
    var WHALE_COLOR = 'rgba(255,0,0,1)';
    var WHALE_JUMP_VELOCITY = 12.7;
    var WHALE_GRAVITY = -0.2;

    var SHARK_SIZE = 50;
    var SHARK_SPEED = 3;
    var SHARK_COLOR = 'rgba(0,0,255,1)';
    var SHARK_SQUISH = 8; // how many pixels overlap does the shark get before collision

    var MAX_JUMP = 2.3 * SHARK_SIZE;
    var ENOUGH_SPACE = 1.8 * WHALE_WIDTH;
    var CHANCE_OF_SHARKS = 0.008;


    var canvas = $('.main')[0];
    var stage = new createjs.Stage(canvas);

    var guid = function(){
      return Math.random().toString(16);
    };

    var lose = function() {
      var text = new createjs.Text("You fail!", "50px Arial", "#000000");
      text.x = 300;
      text.y = 160;
      stage.addChild(text);
      finish();
    }

    var whale = new Whale(stage, {
      height: WHALE_HEIGHT,
      width: WHALE_WIDTH,
      speed: WHALE_SPEED,
      color: WHALE_COLOR,
      jumpVelocity: WHALE_JUMP_VELOCITY,
      gravity: WHALE_GRAVITY,
    });

    k.combo('space', function() {
      whale.jump();
    });

    var firstShark = new Shark(stage, {
      size: SHARK_SIZE,
      speed: SHARK_SPEED,
      color: SHARK_COLOR,
      squish: SHARK_SQUISH,
    });
    var lastShark = firstShark;
    var sharks = {first: firstShark};

    stage.tick = function() {
      whale.tick();

      // process all the sharks
      for (id in sharks) {
        var shark = sharks[id];
        shark.tick();

        // delete the shark once it goes off screen
        if (shark.right() < 0) {
          shark.destroy();
          delete sharks[id];
        }

        // lose!
        if (shark.collide(whale)) {
          createjs.Ticker.removeAllListeners();
          lose();
        }
      }

      // randomly create sharks
      if (Math.random() < CHANCE_OF_SHARKS) {
        var closeEnough = (canvas.width - firstShark.left() + SHARK_SIZE) < MAX_JUMP;
        var farEnoughAway = (canvas.width - lastShark.right()) > ENOUGH_SPACE;

        // only spawn a shark if the new shark would be close enough to the first
        // shark in a group that the whale could still jump over
        // OR
        // the last shark is far enough away that the whale has space to land
        if (closeEnough || farEnoughAway) {
          var newShark = new Shark(stage, {
            size: SHARK_SIZE,
            speed: SHARK_SPEED,
            color: SHARK_COLOR,
            squish: SHARK_SQUISH,
          });

          sharks[guid()] = newShark;
          lastShark = newShark;

          // reset first shark if current first shark is far enough over for whale
          // to jump over AND have enough space to land
          if (firstShark.right() < (canvas.width - MAX_JUMP - ENOUGH_SPACE)) {
            firstShark = newShark;
          }
        }
      }

      this.update();
    };

    createjs.Ticker.setFPS(60);
    createjs.Ticker.useRAF = true;
    createjs.Ticker.addListener(stage);
  }

  return Game;
});

