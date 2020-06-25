import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = firebase.initializeApp({
  apiKey: "AIzaSyCHenMVTIdQWri5qerYS9YL_-za4TzB8rE",
  authDomain: "todoiest-clone.firebaseapp.com",
  databaseURL: "https://todoiest-clone.firebaseio.com",
  projectId: "todoiest-clone",
  storageBucket: "todoiest-clone.appspot.com",
  messagingSenderId: "236968285204",
  appId: "1:236968285204:web:950097140825ab94018301",
});

export { firebaseConfig as firebase };
