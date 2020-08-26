import * as firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyCf_4U2zK13iWDkLvGDu6YoFPNsWrFb5VQ",
    authDomain: "oowlish-7398e.firebaseapp.com",
    databaseURL: "https://oowlish-7398e.firebaseio.com",
    projectId: "oowlish-7398e",
    storageBucket: "oowlish-7398e.appspot.com",
    messagingSenderId: "949847031312",
    appId: "1:949847031312:web:cb7d8cfa097ad77b961495"
  };

  export default !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();