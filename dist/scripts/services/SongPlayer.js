 (function () {
   function SongPlayer(Fixtures) {
     var SongPlayer = {};

     /**
      * @desc Album info from Fixtures
      */
     var currentAlbum = Fixtures.getAlbum();


     var currentBuzzObject = null;

     /**
      * @function setSong
      *@desc Stops currently from playing and loads new audio file as currentBuzzObject
      * @param {Object} song
      */

     var setSong = function (song) {
       if (currentBuzzObject) {
         currentBuzzObject.stop();
         SongPlayer.currentSong.playing = null;
       }

       /**
        * @desc Buzz object audio file
        * @type {Object}
        */

       currentBuzzObject = new buzz.sound(song.audioUrl, {
         formats: ['mp3'],
         preload: true
       });

       SongPlayer.currentSong = song;
     };

     /**
      * @function getSongIndex
      * @desc retrieves index of songs from album
      * @param {Object} song
      */
     var getSongIndex = function (song) {
       return currentAlbum.songs.indexOf(song);
     };

     /**
      * @desc Active song object from list of songs
      * @type {Object}
      */
     SongPlayer.currentSong = null;

     SongPlayer.play = function (song) {
       song = song || SongPlayer.currentSong;
       if (SongPlayer.currentSong !== song) {
         setSong(song);
         playSong(song);
       } else if (SongPlayer.currentSong === song) {
         if (currentBuzzObject.isPaused()) {
           playSong(song);
         }
       }
     };
     /**
      * @function playSong
      * @desc Plays the the audio file loaded by setSong.
      * @param {Object} song
      */
     var playSong = function (song) {
       currentBuzzObject.play();
       song.playing = true;

     };
     SongPlayer.pause = function (song) {
       song = song || SongPlayer.currentSong;
       currentBuzzObject.pause();
       song.playing = false;
     };


     /**
      * @function SongPlayer.previous
      * @desc goes to the index item prior to currentSong in getSongIndex
      * @param {Object} SongPlayer.CurrentSong
      */
     SongPlayer.previous = function () {
       var currentSongIndex = getSongIndex(SongPlayer.currentSong);
       currentSongIndex--;
       
     if (currentSongIndex < 0) {
         currentBuzzObject.stop();
         SongPlayer.currentSong.playing = null;
      } else {
         var song = currentAlbum.songs[currentSongIndex];
         setSong(song);
         playSong(song);
     }
     };

     return SongPlayer;
   }

   angular
     .module('blocJams')
     .factory('SongPlayer', SongPlayer);
 })();