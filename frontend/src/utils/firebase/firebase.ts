import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, Auth, UserCredential } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCu86icDngL2belrTnZ96tFqwipiS99gMQ",
  authDomain: "cash-flow-743b5.firebaseapp.com",
  projectId: "cash-flow-743b5",
  storageBucket: "cash-flow-743b5.appspot.com",
  messagingSenderId: "326851640470",
  appId: "1:326851640470:web:b1287c2bf1accc3a3796b7"
};

const firebaseApp = initializeApp(firebaseConfig);

const provider: GoogleAuthProvider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: "select_account",
});

export const auth: Auth = getAuth();
export const signInWithGooglePopup = (): Promise<UserCredential> => {
    return signInWithPopup(auth, provider);
};