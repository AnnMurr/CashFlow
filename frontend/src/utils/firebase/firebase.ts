import { FirebaseApp, initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, Auth, UserCredential, signInWithRedirect } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCu86icDngL2belrTnZ96tFqwipiS99gMQ",
  authDomain: "cash-flow-743b5.firebaseapp.com",
  projectId: "cash-flow-743b5",
  storageBucket: "cash-flow-743b5.appspot.com",
  messagingSenderId: "326851640470",
  appId: "1:326851640470:web:b1287c2bf1accc3a3796b7"
};

let firebaseApp: FirebaseApp | undefined;

const initializeFirebase = () => {
  if (!firebaseApp) {
    firebaseApp = initializeApp(firebaseConfig);
  }
};

const provider: GoogleAuthProvider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});

export const getFirebaseAuth = (): Auth => {
  initializeFirebase();
  return getAuth(firebaseApp);
};

export const signInWithGoogle = (): Promise<UserCredential | void> => {
  const auth = getFirebaseAuth();

  return signInWithPopup(auth, provider).catch((error) => {
    console.error("Error during desktop Google sign-in popup:", error.code, error.message, error);
  });
};