// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBmv0NffpiAvGu9ailcx6LZbKbVLyHFHQ8",
  authDomain: "birthcount-56e78.firebaseapp.com",
  projectId: "birthcount-56e78",
  storageBucket: "birthcount-56e78.appspot.com",
  messagingSenderId: "1051785615378",
  appId: "1:1051785615378:web:ef243553f5eef5f85fe0cb",
  measurementId: "G-ZZ74Y8XHX3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;