import { initializeApp } from 'firebase/app';
import { getMessaging } from 'firebase/messaging';

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBr1Kp9VlPV361hUFg_U4Pj8P_2diF-pw4",
    authDomain: "commbitz-7293c.firebaseapp.com",
    projectId: "commbitz-7293c",
    storageBucket: "commbitz-7293c.appspot.com",
    messagingSenderId: "854165258030",
    appId: "1:854165258030:web:f4b3771fb60aa10efcc4bf",
    measurementId: "G-EYZQQBK33W"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Retrieve Firebase Messaging object
const messaging : any= getMessaging(app);

export { messaging };