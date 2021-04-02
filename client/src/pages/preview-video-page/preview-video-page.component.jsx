import React from 'react';
import { useParams } from 'react-router-dom';

import './preview-video-page.styles.scss';

const PreviewVideoPage = () => {
  const { videoId } = useParams();
  const subString = 'https://youtu.be/';

  return (
    <div className="vjs-tech" style={{width: '100%', height: '100%', position: 'relative'}}>
      <iframe 
        width="100%" 
        height="100%" 
        src={`https://www.youtube-nocookie.com/embed/${videoId.substring(subString.length)}?autoplay=1&rel=0&modestbranding=1`} 
        title="YouTube video player" 
        frameBorder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      >
      </iframe>
      <div style={{width: '100%', height: '20%', position: 'absolute', opacity: '0', right: '0px', top: '0px'}}>&nbsp;</div>
    </div>
  )
}

export default PreviewVideoPage;
