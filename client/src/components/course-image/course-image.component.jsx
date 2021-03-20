import React, { useState, useEffect } from 'react';
import { Image } from 'cloudinary-react';

import './course-image.styles.scss';

const INITIAL_STATE = {
  imageLoading: false,
}

const CourseImage = ({ imageExtension, courseId, height, width, className, onUploadCallback }) => {
  const [state, setState] = useState({ ...INITIAL_STATE });
  const { bio, imageLoading } = state;

  const baseURL = process.env.NODE_ENV === "production" ? 
    process.env.REACT_APP_BASE_URL
  : 
    process.env.REACT_APP_LOCAL_HOST_URL;

  const onClick = event => {
    document.querySelector(".img-upload").click();
  }

  const onUpload = (event) => {
    const data = new FormData();
    const fileName = event.target.files[0].name;
    const imageExtension = fileName.substring(fileName.indexOf('.') + 1);
    data.append('file', event.target.files[0]);
    data.append('public_id', courseId);

    setState(prevState => ({ ...prevState, imageLoading: true }));

    fetch(`${baseURL}/image-upload`, {
      method: 'POST',
      body: data,
    })
    .then((response) => {
      setState(prevState => ({ ...prevState, imageLoading: false }));
      onUploadCallback(imageExtension);
    })  
    .catch((error) => {
      console.log(error);
    });
  }

  return !(height && width) ? (
      <div className='d-flex justify-center my'>
        {     
          imageLoading ? 
            <span>Loading</span>
          :
            imageExtension ?
              <Image 
                className='p-default'
                cloudName="everest-logix" 
                publicId={`${courseId}.${imageExtension}`} 
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
    )
  :
    (
      <Image 
        className={className}
        cloudName="everest-logix" 
        publicId={imageExtension ? `${courseId}.${imageExtension}` : 'Not Available.png'} 
        width={width}
        height={height}
        crop="scale" 
      />
    )
}

export default CourseImage;
