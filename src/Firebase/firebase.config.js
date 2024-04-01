// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAbf724A--Uoq7VF8qE89Avlt24rEM1WDY",
  authDomain: "user-email-password-auth-4d67c.firebaseapp.com",
  projectId: "user-email-password-auth-4d67c",
  storageBucket: "user-email-password-auth-4d67c.appspot.com",
  messagingSenderId: "7767866918",
  appId: "1:7767866918:web:ea45d4a6d0e197f5dcb0e7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
export default auth