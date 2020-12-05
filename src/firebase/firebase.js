import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyDmCqMkczTGdbcpZY1tGp02Z_O51X1pTuw",
    authDomain: "go-dutch-app.firebaseapp.com",
    databaseURL: "https://go-dutch-app.firebaseio.com",
    projectId: "go-dutch-app",
    storageBucket: "go-dutch-app.appspot.com",
    messagingSenderId: "610107686270",
    appId: "1:610107686270:web:32ff304857db5bbb95c72f",
    measurementId: "G-WB2EXRVS1B"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
firebase.database().ref().set({
    name:"Rahul Nayak"
})