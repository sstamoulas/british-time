import React, { Fragment, useEffect } from 'react'
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { firestore } from './../../firebase/firebase.utils'
import * as mdc from 'material-components-web';

import { currentUser } from './../../redux/user/user.selectors';

const VideoChatContainer = ({ currentUser, roomToCall }) => {
  useEffect(() => {
    mdc.ripple.MDCRipple.attachTo(document.querySelector('.mdc-button'));

    const configuration = {
      iceServers: [
        {
          urls: [
            'stun:stun1.l.google.com:19302',
            'stun:stun2.l.google.com:19302',
          ],
        },
      ],
      iceCandidatePoolSize: 10,
    };

    let peerConnection = {};
    let localStream = null;
    let remoteStream = null;
    let roomDialog = null;
    let roomId = null;

    function init() {
      document.querySelector('#cameraBtn').addEventListener('click', openUserMedia);
      document.querySelector('#hangupBtn').addEventListener('click', hangUp);
      document.querySelector('#createBtn').addEventListener('click', createRoom);
      document.querySelector('#joinBtn').addEventListener('click', joinRoom);
      roomDialog = new mdc.dialog.MDCDialog(document.querySelector('#room-dialog'));
    }

    async function createRoom() {
      document.querySelector('#createBtn').disabled = true;
      document.querySelector('#joinBtn').disabled = true;
      //const db = firebase.firestore();
      const db = firestore;
      const roomRef = await db.collection('rooms').doc();

      console.log('Create PeerConnection with configuration: ', configuration);
      peerConnection[currentUser.id] = new RTCPeerConnection(configuration);

      registerPeerConnectionListeners();

      localStream.getTracks().forEach(track => {
        peerConnection[currentUser.id].addTrack(track, localStream);
      });

      // Code for collecting ICE candidates below
      const callerCandidatesCollection = roomRef.collection('callerCandidates');

      peerConnection[currentUser.id].addEventListener('icecandidate', event => {
        if (!event.candidate) {
          console.log('Got final candidate!');
          return;
        }
        console.log('Got candidate: ', event.candidate);
        callerCandidatesCollection.add(event.candidate.toJSON());
      });
      // Code for collecting ICE candidates above

      // Code for creating a room below
      const offer = await peerConnection[currentUser.id].createOffer();
      await peerConnection[currentUser.id].setLocalDescription(offer);
      console.log('Created offer:', offer);

      const roomWithOffer = {
        'offer': {
          type: offer.type,
          sdp: offer.sdp,
        },
      };
      await roomRef.set(roomWithOffer);
      roomId = roomRef.id;
      console.log(`New room created with SDP offer. Room ID: ${roomRef.id}`);
      document.querySelector(
          '#currentRoom').innerText = `Current room is ${roomRef.id} - You are the caller!`;
      // Code for creating a room above

      peerConnection[currentUser.id].addEventListener('track', event => {
        console.log('Got remote track:', event.streams[0]);
        event.streams[0].getTracks().forEach(track => {
          console.log('Add a track to the remoteStream:', track);
          remoteStream.addTrack(track);
        });
      });

      // Listening for remote session description below
      roomRef.onSnapshot(async snapshot => {
        const data = snapshot.data();
        if (!peerConnection[currentUser.id].currentRemoteDescription && data && data.answer) {
          console.log('Got remote description: ', data.answer);
          const rtcSessionDescription = new RTCSessionDescription(data.answer);
          await peerConnection[currentUser.id].setRemoteDescription(rtcSessionDescription);
        }
      });
      // Listening for remote session description above

      // Listen for remote ICE candidates below
      roomRef.collection('calleeCandidates').onSnapshot(snapshot => {
        snapshot.docChanges().forEach(async change => {
          if (change.type === 'added') {
            let data = change.doc.data();
            console.log(`Got new remote ICE candidate: ${JSON.stringify(data)}`);
            await peerConnection[currentUser.id].addIceCandidate(new RTCIceCandidate(data));
          }
        });
      });
      // Listen for remote ICE candidates above
    }

    function joinRoom() {
      document.querySelector('#createBtn').disabled = true;
      document.querySelector('#joinBtn').disabled = true;

      document.querySelector('#confirmJoinBtn').
          addEventListener('click', async () => {
            roomId = document.querySelector('#room-id').value;
            console.log('Join room: ', roomId);
            document.querySelector(
                '#currentRoom').innerText = `Current room is ${roomId} - You are the callee!`;
            await joinRoomById(roomId);
          }, {once: true});
      roomDialog.open();
    }

    async function joinRoomById(roomId) {
      //const db = firebase.firestore();
      const db = firestore;
      const roomRef = db.collection('rooms').doc(`${roomId}`);
      const roomSnapshot = await roomRef.get();
      console.log('Got room:', roomSnapshot.exists);

      if (roomSnapshot.exists) {
        console.log(roomSnapshot.data())
        console.log('Create PeerConnection with configuration: ', configuration);
        peerConnection[currentUser.id] = new RTCPeerConnection(configuration);
        registerPeerConnectionListeners();
        localStream.getTracks().forEach(track => {
          peerConnection[currentUser.id].addTrack(track, localStream);
        });

        // Code for collecting ICE candidates below
        const calleeCandidatesCollection = roomRef.collection('calleeCandidates');
        peerConnection[currentUser.id].addEventListener('icecandidate', event => {
          if (!event.candidate) {
            console.log('Got final candidate!');
            return;
          }
          console.log('Got candidate: ', event.candidate);
          calleeCandidatesCollection.add(event.candidate.toJSON());
        });
        // Code for collecting ICE candidates above

        peerConnection[currentUser.id].addEventListener('track', event => {
          console.log('Got remote track:', event.streams[0]);
          event.streams[0].getTracks().forEach(track => {
            console.log('Add a track to the remoteStream:', track);
            remoteStream.addTrack(track);
          });
        });

        // Code for creating SDP answer below
        const offer = roomSnapshot.data().offer;
        console.log('Got offer:', offer);
        await peerConnection[currentUser.id].setRemoteDescription(new RTCSessionDescription(offer));
        const answer = await peerConnection[currentUser.id].createAnswer();
        console.log('Created answer:', answer);
        await peerConnection[currentUser.id].setLocalDescription(answer);

        const roomWithAnswer = {
          answer: {
            type: answer.type,
            sdp: answer.sdp,
          },
        };
        await roomRef.update(roomWithAnswer);
        // Code for creating SDP answer above

        // Listening for remote ICE candidates below
        roomRef.collection('callerCandidates').onSnapshot(snapshot => {
          snapshot.docChanges().forEach(async change => {
            if (change.type === 'added') {
              let data = change.doc.data();
              console.log(`Got new remote ICE candidate: ${JSON.stringify(data)}`);
              await peerConnection[currentUser.id].addIceCandidate(new RTCIceCandidate(data));
            }
          });
        });
        // Listening for remote ICE candidates above
      }
    }

    async function openUserMedia(e) {
      const stream = await navigator.mediaDevices.getUserMedia(
          {video: true, audio: true});
      document.querySelector('#localVideo').srcObject = stream;
      localStream = stream;
      remoteStream = new MediaStream();
      document.querySelector('#remoteVideo').srcObject = remoteStream;

      console.log('Stream:', document.querySelector('#localVideo').srcObject);
      document.querySelector('#cameraBtn').disabled = true;
      document.querySelector('#joinBtn').disabled = false;
      document.querySelector('#createBtn').disabled = false;
      document.querySelector('#hangupBtn').disabled = false;
    }

    async function hangUp(e) {
      const tracks = document.querySelector('#localVideo').srcObject.getTracks();
      tracks.forEach(track => {
        track.stop();
      });

      if (remoteStream) {
        remoteStream.getTracks().forEach(track => track.stop());
      }

      if (peerConnection[currentUser.id]) {
        peerConnection[currentUser.id].close();
      }

      document.querySelector('#localVideo').srcObject = null;
      document.querySelector('#remoteVideo').srcObject = null;
      document.querySelector('#cameraBtn').disabled = false;
      document.querySelector('#joinBtn').disabled = true;
      document.querySelector('#createBtn').disabled = true;
      document.querySelector('#hangupBtn').disabled = true;
      document.querySelector('#currentRoom').innerText = '';

      // Delete room on hangup
      if (roomId) {
        //const db = firebase.firestore();
        const db = firestore;
        const roomRef = db.collection('rooms').doc(roomId);
        const calleeCandidates = await roomRef.collection('calleeCandidates').get();
        calleeCandidates.forEach(async candidate => {
          await candidate.ref.delete();
        });
        const callerCandidates = await roomRef.collection('callerCandidates').get();
        callerCandidates.forEach(async candidate => {
          await candidate.ref.delete();
        });
        await roomRef.delete();
      }

      document.location.reload(true);
    }

    function registerPeerConnectionListeners() {
      peerConnection[currentUser.id].addEventListener('icegatheringstatechange', () => {
        console.log(
            `ICE gathering state changed: ${peerConnection[currentUser.id].iceGatheringState}`);
      });

      peerConnection[currentUser.id].addEventListener('connectionstatechange', () => {
        console.log(`Connection state change: ${peerConnection[currentUser.id].connectionState}`);
      });

      peerConnection[currentUser.id].addEventListener('signalingstatechange', () => {
        console.log(`Signaling state change: ${peerConnection[currentUser.id].signalingState}`);
      });

      peerConnection[currentUser.id].addEventListener('iceconnectionstatechange ', () => {
        console.log(
            `ICE connection state change: ${peerConnection[currentUser.id].iceConnectionState}`);
      });
    }

    init();
  }, [])

  return (
    <Fragment>
      <h1>Welcome to FirebaseRTC!</h1>
      <div id="buttons">
          <button className="mdc-button mdc-button--raised" id="cameraBtn">
              <i className="material-icons mdc-button__icon" aria-hidden="true">perm_camera_mic</i>
              <span className="mdc-button__label">Open camera & microphone</span>
          </button>
          <button className="mdc-button mdc-button--raised" disabled id="createBtn">
              <i className="material-icons mdc-button__icon" aria-hidden="true">group_add</i>
              <span className="mdc-button__label">Create room</span>
          </button>
          <button className="mdc-button mdc-button--raised" disabled id="joinBtn">
              <i className="material-icons mdc-button__icon" aria-hidden="true">group</i>
              <span className="mdc-button__label">Join room</span>
          </button>
          <button className="mdc-button mdc-button--raised" disabled id="hangupBtn">
              <i className="material-icons mdc-button__icon" aria-hidden="true">close</i>
              <span className="mdc-button__label">Hangup</span>
          </button>
      </div>
      <div>
          <span id="currentRoom"></span>
      </div>
      <div id="videos">
          <video id="localVideo" muted autoPlay playsInline></video>
          <video id="remoteVideo" autoPlay playsInline></video>
      </div>
      <div className="mdc-dialog"
           id="room-dialog"
           role="alertdialog"
           aria-modal="true"
           aria-labelledby="my-dialog-title"
           aria-describedby="my-dialog-content">
          <div className="mdc-dialog__container">
              <div className="mdc-dialog__surface">
                  <h2 className="mdc-dialog__title" id="my-dialog-title">Join room</h2>
                  <div className="mdc-dialog__content" id="my-dialog-content">
                      Enter ID for room to join:
                      <div className="mdc-text-field">
                          <input type="text" id="room-id" className="mdc-text-field__input" />
                          <label className="mdc-floating-label" htmlFor="my-text-field">Room ID</label>
                          <div className="mdc-line-ripple"></div>
                      </div>
                  </div>
                  <footer className="mdc-dialog__actions">
                      <button type="button" className="mdc-button mdc-dialog__button" data-mdc-dialog-action="no">
                          <span className="mdc-button__label">Cancel</span>
                      </button>
                      <button id="confirmJoinBtn" type="button" className="mdc-button mdc-dialog__button"
                              data-mdc-dialog-action="yes">
                          <span className="mdc-button__label">Join</span>
                      </button>
                  </footer>
              </div>
          </div>
          <div className="mdc-dialog__scrim"></div>
      </div>
    </Fragment>
  )
}

const mapStateToProps = createStructuredSelector({
  currentUser: currentUser,
});

export default connect(mapStateToProps)(VideoChatContainer);
