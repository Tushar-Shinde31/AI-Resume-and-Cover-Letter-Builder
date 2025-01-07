import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDWeXZGCYW0SESwlnlNws515ttLtoli3vE",
  authDomain: "resume-builder-d7f7a.firebaseapp.com",
  projectId: "resume-builder-d7f7a",
  storageBucket: "resume-builder-d7f7a.firebasestorage.app",
  messagingSenderId: "103217757410",
  appId: "1:103217757410:web:c3741d0e23e86499c872bb",
  measurementId: "G-E4V47B2GG9"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
