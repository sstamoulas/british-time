import React, { Fragment, useEffect, useRef } from 'react'
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { firestore } from './../../firebase/firebase.utils'

import { currentUser } from './../../redux/user/user.selectors';

import './instructor-video-chat-container.styles.scss';

const InstructorVideoChatContainer = ({ currentUser }) => {
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
      const callDoc = firestore.collection('calls').doc('1KWzj6WjMwEmwOOtL3mq');
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
      <h2>2. Create a new Call</h2>
      <button id="callButton" disabled>Create Call (offer)</button>

      <h2>4. Hangup</h2>

      <button id="hangupButton" disabled>Hangup</button>
    </Fragment>
  )
}

const mapStateToProps = createStructuredSelector({
  currentUser: currentUser,
});

export default connect(mapStateToProps)(InstructorVideoChatContainer);
