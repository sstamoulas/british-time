import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

// import ProfileImage from './../profile-image/profile-image.component';

import { currentUser } from './../../redux/user/user.selectors';

import { database } from "./../../firebase/firebase.utils";

import './chat.styles.scss';


const INITIAL_STATE = {
  user: null,
  chats: [],
  content: '',
  readError: null,
  writeError: null
}

const Chat = ({ currentUser, room, activeTab }) => {
  const [state, setState] = useState({ ...INITIAL_STATE, user: currentUser })
  useEffect(() => {
    const init = async () => {
      setState(prevState => ({ ...prevState, readError: null }));
      try {
        database.ref(room).on("value", snapshot => {
          let chats = [];
          snapshot.forEach((snap) => {
            chats.push({...snap.val(), key: snap.key });
          });

          setState(prevState => ({ ...prevState, chats }));
        });
      } catch (error) {
        setState(prevState => ({ ...prevState, readError: error.message }));
      }
    }

    //console.log('loaded', room)

    init();

    return () => setState({ ...INITIAL_STATE, user: currentUser });
  }, [room])

  const handleChange = (event) => {
    event.persist();
    //console.log(event.target.value)
    setState(prevState => ({ ...prevState, content: event.target.value }));
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    setState(prevState => ({ ...prevState, writeError: null }));

    //console.log(state)
    try {
      if(state.chats.length > 0 && state.chats[state.chats.length - 1].uid === state.user.id) {
        let newContent = state.content;
        newContent = `${state.chats[state.chats.length - 1].content} <br /> ${newContent}`;

        await database.ref(`${room}/${state.chats[state.chats.length - 1].key}`).update({
          content: newContent,
          timestamp: Date.now(),
          uid: state.user.id
        });
      }
      else {
        await database.ref(room).push({
          content: state.content,
          timestamp: Date.now(),
          uid: state.user.id
        });
      }

      setState(prevState => ({ ...prevState, content: '' }));
    } catch (error) {
      //console.log('error:', error)
      setState(prevState => ({ ...prevState, writeError: error.message }));
    }
  }

  return (
    <div className={`chatroom tabs--tab-content--adAng  ${activeTab === 'Ask Instructor' && 'tabs--active--2rPuV'}`}>
      {
        // <div className="chat-top">
        //   <div className="name">
        //     <h3>{room}</h3>
        //   </div>
        // </div>
      }
      <div className="chat-mid">
        {
          state.chats.map((chat, index) => {
            const chatItems = chat.content.split('<br />')
            return (
              <div className="chat" key={chat.timestamp}>
                <div className={`chatbox ${chat.uid === currentUser.id ? 'left' : 'right'}`}>
                  {
                    // <div className="profile">
                    //   <ProfileImage
                    //     className="icon" 
                    //     publicId={chat.uid} 
                    //     width="64" 
                    //     height="64" 
                    //     style={{width: '6.4rem', height: '6.4rem'}} 
                    //   />
                    // </div>
                  }
                  <div className="message">
                    <p>{chatItems.map((chatItem, index) => <span key={index}>{chatItem}<br /></span>)}</p>
                  </div>
                </div>
              </div>
            )
          })
        }
      </div>
      <div className="inputbox chat-bottom">
        <form onSubmit={handleSubmit} style={{paddingBottom: '10px'}}>
          <input type="text" placeholder="..." onChange={handleChange} value={state.content} />
          <button type="submit"><span>+</span></button>
        </form>
      </div>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  currentUser: currentUser,
});

export default connect(mapStateToProps)(Chat);
