// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, TwitterAuthProvider } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAsrDblrH558aloxHQ7yKksmJtVenQRbgU",
  authDomain: "rnlinked-b7321.firebaseapp.com",
  projectId: "rnlinked-b7321",
  storageBucket: "rnlinked-b7321.appspot.com",
  messagingSenderId: "719823973560",
  appId: "1:719823973560:web:e7da27942fec6b2172184d",
  measurementId: "G-RDERS51X7W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const google = new GoogleAuthProvider()
const twitter = new TwitterAuthProvider()
// const analytics = getAnalytics(app);

export { auth, google, twitter}