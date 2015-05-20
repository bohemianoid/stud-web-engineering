var express = require( 'express' );
var app     = express();
var http    = require( 'http' ).Server( app );
var io      = require( 'socket.io' )( http );

app.use( express.static( 'public' ) );

http.listen( 8080, function() {
  console.log( 'listening on *:8080' );
} );

var screens = {};

io.on( 'connection', function( socket ) {
  socket.on( 'connect screen', function( data ) {
    screens[ socket.id ] = {};
    screens[ socket.id ][ 'name' ] = data.name;
    screens[ socket.id ][ 'remotes' ] = [];
    socket.join( data.name );
    io.emit( 'update settings', screens );
    console.log( data.name + ' connected' );
  } );

  socket.on( 'connect remote', function( data ) {
    io.emit( 'update settings', screens );
    console.log( 'remote connected' );
  } );

  socket.on( 'connect remote to screen', function( data ) {
    screens[ data.id ][ 'remotes' ].push( socket.id );
    socket.join( screens[ data.id ][ 'name' ] );
    io.to( screens[ data.id ][ 'name' ] ).emit( 'show image on screen', { index: data.index } );
    io.emit( 'update settings', screens );
    console.log( 'remote connected to ' + screens[ data.id ][ 'name' ] );
  } );

  socket.on( 'disconnect remote from screen', function( data ) {
    screens[ data.id ][ 'remotes' ].splice( screens[ data.id ][ 'remotes' ].indexOf( socket.id ), 1 );
    if ( screens[ data.id ][ 'remotes' ].length == 0 ) {
      io.to( screens[ data.id ][ 'name' ] ).emit( 'clear image from screen' );
    }
    socket.leave( screens[ data.id ][ 'name' ] );
    io.emit( 'update settings', screens );
    console.log( 'remote disconnected from ' + screens[ data.id ][ 'name' ] );
  } );

  socket.on( 'index from remote', function( data ) {
    for ( var id in screens ) {
      if ( screens[ id ][ 'remotes' ].indexOf( socket.id ) > -1 ) {
        io.to( screens[ id ][ 'name' ] ).emit( 'show image on screen', { index: data.index } );
      }
    }
  } );

  socket.on( 'disconnect', function() {
    if ( socket.id in screens ) {
      console.log( screens[ socket.id ][ 'name' ] + ' disconnected' );
      delete screens[ socket.id ];
    }

    for ( var id in screens ) {
      if ( screens[ id ][ 'remotes' ].indexOf( socket.id ) > -1 ) {
        screens[ id ][ 'remotes' ].splice( screens[ id ][ 'remotes' ].indexOf( socket.id ), 1 );
        console.log( 'remote disconnected' );
      }

      if ( screens[ id ][ 'remotes' ].length == 0 ) {
        io.to( screens[ id ][ 'name' ] ).emit( 'clear image from screen' );
      }
    }

    io.emit( 'update settings', screens );
  } );
} );
