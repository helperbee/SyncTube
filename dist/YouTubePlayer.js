let player = null;
let syncing = false;

export const initYouTubePlayer = (videoId, onPlayerReady) => {
  const tag = document.createElement('script');
  tag.src = 'https://www.youtube.com/iframe_api';
  const firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

  window.onYouTubeIframeAPIReady = () => {
    player = new window.YT.Player('youtube-player', {
      videoId: videoId,
      playerVars: {
        autoplay: 1, 
        mute: 1,    //this seems to be required to have true sync BEFORE the user does a manual input on the player.. how can we get around this?
        controls: 1,
      },
      events: {
        onReady: onPlayerReady,
      },
    });
  };
};

export function getSync() {
  return syncing;
}

export function setSync(newValue) {
  syncing = newValue;
}

export { player };
