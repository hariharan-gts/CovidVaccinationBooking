import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyDdq9F5nbzSRLbMMH5wr67HVxHBRTPsNmQ",
  authDomain: "covidvaccine-6a04d.firebaseapp.com",
  projectId: "covidvaccine-6a04d",
  storageBucket: "covidvaccine-6a04d.appspot.com",
  messagingSenderId: "861551621566",
  appId: "1:861551621566:web:122bc297a671634ca4b5ef"
};


const app = initializeApp(firebaseConfig);
export const  db=getFirestore(app)
export const auth=getAuth(app)