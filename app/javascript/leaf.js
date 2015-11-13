(function() {
  window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || function( callback ) {
    window.setTimeout(callback, 1000 / 60);
  };

  var leaf = document.getElementById('leaf'),
      x    = 0,
      y    = 0,
      theta = 0,
      w    = window.innerWidth,
      process = 1;

  setTimeout(function() {
    fall();
  }, 2000);

  function fall() {
    var mid = ( w - 40 ) / 2;
    
    if ( process == 1 || process == 3 ) {
      y = computeY(x, 20);
      update(x, y);
      x = ( process == 1 ) ? ( x + 5 ) : ( x + 5 ) ;
      if ( process == 1 && ( x >= mid - 20 ) ) {
        process = 2;
      }
      if ( process == 3 && x >= w + 20) {
        setTimeout(function() {
          x = 0 ;
          process = 1;
          theta = 0;
          requestAnimationFrame(fall);
        }, 2000);
        return;
      }
    } else if ( process == 2 ) {
      var r = 30,
          centerX = mid,
          centerY = computeY(centerX, 20) - r,
          curX = centerX + r * Math.cos( theta ),
          curY = centerY + r * Math.sin( theta );

      update(curX, curY);
      if ( theta <= 3.2 - 2 * Math.PI ) {
        process = 3;
      } 
      theta -= 5 * ( Math.PI / 180 ); 
    }
    requestAnimationFrame(fall);
  }

  function computeY(x, adjust) {
    var k = w / Math.log( w ) - 20,
        y = k * Math.log( x + 20 ) - adjust;
    return y;
  }

  function update(x, y) {
    leaf.style.webkitTransform = 'translate('+ x + 'px,' + y +'px)';
  }

   

})();
