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

require(['easel', 'whale'], function(createjs, Whale) {
  var canvas = $('.main')[0];
  var stage = new createjs.Stage(canvas);


  var whale = new Whale(canvas, stage);

  stage.tick = function() {
    whale.tick();
    this.update();
  };

  createjs.Ticker.setFPS(60);
  createjs.Ticker.useRAF = true;
  createjs.Ticker.addListener(stage);
});
