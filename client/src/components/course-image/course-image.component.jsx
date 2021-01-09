import React, { useState, useEffect } from 'react';
import { Image } from 'cloudinary-react';

import './course-image.styles.scss';

const INITIAL_STATE = {
  imageLoading: false,
}

const CourseImage = ({ hasImage, courseId, onUploadCallback }) => {
  const [state, setState] = useState({ ...INITIAL_STATE });
  const { bio, imageLoading } = state;
  const baseURL = process.env.NODE_ENV === "production" ? 
    'https://us-central1-react-firebase-authentic-5bd64.cloudfunctions.net/api' 
  : 
    'http://localhost:5001/react-firebase-authentic-5bd64/us-central1/api';

  const onClick = event => {
    document.querySelector(".img-upload").click();
  }

  const onUpload = (event) => {
    const data = new FormData();
    data.append('file', event.target.files[0]);
    data.append('public_id', courseId);

    setState(prevState => ({ ...prevState, imageLoading: true }));

    fetch(`${baseURL}/image-upload`, {
      method: 'POST',
      body: data,
    })
    .then((response) => {
      setState(prevState => ({ ...prevState, imageLoading: false }));
      console.log('response: ', response.json());
      onUploadCallback();
    })  
    .catch((error) => {
      console.log(error);
    });
  }

  return (
    <div className='d-flex justify-center my'>
      {     
        imageLoading ? 
          <span>Loading</span>
        :
          hasImage ?
            <Image 
              className='p-default'
              cloudName="everest-logix" 
              publicId={courseId} 
              width="300" 
              height="300" 
              crop="scale" 
              onClick={onClick}
            />
          :
            <span className='person' onClick={onClick}></span>
      }
      <input 
        type='file' 
        name='image' 
        className='img-upload hide'
        onChange={onUpload} 
      />
    </div>
  );
}

export default CourseImage;
