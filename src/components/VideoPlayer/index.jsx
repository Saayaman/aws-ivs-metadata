import React, { useRef, useEffect, useState } from 'react'
import Placeholder from '../Placeholder';
import PlayerControls from '../PlayerControls'

import './style.css';

const VideoPlayer = ({ playbackUrl }) => {
    const videoRef = useRef(null)
    const { IVSPlayer } = window;
    const { isPlayerSupported } = IVSPlayer;
    const [loading, setLoading] = useState(true);

    const player = useRef(null)
    const [muted, setMuted] = useState(true);

    useEffect(() => {
        if (!player.current) return;
    
        setMuted(player.current.isMuted());
    }, [loading]);

    useEffect(() => {
        const { ENDED, PLAYING, READY } = IVSPlayer.PlayerState;
        const { ERROR } = IVSPlayer.PlayerEventType;

        if(!isPlayerSupported) {
            console.warn('The Current browser does not support the Amazon IVS player')
            return;
        }
        
        const onError = (err) => {
            console.warn('Player Event - ERROR:', err);
        };
        
        // 1. initialize ivs player
        // const player = IVSPlayer.create();
        // player.attachHTMLVideoElement(videoRef.current);
        // player.load(playbackUrl);
        // player.play();
        player.current = IVSPlayer.create()
        player.current.attachHTMLVideoElement(videoRef.current);
        player.current.load(playbackUrl);
        player.current.play();
        
        const onStateChange = () => {
            const playerState = player.current.getState();
    
            console.log(`Player State - ${playerState}`);
            setLoading(playerState !== PLAYING);
        };
        // 2. update video state
        player.current.addEventListener(READY, onStateChange);
        player.current.addEventListener(PLAYING, onStateChange);
        player.current.addEventListener(ENDED, onStateChange);
        player.current.addEventListener(ERROR, onError);
    }, [IVSPlayer, isPlayerSupported, playbackUrl])


    if (!isPlayerSupported) {
        return null;
    }

    //Player controls func
    const close = (e) => {
        player.current.pause();
    }
    const toggleMute = (e) => {
        console.log('toggleMute');
        const shouldMute = !player.current.isMuted();
    
        player.current.setMuted(shouldMute);
        setMuted(shouldMute);
      };


    console.log('loading', loading);
    console.log('muted', muted);
  return (
      <div className="VideoPlayer">
          <Placeholder loading={loading} />
          <video ref={videoRef} id="video-player" playsInline></video>
          <PlayerControls
              muted={muted}
              onClose={close}
              onMute={toggleMute}
            />
      </div>
  );
  
}

export default VideoPlayer;
