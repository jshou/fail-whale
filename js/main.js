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


  var whale = new Whale(canvas, stage, 20);
  var sharks = [];

  sharks.push(new Shark(canvas, stage, 30));

  stage.tick = function() {
    whale.tick();
    sharks.forEach(function(shark) {
      shark.tick();
    });

    this.update();
  };

  createjs.Ticker.setFPS(60);
  createjs.Ticker.useRAF = true;
  createjs.Ticker.addListener(stage);
});
