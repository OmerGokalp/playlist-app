import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBH5AuRxbZHO2VgVS3UanmLMj78cN1Fpwg",
  authDomain: "playlistapp-vue.firebaseapp.com",
  projectId: "playlistapp-vue",
  storageBucket: "playlistapp-vue.appspot.com",
  messagingSenderId: "356069940397",
  appId: "1:356069940397:web:3e5d0a5b1b8fb694eb3a24"
};

firebase.initializeApp(firebaseConfig);

const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export {projectFirestore, projectAuth, timestamp};