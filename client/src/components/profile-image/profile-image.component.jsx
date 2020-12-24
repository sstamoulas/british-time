import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Image } from 'cloudinary-react';
import { createStructuredSelector } from 'reselect';

import { currentUser } from './../../redux/user/user.selectors';

import './profile-image.styles.scss';

const INITIAL_STATE = {
  imageLoading: false,
}

const ProfileImage = ({ currentUser, hasImage, onUploadCallback }) => {
  const [state, setState] = useState({ ...INITIAL_STATE });
  const { bio, imageLoading } = state;

  const onClick = event => {
    document.querySelector(".img-upload").click();
  }

  const onUpload = (event) => {
    const data = new FormData();
    data.append('file', event.target.files[0]);
    data.append('public_id', currentUser.id);

    setState(prevState => ({ ...prevState, imageLoading: true }));

    fetch('https://us-central1-react-firebase-authentic-5bd64.cloudfunctions.net/api/image-upload', {
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
              publicId={currentUser.id} 
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

const mapStateToProps = createStructuredSelector({
  currentUser: currentUser,
});

export default connect(mapStateToProps)(ProfileImage);
