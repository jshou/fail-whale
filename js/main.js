require.config({
  shim: {
    easel: {
      exports: 'createjs'
    },
  },
  paths: {
    easel: 'easeljs-0.5.0.min',
    keypress: 'keypress',
  }
});

require(['easel', 'whale', 'shark'], function(createjs, Whale, Shark) {
  var canvas = $('.main')[0];
  var stage = new createjs.Stage(canvas);

  var guid = function(){
    return Math.random().toString(16);
  };


  var whale = new Whale(canvas, stage, 20);
  var sharks = {};

  sharks[guid()] = new Shark(canvas, stage, 30);

  stage.tick = function() {
    whale.tick();

    for (id in sharks) {
      var shark = sharks[id];
      shark.tick();

      // delete the shark once it goes off screen
      if (shark.right() < 0) {
        shark.destroy();
        delete sharks[id];
      }
    }

    this.update();
  };

  createjs.Ticker.setFPS(60);
  createjs.Ticker.useRAF = true;
  createjs.Ticker.addListener(stage);
});
