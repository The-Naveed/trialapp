import {
    collection,
    addDoc,
    getFirestore,
    doc,
    getDoc,
    getDocs,
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";

import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";

import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";

import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-storage.js";

import {
    getDatabase,
    child,
    get
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-database.js";


const firebaseConfig = {
    apiKey: "AIzaSyDfbQ4VS31zReB09kcJnkkuFd0n-tRhAJE",
    authDomain: "blog-app-97a7a.firebaseapp.com",
    projectId: "blog-app-97a7a",
    storageBucket: "blog-app-97a7a.appspot.com",
    messagingSenderId: "1011858022371",
    appId: "1:1011858022371:web:257e155ff9acd5bed7cad6"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {
    app,
    db,
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
    collection,
    addDoc,
    getDatabase,
    child,
    get,
    doc,
    getDoc,
    getDocs,
};
