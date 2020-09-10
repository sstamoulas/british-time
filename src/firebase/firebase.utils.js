import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const database = firebase.database();
export const firestore = firebase.firestore();

  // *** Auth API ***
 
export const doCreateUserWithEmailAndPassword = (email, password) =>
    auth.createUserWithEmailAndPassword(email, password);

export const doSignInWithEmailAndPassword = (email, password) =>
    auth.signInWithEmailAndPassword(email, password);

export const doSignOut = () => auth.signOut();

export const doPasswordReset = email => auth.sendPasswordResetEmail(email);
 
export const doPasswordUpdate = password =>
    auth.currentUser.updatePassword(password);

  // *** Merge Auth and DB User API *** //
 
export const onAuthUserListener = (next, fallback) =>
    auth.onAuthStateChanged(authUser => {
      if (authUser) {
        user(authUser.uid)
          .once('value')
          .then(snapshot => {
            const dbUser = snapshot.val();
 
            // default empty roles
            if (!dbUser.roles) {
              dbUser.roles = {};
            }
 
            // merge auth and db user
            authUser = {
              uid: authUser.uid,
              email: authUser.email,
              ...dbUser,
            };
 
            next(authUser);
          });
      } else {
        fallback();
      }
    });

  // *** User API ***
 
export const user = uid => database.ref(`users/${uid}`);
 
export const users = () => database.ref('users');

export default firebase;
