import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA-73pudSyRGn_Yq7_omWBQt3N-XRAQlZ4",
  authDomain: "whatsapp-clone-46142.firebaseapp.com",
  projectId: "whatsapp-clone-46142",
  storageBucket: "whatsapp-clone-46142.appspot.com",
  messagingSenderId: "1069690206874",
  appId: "1:1069690206874:web:f818939e1d85a6ef56fd23",
  measurementId: "G-YRX9CCM2L1",
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
