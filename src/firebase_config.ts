import firebase from "firebase/compat/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase } from "firebase/database";
import "firebase/compat/auth";

import Config from "config";

//firebaseの初期化
const firebaseConfig = {
  apiKey: Config.firebase.apiKey,
  authDomain: Config.firebase.authDomain,
  projectId: Config.firebase.projectId,
  storageBucket: Config.firebase.storageBucket,
  messagingSenderId: Config.firebase.messagingSenderId,
  appId: Config.firebase.appId,
};

firebase.initializeApp(firebaseConfig);

//authentication
const _auth = getAuth();

//サインアウト
export const signOutAsync = async () => {
  firebase.auth().signOut();
};

//tokenの取得
export const getIdToken = () => {
  const token = localStorage.getItem("idToken");
  return token;
};

//認証情報が変化した時のリスナー(匿名ログイン時も呼ばれる)
onAuthStateChanged(_auth, (user) => {
  if (user) {
    // User is signed in
    user.getIdToken().then((token) => localStorage.setItem("idToken", token));
  } else {
    // User is signed out
    localStorage.removeItem("idToken");

    //匿名でログインしておく
    // signInAnonymously(_auth)
    //   .then(() => {
    //     console.log(`you are anonymous!`);
    //   })
    //   .catch((error) => {
    //     const errorCode = error.code;
    //     const errorMessage = error.message;
    //     console.log(`errorCode: ${errorCode}\nerrorMessage : ${errorMessage}`);
    //   });
  }
});

//database
export const db = getDatabase();

export const auth = _auth;
