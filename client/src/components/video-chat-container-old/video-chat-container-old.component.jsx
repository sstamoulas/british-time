import React from 'react'
import 'webrtc-adapter'
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import VideoChat from './../video-chat/video-chat.component'

import { currentUser } from './../../redux/user/user.selectors';

import { 
  createOffer, 
  initiateConnection, 
  startCall, 
  sendAnswer, 
  addCandidate, 
  initiateLocalStream, 
  listenToConnectionEvents 
} from './../../firebase/rtc-module'
import { 
  doOffer, 
  doAnswer, 
  doLogin, 
  doCandidate 
} from './../../firebase/firebase-module'

import { database } from './../../firebase/firebase.utils'

class VideoChatContainer extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      database: null,
      connectedUser: null,
      localStream: null,
      localConnection: null
    }
    this.localVideoRef = React.createRef()
    this.remoteVideoRef = React.createRef()
  }

    componentDidMount = async () => {
      // getting local video stream
      const localStream = await initiateLocalStream()
      this.localVideoRef.srcObject = localStream

      const localConnection = await initiateConnection()

      this.setState({
        database: database,
        localStream,
        localConnection
      })

      this.onLogin(this.props.currentUser.userName)
    }

    shouldComponentUpdate (nextProps, nextState) {
      if (this.state.database !== nextState.database) {
        return false
      }
      if (this.state.localStream !== nextState.localStream) {
        return false
      }
      if (this.state.localConnection !== nextState.localConnection) {
        return false
      }

      return true
    }

    startCall = async (username, userToCall) => {
      const { localConnection, database, localStream } = this.state
      listenToConnectionEvents(localConnection, this.props.currentUser.userName, this.props.roomToCall, database, this.remoteVideoRef, doCandidate)
      // create an offer
      createOffer(localConnection, localStream, this.props.roomToCall, doOffer, database, this.props.currentUser.userName)
    }

    onLogin = async (username) => {
      return await doLogin(this.props.currentUser.userName, this.state.database, this.handleUpdate)
    }

    setLocalVideoRef = ref => {
      this.localVideoRef = ref
    }

    setRemoteVideoRef = ref => {
      this.remoteVideoRef = ref
    }

    handleUpdate = (notif, username) => {
      const { localConnection, database, localStream } = this.state

      if (notif) {
        switch (notif.type) {
          case 'offer':
            this.setState({
              connectedUser: notif.from
            })

            listenToConnectionEvents(localConnection, this.props.currentUser.userName, notif.from, database, this.remoteVideoRef, doCandidate)

            sendAnswer(localConnection, localStream, notif, doAnswer, database, this.props.currentUser.userName)
            break
          case 'answer':

            this.setState({
              connectedUser: notif.from
            })
            startCall(localConnection, notif)
            break
          case 'candidate':
            addCandidate(localConnection, notif)
            break
          default:
            break
        }
      }
    }

    render () {
      return <VideoChat
        startCall={this.startCall}
        onLogin={this.onLogin}
        setLocalVideoRef={this.setLocalVideoRef}
        setRemoteVideoRef={this.setRemoteVideoRef}
        connectedUser={this.state.connectedUser}
      />
    }
}

const mapStateToProps = createStructuredSelector({
  currentUser: currentUser,
});

export default connect(mapStateToProps)(VideoChatContainer);
