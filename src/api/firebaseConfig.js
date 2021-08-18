import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

export const firebaseConfig = {
    apiKey: "AIzaSyAvhq7JoXbidVmW3RMrDtvlhc2iiyj4Tf4",
    authDomain: "vue-project1-4f68c.firebaseapp.com",
    projectId: "vue-project1-4f68c",
    storageBucket: "vue-project1-4f68c.appspot.com",
    messagingSenderId: "412496394687",
    appId: "1:412496394687:web:9374f5eb5c8d17b820c90a",
    measurementId: "G-YRFBSGKGWL",
};

const app = firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();

export default firebase;
