// App.jsx
import React, { useState, useEffect } from 'react';
import { socket } from '../socket';
import YouTubeVideo from './YouTubeVideo.jsx';
import VideoComments from './VideoComments.jsx';
import { player, setSync } from '../YouTubePlayer';
import { Layout } from 'antd';

export default function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [videoId, setVideoId] = useState('GkAkzlrfRYw');
  useEffect(() => {
    let onConnect = () => {
      setIsConnected(true);
    };

    let onDisconnect = () => {
      setIsConnected(false);
    };

    let onVideo = (info) => {
      setSync(true);
      if (player) {
        player.seekTo(info.timestamp);
        if (info.command === 'play' && (player.playerInfo.playerState === 2)) {
          console.log('ATTEMPTING TO PRESS PLAY');
          player.setVolume(50);
          player.playVideo();
        } else if (info.command === 'pause' && ((player.getPlayerState() === window.YT.PlayerState.PLAYING) || (player.getPlayerState() === window.YT.PlayerState.BUFFERING))) {
          player.pauseVideo();
        }
      }

    };

    socket.on('connect', onConnect);
    socket.on('video', onVideo);
    socket.on('disconnect', onDisconnect);

    return () => {
      socket.off('connect', onConnect);   
      
      socket.on('video', onVideo);   
      socket.off('disconnect', onDisconnect);
    };
  }, []);

  const handleVideoIdChange = (event) => {
    const newVideoId = event.target.value;
    setVideoId(newVideoId);
    player.loadVideoById(newVideoId);
    player.pauseVideo();
  };


  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Layout.Content style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div>
          <h2 style={{ textAlign: 'center' }}>
            CONNECTION : {isConnected ? <span style={{ color: 'green' }}>ACTIVE</span> : <span style={{ color: 'red' }}>DEAD</span>}
          </h2>
          <input
            type="text"
            placeholder="Enter Video ID"
            value={videoId}
            onChange={handleVideoIdChange}
          />
          <YouTubeVideo videoId={videoId} />
          <VideoComments/>
        </div>
      </Layout.Content>
    </Layout>
  );
}
