/*! Copyright 2011, Ben Lin (http://dreamerslab.com/)
* Licensed under the MIT License (LICENSE.txt).
*
* Version: 1.0.3
*
* Requires: jQuery 1.2.3+
*/
;( function( $ ){
  $.preload = function(){
    var imgs = Object.prototype.toString.call( arguments[ 0 ]) === '[object Array]'
      ? arguments[ 0 ] : arguments;

    var tmp = [];
    var i   = imgs.length;

    // reverse loop run faster
    for( ; i-- ; ) tmp.push( $( '<img />' ).attr( 'src', 'Images/'+imgs[ i ]));
  };

    $.preloadAudio = function(){
        var auds = Object.prototype.toString.call( arguments[ 0 ]) === '[object Array]'
            ? arguments[ 0 ] : arguments;

        var tmp = [];
        var i   = auds.length;

        for( ; i-- ; ) {

            var audio = document.createElement("audio");
            var audSrc = "Audio/FR/mp3/"+auds[i];

            audio.src = audSrc;
            audio.addEventListener("canplaythrough", function () {/*Put your code Here*/}, false);
        };

    }
})( jQuery );
