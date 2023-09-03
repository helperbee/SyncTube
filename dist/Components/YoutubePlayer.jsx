import { useEffect } from 'react';


let YouTubePlayer = () => {
    let player = null;
  
    useEffect(() => {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  
      window.onYouTubeIframeAPIReady = initYouTubePlayer;
    }, []);
  
    const initYouTubePlayer = () => {
      player = new window.YT.Player('youtube-player', {
        videoId: 'GkAkzlrfRYw',
        playerVars: {
          autoplay: 0,
          controls: 1,
        },
        events: {
          'onReady': onPlayerReady,
          'onStateChange': onPlayerStateChange,
        },
      });
    };
  
    const onPlayerReady = (event) => {
      console.log('Player is ready');
    };
  
    const onPlayerStateChange = (event) => {
      switch (event.data) {
        case window.YT.PlayerState.PLAYING:
          console.log('Video is playing.');
          break;
        case window.YT.PlayerState.PAUSED:
          console.log(`Video was paused at ${player.getCurrentTime()} seconds`);
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
    };
  
    const customPlay = () => {
      if (player) {
        player.playVideo();
      }
    };
  
    return (
      <div>
        <div id="youtube-player"></div>
        <button onClick={customPlay}>Play Video</button>
      </div>
    );
  }
  
  export default YouTubePlayer;