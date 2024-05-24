// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCST71mGhM-WPi_cjW7RzYCDdh4MtVruEE',
  authDomain: 'dwtraining-aceves.firebaseapp.com',
  projectId: 'dwtraining-aceves',
  storageBucket: 'dwtraining-aceves.appspot.com',
  messagingSenderId: '204349201630',
  appId: '1:204349201630:web:7294e2e4230eb5725cf64f'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const storage = getStorage(app)
const auth = getAuth(app)

export { app, db, storage, auth }
