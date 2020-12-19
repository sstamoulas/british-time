import React, { useState, useEffect } from 'react';
import { Image } from 'cloudinary-react';

import './course-image.styles.scss';

const INITIAL_STATE = {
  imageLoading: false,
}

const CourseImage = ({ hasImage, courseId, courseName, onUploadCallback }) => {
  const [state, setState] = useState({ ...INITIAL_STATE });
  const { bio, imageLoading } = state;

  const onClick = event => {
    document.querySelector(".img-upload").click();
  }

  const onUpload = (event) => {
    const data = new FormData();
    data.append('file', event.target.files[0]);
    data.append('public_id', courseId);

    setState(prevState => ({ ...prevState, imageLoading: true }));

    fetch('http://localhost:3000/image-upload', {
      method: 'POST',
      body: data,
    })
    .then((response) => {
      setState(prevState => ({ ...prevState, imageLoading: false }));
      console.log(response.json());
      onUploadCallback();
    })  
    .catch((error) => {
      console.log(error);
    });
  }

  console.log('courseId is ', courseId)

  return (
    <div className='d-flex justify-center my'>
      {     
        imageLoading ? 
          <span>Loading</span>
        :
          <Image 
            className='p-default'
            cloudName="everest-logix" 
            publicId={hasImage ? courseId : courseName} 
            width="300" 
            height="300" 
            crop="scale" 
            onClick={onClick}
          />
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
