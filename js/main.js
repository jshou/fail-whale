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

require(['easel', 'keypress', 'whale', 'shark'], function(createjs, k, Whale, Shark) {
  var WHALE_SIZE = 70;
  var WHALE_SPEED = 1;
  var WHALE_COLOR = 'rgba(255,0,0,1)';
  var WHALE_JUMP_VELOCITY = 18;
  var WHALE_GRAVITY = -0.4;

  var SHARK_SIZE = 50;
  var SHARK_SPEED = 3;
  var SHARK_COLOR = 'rgba(0,0,255,1)';


  var canvas = $('.main')[0];
  var stage = new createjs.Stage(canvas);
  var chanceOfSharks = 0.008;

  var guid = function(){
    return Math.random().toString(16);
  };

  var collide = function(s, w) {
    var sharkLeftOverlap = s.left() <= w.right() && s.left() >= w.left();
    var sharkRightOverlap = s.right() <= w.right() && s.right() >= w.left();

    return (sharkLeftOverlap || sharkRightOverlap) && (s.top() < w.bottom());
  }

  var lose = function() {
    var text = new createjs.Text("You lose!", "50px Arial", "#000000");
    text.x = 300;
    text.y = 180;
    stage.addChild(text);
  }

  var whale = new Whale(stage, {
    size: WHALE_SIZE,
    speed: WHALE_SPEED,
    color: WHALE_COLOR,
    jumpVelocity: WHALE_JUMP_VELOCITY,
    gravity: WHALE_GRAVITY,
  });

  k.combo('space', function() {
    whale.jump();
  });

  var sharks = {};

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
      if (collide(shark, whale)) {
        createjs.Ticker.removeAllListeners();
        lose();
      }
    }

    // randomly create sharks
    if (Math.random() < chanceOfSharks) {
      sharks[guid()] = new Shark(stage, {
        size: SHARK_SIZE,
        speed: SHARK_SPEED,
        color: SHARK_COLOR
      });
    }

    this.update();
  };

  createjs.Ticker.setFPS(60);
  createjs.Ticker.useRAF = true;
  createjs.Ticker.addListener(stage);
});
