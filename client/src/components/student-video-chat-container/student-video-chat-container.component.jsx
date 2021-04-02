import React, { Fragment, useEffect, useRef } from 'react'
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { firestore } from './../../firebase/firebase.utils'

import { currentUser } from './../../redux/user/user.selectors';

import './student-video-chat-container.styles.scss';

const StudentVideoChatContainer = ({ currentUser }) => {
  // Global State
  const localStream = useRef(undefined);
  const remoteStream = useRef(undefined);
    
  useEffect(() => {
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
    const answerButton = document.getElementById('answerButton');
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

      answerButton.disabled = false;
      webcamButton.disabled = true;
    };

    // 3. Answer the call with the unique ID
    answerButton.onclick = async () => {
      const callDoc = firestore.collection('calls').doc('1KWzj6WjMwEmwOOtL3mq');
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

      hangupButton.disabled = false;
    };
  }, [])

  return (
    <Fragment>
      <h2>1. Start your Webcam</h2>
      <div className="videos">
        <span>
          <h3>Local Stream</h3>
          <video id="webcamVideo" autoPlay playsInline></video>
        </span>
        <span>
          <h3>Remote Stream</h3>
          <video id="remoteVideo" autoPlay playsInline></video>
        </span>


      </div>

      <button id="webcamButton">Start webcam</button>

      <h2>3. Join a Call</h2>
      <p>Answer the call from a different browser window or device</p>
      
      <button id="answerButton" disabled>Answer</button>

      <h2>4. Hangup</h2>

      <button id="hangupButton" disabled>Hangup</button>
    </Fragment>
  )
}

const mapStateToProps = createStructuredSelector({
  currentUser: currentUser,
});

export default connect(mapStateToProps)(StudentVideoChatContainer);
