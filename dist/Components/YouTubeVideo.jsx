// YouTubeVideo.jsx
import React, { useEffect, useRef } from 'react';
import { socket } from '../socket';
import { initYouTubePlayer, player, getSync } from '../YouTubePlayer';

function YouTubeVideo({ videoId }) {



  useEffect(() => {
    initYouTubePlayer(videoId, () => {
      console.log('youtube player is ready. assigning events');
      player.addEventListener('onStateChange', (event) => {
        switch (event.data) {
          case window.YT.PlayerState.PLAYING:
            console.log('Video is playing. ');
            console.log(getSync());
            if(!getSync()){
              socket.emit('video', {command:'play', timestamp:player.getCurrentTime()})
            }
            break;
          case window.YT.PlayerState.PAUSED:
            console.log(`Video was paused at ${player.getCurrentTime()} seconds`);
            if(!getSync()){
              socket.emit('video', {command:'pause', timestamp:player.getCurrentTime()})
            }
            break;
          case window.YT.PlayerState.ENDED:
            console.log('Video has ended.');
            break;
          case window.YT.PlayerState.BUFFERING:
            console.log('Video is buffering.');
            break;
          default:
            console.log(`Unknown event is happening. ${event.data}`);
            break;
        }});
    })}, []);

  const customPlay = () => {
    if (player) {
      console.log(player);
      if (player) {
        player.addEventListener('onStateChange', (event) => {
          switch (event.data) {
            case window.YT.PlayerState.PLAYING:
              console.log('Video is playing.');
              socket.emit('video', {command:'play', timestamp:player.getCurrentTime()})
              break;
            case window.YT.PlayerState.PAUSED:
              console.log(`Video was paused at ${player.getCurrentTime()} seconds`);
              socket.emit('video', {command:'pause', timestamp:player.getCurrentTime()})
              break;
            case window.YT.PlayerState.ENDED:
              console.log('Video has ended.');
              break;
            case window.YT.PlayerState.BUFFERING:
              console.log('Video is buffering.');
              break;
            default:
              console.log(`Unknown event is happening. ${event.data}`);
              break;
          }
        });
      }
      player.playVideo();      
    }
  };

  return (
    <div>
      <div id="youtube-player"></div>
      <button onClick={customPlay}>Play Videasdfo</button>
    </div>
  );
}

export default YouTubeVideo;
