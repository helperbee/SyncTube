import React, { useState, useEffect } from 'react';
import { socket } from '../socket';

export default function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [supportedEvents, setSupportedEvents] = useState([]);

  useEffect(() => {

    let onConnect = () => {
      setIsConnected(true); 
      socket.emit('supported');
    };

    let onDisconnect = () => {
      setIsConnected(false);
    };

    let onInitializer = (i) =>{
      setSupportedEvents(i);//Initial response of supported items/commands
    };
    
    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('initializer', onInitializer);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('initializer', onInitializer);
    };
  }, []);

  return (
      <h2 style={{textAlign:'center'}}>CONNECTION : {isConnected ? <span style={{color:'green'}}>ACTIVE</span> : <span style={{color:'red'}}>DEAD</span>}</h2>
  );
}