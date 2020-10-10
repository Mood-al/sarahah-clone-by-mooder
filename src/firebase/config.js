import * as firebase from "firebase/app";
import { firebaseConfig } from "../firebaseConfig/firebaseConfig";
import "firebase/auth";
import "firebase/firestore";

// Your web app's Firebase configuration

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const firestore = firebase.firestore();
const auth = firebase.auth();
const timeStamp = firebase.firestore.FieldValue.serverTimestamp;
export { firestore, auth, timeStamp };
