// YouTubeVideo.jsx
import React, { useEffect, useRef } from 'react';
import { socket } from '../socket';
import { initYouTubePlayer, player, getSync, setSync } from '../YouTubePlayer';

function YouTubeVideo({ videoId }) {



  useEffect(() => {
    initYouTubePlayer(videoId, () => {
      console.log('youtube player is ready. assigning events');
      player.addEventListener('onStateChange', (event) => {
        switch (event.data) {
          case window.YT.PlayerState.PLAYING:
            console.log('Video is playing. ');
            if(!getSync()){
              socket.emit('video', {command:'play', timestamp:player.getCurrentTime(), volume:player.getVolume()})
            }else{
              setSync(true);
            }
            break;
          case window.YT.PlayerState.PAUSED:
            console.log(`Video was paused at ${player.getCurrentTime()} seconds`);
            if(!getSync()){
              socket.emit('video', {command:'pause', timestamp:player.getCurrentTime(), volume:player.getVolume()})
            }
            else{
              setSync(true);
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

  return (
    <div>
      <div id="youtube-player"></div>
    </div>
  );
}

export default YouTubeVideo;
