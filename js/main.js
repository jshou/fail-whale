require(['game'], function(Game) {
  $('.start').on('click', function() {
    $('canvas').remove();
    $('.start').hide();
    $('.container').append($('<canvas class="main" height="500" width="800"></canvas>'));

    Game(function() {
      $('.start').show();
      $('.start').val('Play again');
    });
  });
});
