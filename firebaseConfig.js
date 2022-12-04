import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, TwitterAuthProvider } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyAsrDblrH558aloxHQ7yKksmJtVenQRbgU",
  authDomain: "rnlinked-b7321.firebaseapp.com",
  projectId: "rnlinked-b7321",
  storageBucket: "rnlinked-b7321.appspot.com",
  messagingSenderId: "719823973560",
  appId: "1:719823973560:web:e7da27942fec6b2172184d",
  measurementId: "G-RDERS51X7W"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const google = new GoogleAuthProvider()
const twitter = new TwitterAuthProvider()
// const analytics = getAnalytics(app);

export { auth, google, twitter}