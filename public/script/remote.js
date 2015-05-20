var socket = io();
var currentImage = 0; // the currently selected image
var imageCount = 7; // the maximum number of images available

function showImage (index){
  // Update selection on remote
  currentImage = index;
  var images = document.querySelectorAll("img");
  document.querySelector("img.selected").classList.toggle("selected");
  images[index].classList.toggle("selected");

  // TODO Send the command to the screen
  socket.emit( 'index from remote', { index: index } );
}

function initialiseGallery(){
  var container = document.querySelector('#gallery');
  var i, img;
  for (i = 0; i < imageCount; i++) {
    img = document.createElement("img");
    img.src = "images/" +i +".jpg";
    document.body.appendChild(img);
    var handler = (function(index) {
      return function() {
        showImage(index);
      }
    })(i);
    img.addEventListener("click",handler);
  }

  document.querySelector("img").classList.toggle('selected');
}

document.addEventListener("DOMContentLoaded", function(event) {
  initialiseGallery();

  document.querySelector('#toggleMenu').addEventListener("click", function(event){
    var style = document.querySelector('#menu').style;
    style.display = style.display == "none" || style.display == ""  ? "block" : "none";
  });

  connectToServer();

  socket.on( 'update settings', function( data ) {
    var list = document.createElement( 'ul' );

    for ( var key in data ) {
      var screen = document.createElement( 'li' );
      var button = document.createElement( 'button' );

      screen.appendChild( document.createTextNode( data[ key ][ 'name' ] ) );
      button.className = 'pure-button';

      if ( data[ key ][ 'remotes' ].indexOf( socket.id ) == -1 ) {
        button.appendChild( document.createTextNode( 'Connect' ) );

        ( function( key ) {
          button.addEventListener( 'click', function() {
            socket.emit( 'connect remote to screen', { id: key, index: currentImage } );
          } );
        } ( key ) );
      } else {
        button.appendChild( document.createTextNode( 'Disconnect' ) );

        ( function( key ) {
          button.addEventListener( 'click', function() {
            socket.emit( 'disconnect remote from screen', { id: key } );
          } );
        } ( key ) );
      }

      screen.appendChild( button );
      list.appendChild( screen );
    }

    document.getElementById( 'menu' ).innerHTML = '';
    document.getElementById( 'menu' ).appendChild( list );
  } );
});

function connectToServer(){
  // TODO connect to the socket.io server
  socket.emit( 'connect remote' );
}
