// App.jsx
import React, { useState, useEffect } from 'react';
import { socket } from '../socket';
import YouTubeVideo from './YouTubeVideo.jsx';
import { player } from '../YouTubePlayer';

export default function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [supportedEvents, setSupportedEvents] = useState([]);
  const [videoId, setVideoId] = useState('GkAkzlrfRYw');

  useEffect(() => {
    let onConnect = () => {
      setIsConnected(true);
    };

    let onDisconnect = () => {
      setIsConnected(false);
    };

    let onInitializer = (i) => {
      setSupportedEvents(i);
    };

    let onVideo = (info) => {
      switch(info['command']){
        case 'play':
          if(player){
            player.playVideo();
          }
          break;
        case 'pause':
          if(player){
            player.pauseVideo();
          }
          break;       

      }
    };

    socket.on('connect', onConnect);
    socket.on('video', onVideo);
    socket.on('disconnect', onDisconnect);
    socket.on('initializer', onInitializer);

    return () => {
      socket.off('connect', onConnect);      
      socket.on('video', onVideo);
      socket.off('disconnect', onDisconnect);
      socket.off('initializer', onInitializer);
    };
  }, []);

  const handlePlayerReady = (event) => {
    console.log('Player is ready:', player);
    if (player) {
      player.addEventListener('onStateChange', (event) => {
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
      });
    }
    player.loadVideoById(videoId);
  };

  const handleVideoIdChange = (event) => {
    const newVideoId = event.target.value;
    setVideoId(newVideoId);
    player.loadVideoById(newVideoId);
    player.pauseVideo();
  };

  return (
    <>
      <h2 style={{ textAlign: 'center' }}>
        CONNECTION : {isConnected ? <span style={{ color: 'green' }}>ACTIVE</span> : <span style={{ color: 'red' }}>DEAD</span>}
      </h2>
      <YouTubeVideo videoId={videoId} onPlayerReady={handlePlayerReady} />
      <input
        type="text"
        placeholder="Enter Video ID"
        value={videoId}
        onChange={handleVideoIdChange}
      />
    </>
  );
}
