import React, { Component, useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { currentUser } from './../../redux/user/user.selectors';

import { database } from "./../../firebase/firebase.utils"


const INITIAL_STATE = {
  user: null,
  chats: [],
  content: '',
  readError: null,
  writeError: null
}

const Chat = ({ currentUser }) => {
  const [state, setState] = useState({ ...INITIAL_STATE, user: currentUser })
  useEffect(() => {
    const init = async () => {
      setState(prevState => ({ ...prevState, readError: null }));
      try {
        database.ref("chats").on("value", snapshot => {
          let chats = [];
          snapshot.forEach((snap) => {
            chats.push(snap.val());
          });

          setState(prevState => ({ ...prevState, chats }));
        });
      } catch (error) {
        setState(prevState => ({ ...prevState, readError: error.message }));
      }
    }

    init();
  }, [])

  const handleChange = (event) => {
    event.persist();
    setState(prevState => ({ ...prevState, content: event.target.value }));
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setState(prevState => ({ ...prevState, writeError: null }));
    try {
      await database.ref("chats").push({
        content: state.content,
        timestamp: Date.now(),
        uid: state.user
      });

      setState(prevState => ({ ...prevState, content: '' }));
    } catch (error) {
      setState(prevState => ({ ...prevState, writeError: error.message }));
    }
  }

  return (
    <div>
      <div className="chats">
        {state.chats.map(chat => {
          return <p key={chat.timestamp}>{chat.content}</p>
        })}
      </div>
      <form onSubmit={handleSubmit}>
        <input onChange={handleChange} value={state.content} />
        {state.error ? <p>{state.writeError}</p> : null}
        <button type="submit">Send</button>
      </form>
      <div>
        Login in as: <strong>{state.user.userName}</strong>
      </div>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  currentUser: currentUser,
});

export default connect(mapStateToProps)(Chat);
