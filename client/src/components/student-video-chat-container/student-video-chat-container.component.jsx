import React, { Fragment, useEffect, useRef } from 'react'
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { firestore } from './../../firebase/firebase.utils'

import { currentUser } from './../../redux/user/user.selectors';

import './student-video-chat-container.styles.scss';

const StudentVideoChatContainer = ({ conferenceId, currentUser }) => {
  // Global State
  const localStream = useRef(undefined);
  const remoteStream = useRef(undefined);
  const webcamVideo = useRef(undefined);
  const remoteVideo = useRef(undefined);

  const resize = (toBeLarge, toBeSmall) => {
    document.querySelector(`#${toBeLarge}`)
    document.querySelector(`#${toBeSmall}`)    
  }

  const servers = {
    iceServers: [
      {
        urls: [
          'stun:stun1.l.google.com:19302', 
          'stun:stun2.l.google.com:19302'
        ],
      },
    ],
    iceCandidatePoolSize: 10,
  };
  
  const pc = new RTCPeerConnection(servers);
    
  useEffect(() => {
    document.querySelector('.header').style.display = 'none';
    document.querySelector('.nav-container').style.display = 'none';
    document.querySelector('.locale-select--select-button--DVnTw').style.display = 'none';

    // HTML elements
    webcamVideo.current = document.getElementById('webcamVideo');
    remoteVideo.current = document.getElementById('remoteVideo');
  }, [])

  const toggleVideo = async () => {
    localStream.current.getVideoTracks()[0].enabled = !localStream.current.getVideoTracks()[0].enabled;
  }

  const toggleAudio = () => {
    localStream.current.getAudioTracks()[0].enabled = !localStream.current.getAudioTracks()[0].enabled;
  }

  // 1. Setup media sources
  const webcamHandler = async () => {
    const webcamButton = document.getElementById('webcamButton');
    localStream.current = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    remoteStream.current = new MediaStream();

    // Push tracks from local stream to peer connection
    localStream.current.getTracks().forEach((track) => {
      pc.addTrack(track, localStream.current);
    });

    // Pull tracks from remote stream, add to video stream
    pc.ontrack = (event) => {
      event.streams[0].getTracks().forEach((track) => {
        remoteStream.current.addTrack(track);
      });
    };

    webcamVideo.current.srcObject = localStream.current;
    remoteVideo.current.srcObject = remoteStream.current;

    webcamButton.disabled = true;
  };

  // 3. Answer the call with the unique ID
  const answerHandler = async () => {
    document.querySelector('.join-dialog').style.display = 'none';
    // remoteVideo.style.position = 'absolute';
    // remoteVideo.style.top = webcamVideo.offsetHeight;
    // remoteVideo.style.left = webcamVideo.offsetWidth
    //webcamVideo.offsetHeight, webcamVideo.offsetWidth
    const callDoc = firestore.collection('calls').doc(conferenceId);
    const answerCandidates = callDoc.collection('answerCandidates');
    const offerCandidates = callDoc.collection('offerCandidates');

    pc.onicecandidate = (event) => {
      event.candidate && answerCandidates.add(event.candidate.toJSON());
    };

    const callData = (await callDoc.get()).data();

    const offerDescription = callData.offer;
    await pc.setRemoteDescription(new RTCSessionDescription(offerDescription));

    const answerDescription = await pc.createAnswer();
    await pc.setLocalDescription(answerDescription);

    const answer = {
      type: answerDescription.type,
      sdp: answerDescription.sdp,
    };

    await callDoc.update({ answer });

    offerCandidates.onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
        console.log(change);
        if (change.type === 'added') {
          let data = change.doc.data();
          pc.addIceCandidate(new RTCIceCandidate(data));
        }
      });
    });
  }

  return (
    <div style={{backgroundColor: 'black'}}>
      <div className="root-inner">
        <div className="meeting-app">
          <span></span><span></span>
          <div>
            <div role="presentation" className="meeting-client">
              <div className="meeting-client-inner">
                <div id="wc-content">
                  <div id="wc-container-left" className="" style={{width: '100%', /* width: 1039px;*/}}>
                    <div className="main-layout" style={{display: 'block', background: 'rgb(17, 17, 17)', height: '100%'}}>
                      <div style={{display: 'block'}}>
                        <div className="gallery-video-container__main-view" style={{marginTop: '0'}}>
                          <div className="gallery-video-container__wrap" style={{display: 'flex', justifyContent: 'center', flexWrap: 'wrap'}}>
                            <video id="webcamVideo" className='gallery-video-container__canvas' autoPlay playsInline muted></video>
                            <video id="remoteVideo" className='gallery-video-container__canvas' autoPlay playsInline></video>
                            <button onClick={toggleAudio}>Toggle Audio</button>
                            <button onClick={toggleVideo}>Toggle Video</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="join-dialog" role="presentation" style={{bottom: '0px', width: '100%'}}>
                  <div className="zmu-tabs__tabpanel zmu-tabs__tabpanel--active" role="tabpanel" id="voip-tab" aria-labelledby="voip" aria-hidden="false">
                    <div className="join-audio-by-voip"><button tabIndex="0" type="button" id='webcamButton' onClick={webcamHandler} className="zm-btn join-audio-by-voip__join-btn zm-btn--primary zm-btn__outline--white zm-btn--lg" aria-label="">Open Webcam?<span className="loading" style={{display: 'none'}}></span></button></div>
                  </div>
                  <div className="zmu-tabs__tabpanel zmu-tabs__tabpanel--active" role="tabpanel" id="voip-tab" aria-labelledby="voip" aria-hidden="false">
                    <div className="join-audio-by-voip"><button tabIndex="0" type="button" id='callButton' onClick={answerHandler} className="zm-btn join-audio-by-voip__join-btn zm-btn--primary zm-btn__outline--white zm-btn--lg" aria-label="">Join Call?<span className="loading" style={{display: 'none'}}></span></button></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <span></span>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = createStructuredSelector({
  currentUser: currentUser,
});

export default connect(mapStateToProps)(StudentVideoChatContainer);
