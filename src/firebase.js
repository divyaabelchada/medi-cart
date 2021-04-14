import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDZE-ooSYB6CJb-VU44adCIN-VsZvgCJD8",
  authDomain: "omega-lul.firebaseapp.com",
  projectId: "omega-lul",
  storageBucket: "omega-lul.appspot.com",
  messagingSenderId: "482160368321",
  appId: "1:482160368321:web:c1bf940c893168f2a1d240",
  measurementId: "G-H444D6ES01",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider, storage };
export default db;
