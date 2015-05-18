var express = require( 'express' );
var app     = express();
var http    = require( 'http' ).Server( app );
var screens = [];
var io      = require( 'socket.io' )( http );

app.use( express.static( 'public' ) );

io.on( 'connection', function( socket ) {
  socket.on( 'screen', function( data ) {
    if ( screens.indexOf( data.name ) == -1 ) {
      screens.push( data.name );
    }
    socket.join( data.name );
    console.log( data.name + ' connected' );

    io.emit( 'remote', { screens: screens } );
  } );

  io.emit( 'remote', { screens: screens } );
} );

http.listen( 8080, function() {
  console.log( 'listening on *:8080' );
} );
