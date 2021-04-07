import React, { Fragment, useEffect, useRef } from 'react'
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { firestore } from './../../firebase/firebase.utils'

import { currentUser } from './../../redux/user/user.selectors';

import './instructor-video-chat-container.styles.scss';

const InstructorVideoChatContainer = ({ conferenceId, currentUser }) => {
  // Global State
  const localStream = useRef(undefined);
  const remoteStream = useRef(undefined);

  const resize = (toBeLarge, toBeSmall) => {
    document.querySelector(`#${toBeLarge}`)
    document.querySelector(`#${toBeSmall}`)    
  }
    
  useEffect(() => {
    document.querySelector('.header').style.display = 'none';
    document.querySelector('.nav-container').style.display = 'none';
    document.querySelector('.locale-select--select-button--DVnTw').style.display = 'none';

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

    // HTML elements
    const webcamButton = document.getElementById('webcamButton');
    const webcamVideo = document.getElementById('webcamVideo');
    const callButton = document.getElementById('callButton');
    const remoteVideo = document.getElementById('remoteVideo');
    const hangupButton = document.getElementById('hangupButton');

    // 1. Setup media sources

    webcamButton.onclick = async () => {
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

      webcamVideo.srcObject = localStream.current;
      remoteVideo.srcObject = remoteStream.current;

      callButton.disabled = false;
      webcamButton.disabled = true;
    };

    // 2. Create an offer
    callButton.onclick = async () => {
      // Reference Firestore collections for signaling
      document.querySelector('.join-dialog').style.display = 'none';
      const callDoc = firestore.collection('calls').doc(conferenceId);
      const offerCandidates = callDoc.collection('offerCandidates');
      const answerCandidates = callDoc.collection('answerCandidates');

      // Get candidates for caller, save to db
      pc.onicecandidate = (event) => {
        event.candidate && offerCandidates.add(event.candidate.toJSON());
      };

      // Create offer
      const offerDescription = await pc.createOffer();
      await pc.setLocalDescription(offerDescription);

      const offer = {
        sdp: offerDescription.sdp,
        type: offerDescription.type,
      };

      await callDoc.set({ offer });

      // Listen for remote answer
      callDoc.onSnapshot((snapshot) => {
        const data = snapshot.data();
        if (!pc.currentRemoteDescription && data?.answer) {
          const answerDescription = new RTCSessionDescription(data.answer);
          pc.setRemoteDescription(answerDescription);
        }
      });

      // When answered, add candidate to peer connection
      answerCandidates.onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === 'added') {
            const candidate = new RTCIceCandidate(change.doc.data());
            pc.addIceCandidate(candidate);
          }
        });
      });

      // hangupButton.disabled = false;
    };
  }, [])

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
                            <video id="webcamVideo" className='gallery-video-container__canvas' autoPlay playsInline></video>
                            <video id="remoteVideo" className='gallery-video-container__canvas' autoPlay playsInline></video>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="join-dialog" role="presentation" style={{bottom: '0px', width: '100%'}}>
                  <div className="zmu-tabs__tabpanel zmu-tabs__tabpanel--active" role="tabpanel" id="voip-tab" aria-labelledby="voip" aria-hidden="false">
                    <div className="join-audio-by-voip"><button tabIndex="0" type="button" id='webcamButton' className="zm-btn join-audio-by-voip__join-btn zm-btn--primary zm-btn__outline--white zm-btn--lg" aria-label="">Open Webcam?<span className="loading" style={{display: 'none'}}></span></button></div>
                  </div>
                  <div className="zmu-tabs__tabpanel zmu-tabs__tabpanel--active" role="tabpanel" id="voip-tab" aria-labelledby="voip" aria-hidden="false">
                    <div className="join-audio-by-voip"><button tabIndex="0" type="button" id='callButton' className="zm-btn join-audio-by-voip__join-btn zm-btn--primary zm-btn__outline--white zm-btn--lg" aria-label="">Join Call?<span className="loading" style={{display: 'none'}}></span></button></div>
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

export default connect(mapStateToProps)(InstructorVideoChatContainer);
