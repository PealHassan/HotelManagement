
import { initializeApp } from "firebase/app";
import {getStorage} from 'firebase/storage';
const firebaseConfig = {
  apiKey: "AIzaSyDs-yWhyV8NDKUJfH7fuHJXGLNGBw5SIUw",
  authDomain: "hotelmanagement-39bbf.firebaseapp.com",
  projectId: "hotelmanagement-39bbf",
  storageBucket: "hotelmanagement-39bbf.appspot.com",
  messagingSenderId: "672083501081",
  appId: "1:672083501081:web:5bb94ee6fa9c68665dca88"
};

const app = initializeApp(firebaseConfig);

export const imageDb = getStorage(app);