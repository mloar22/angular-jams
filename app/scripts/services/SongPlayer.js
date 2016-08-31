 (function () {
   function SongPlayer() {
     var SongPlayer = {};

     SongPlayer.currentSong = null;
     var currentBuzzObject = null;

     /**
      * @function setSong
      *@desc Stops currently from playing and loads new audio file as currentBuzzObject
      * @param {Object} song
      */

     var setSong = function (song) {
       if (currentBuzzObject) {
         currentBuzzObject.stop();
         SongPlayer. currentSong.playing = null;
       }

       /**
        * @desc Buzz object audio file
        * @type {Object}
        */

       currentBuzzObject = new buzz.sound(song.audioUrl, {
         formats: ['mp3'],
         preload: true
       });

       SongPlayer. currentSong = song;
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


     SongPlayer.play = function (song) {
       if (SongPlayer. currentSong !== song) {
         setSong(song);
         playSong();

       } else if (SongPlayer. currentSong === song) {
         if (currentBuzzObject.isPaused()) {
           currentBuzzObject.play();
         }
       }
     };

     SongPlayer.pause = function (song) {
       currentBuzzObject.pause();
       song.playing = false;
     };

     return SongPlayer;
   }

   angular
     .module('blocJams')
     .factory('SongPlayer', SongPlayer);
 })();