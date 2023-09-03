import React, { useEffect } from 'react';


let YouTubeVideo  = () => {
    const [player, setPlayer] = useState(null);
    const [videoId, setVideoId] = useState('GkAkzlrfRYw');

    useEffect(() => {
        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        window.onYouTubeIframeAPIReady = initYouTubePlayer;
    }, []);

    const onPlayerStateChange = (event) => {
        //-1 unstarted, 0 - ended, 1 - playing, 2 - paused, 3 - buffering
        switch(event.data){
            case -1:
                console.log('Video hasnt been started.');
                break;
            case 0:
                console.log('Video has ended.');
                break;
            case 1:
                console.log('Video is playing.');
                break;
            case 2:
                console.log('Video is paused.');
                break;
            case 3:
                console.log('Video is buffering.');
                break;
            default:
                console.log(`Unknown event is happening. ${event.data}`);
                break;
        }
    };

    const initYouTubePlayer = () => {
        const newPlayer = new window.YT.Player('youtube-player', {
        videoId: videoId,
        playerVars: {
            autoplay: 0,
            controls: 1,
        },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        },
        });

        setPlayer(newPlayer);
    };

    const onPlayerReady = (event) => {
        console.log('Player is ready');
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

export default YouTubeVideo;