import { FirebaseApp, getApp, initializeApp } from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { getFirestore } from "firebase/firestore";

export let app: FirebaseApp;

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

try {
  app = getApp("app");
} catch (e: any) {
  app = initializeApp(firebaseConfig);
  // app이 초기화되지 않는 상태로 실행되면 ERROR
  // initializeApp을 통해 다시 한번 초기화 해주기
}

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
export default firebase;

// firestore - database
export const db = getFirestore(app);
