import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";


// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_FIREBASE_KEY,
//   authDomain: "video-7801c.firebaseapp.com",
//   projectId: "video-7801c",
//   storageBucket: "video-7801c.appspot.com",
//   messagingSenderId: "130073115219",
//   appId: "1:130073115219:web:365035e1474abbe7fba4a6",
// };

const firebaseConfig = {                //this is the correct one
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "clone-75ba9.firebaseapp.com",
  projectId: "clone-75ba9",
  storageBucket: "clone-75ba9.appspot.com",
  messagingSenderId: "355390996118",
  appId: "1:355390996118:web:7b91f05eb71472e2a1ccb7",
  measurementId: "G-L6GH0M1NZ8"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();

export default app;


