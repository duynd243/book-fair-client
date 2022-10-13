import {
    FirebaseApp,
    FirebaseOptions,
    getApps,
    initializeApp,
} from 'firebase/app';
import { FirebaseStorage, getStorage } from 'firebase/storage';

const firebaseConfig: FirebaseOptions = {
    apiKey: 'AIzaSyDCRybjjRYw5nNVtPv92g4tLurpYsq5Vsw',
    authDomain: 'book-fair-fb8f1.firebaseapp.com',
    projectId: 'book-fair-fb8f1',
    storageBucket: 'book-fair-fb8f1.appspot.com',
    messagingSenderId: '652368417331',
    appId: '1:652368417331:web:1765d15f4e8d9fd8e88946',
    measurementId: 'G-G7DCRBF3NQ',
};

const initFirebaseApp = function () {
    if (!getApps().length) {
        initializeApp(firebaseConfig);
        console.log("Firebase has been init successfully");
    }
}

// Initialize Firebase
const app: FirebaseApp = initializeApp(firebaseConfig);
const storage: FirebaseStorage = getStorage(app);

export {initFirebaseApp, app, storage};
