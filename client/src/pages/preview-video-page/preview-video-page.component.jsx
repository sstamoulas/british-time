import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import YouTubeToHtml5 from '@thelevicole/youtube-to-html5-loader';

import './preview-video-page.styles.scss';

const PreviewVideoPage = () => {
  const { videoId } = useParams();
  const [player, setPlayer] = useState(undefined);

  useEffect(() => {
    if(!player) {
      setPlayer(new YouTubeToHtml5({ withAudio: true }));
    }
    else {
      player.load();
    }
  }, [player, videoId])

  return (
    <video className="vjs-tech" id="playerId__8036556--3_html5_api" tabIndex="-1" controls="controls" controlsList="nodownload" autoPlay data-yt2html5={videoId}></video>
  )
}

export default PreviewVideoPage;
