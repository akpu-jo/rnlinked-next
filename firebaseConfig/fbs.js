import admin from "firebase-admin";

const serviceAccount = JSON.parse(
  process.env.FIREBASE_SANDBOX_SERVICE_ACCOUNT_KEY
);

if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  } catch (error) {
    console.log("Firebase admin initialization error", error);
  }
}

export default admin;
