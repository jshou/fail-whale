require.config({
  shim: {
    easel: {
      exports: 'createjs'
    }
  },
  paths: {
    easel: 'easeljs-0.5.0.min'
  }
});

require(['easel'], function(createjs) {
  debugger;
});
