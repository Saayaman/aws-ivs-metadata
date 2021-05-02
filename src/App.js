import './App.css';
import VideoPlayer from './components/VideoPlayer';

const PLAYBACK_URL = 'https://927665d0bc2b.us-east-1.playback.live-video.net/api/video/v1/us-east-1.009965025047.channel.i6wEZhrSC6Wk.m3u8';

function App() {
  return (
    <div className="App">
      <VideoPlayer playbackUrl={PLAYBACK_URL} />
    </div>
  );
  
}

export default App;
