import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, TwitterAuthProvider } from 'firebase/auth'


const firebaseConfig = JSON.parse(
  process.env.NEXT_PUBLIC_FIREBASE_SANDBOX_CONFIG
);

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const google = new GoogleAuthProvider()
const twitter = new TwitterAuthProvider()
// const analytics = getAnalytics(app);

export { auth, google, twitter}