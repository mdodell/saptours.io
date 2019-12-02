import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID
};

firebase.initializeApp(firebaseConfig);
firebase.firestore();

// firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE); // This sets persistence off. It can be turned on.

firebase.auth().onAuthStateChanged((user) => {
    if(user) {
        firebase.firestore().collection('users').doc(user.uid).update({
            lastLogin: firebase.firestore.FieldValue.serverTimestamp(),
            loginCount: firebase.firestore.FieldValue.increment(1)
        }).catch(error => console.log(`There was an error updated the user's newest login: ${error.message}`));
    }
});

export default firebase;