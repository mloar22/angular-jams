 (function () {
   function SongPlayer() {
     var SongPlayer = {};

     var currentSong = null;
     var currentBuzzObject = null;

     
     
/**
 * @function setSong
 *@desc Stops currently from playing and loads new audio file as currentBuzzObject
 * @param {Object} song
 */
     
     
     var setSong = function(song) {
       if (currentBuzzObject) {
         currentBuzzObject.stop();
         currentSong.playing = null;
       }
       
/**
* @function playSong
* @desc Plays the the audio file loaded by setSong.
* @param {Object} song
*/
       
    var playSong = function(song) {
     currentBuzzObject.play();
      song.playing = true;
      
    };
       
     /**
 * @desc Buzz object audio file
 * @type {Object}
 */
    
       currentBuzzObject = new buzz.sound(song.audioUrl, {
         formats: ['mp3'],
         preload: true
       });

       currentSong = song;
     };
     
     
     SongPlayer.play = function (song) {
       if (currentSong !== song) {

         setSong(song);
         playSong; 

       } else if (currentSong === song) {
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