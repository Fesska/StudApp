import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// ВНИМАНИЕ! Это пример конфигурационного файла Firebase.
const firebaseConfig = {
  apiKey: "Your-api-key",
  authDomain: "Your-auth-domain.firebaseapp.com",
  projectId: "Your-project-id",
  storageBucket: "Your-project-id.appspot.com",
  messagingSenderId: "Your-sender-id",
  appId: "Your-app-id",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const db = getFirestore(app);
