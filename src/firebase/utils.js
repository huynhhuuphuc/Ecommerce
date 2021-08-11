import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import { firebaseConfig } from "./config";

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const GoogleProvider = new firebase.auth.GoogleAuthProvider();
GoogleProvider.setCustomParameters({ prompt: "select_account" });

export const handleUserProfile = async ({ userAuth, additionalData }) => {
  // Kiểm tra người dùng có trong firebase chưa
  // Lấy đối tượng xác thực người dùng
  if (!userAuth) return;
  const { uid } = userAuth;

  const userRef = firestore.doc(`users/${uid}`);
  const snapshot = await userRef.get();
  const userRoles = ["user"];

  if (!snapshot.exists) {
    // Nếu họ không tồn tại
    const { displayName, email } = userAuth;
    const timestamp = new Date();
    try {
      await userRef.set({
        // Thì tạo 1 tài liệu mới trong firebase và lưu trữ thông tin họ
        displayName,
        email,
        createdDated: timestamp,
        userRoles,
        ...additionalData,
      });
    } catch (err) {
      // console.log(err);
    }
  }
  return userRef;
};

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      unsubscribe();
      resolve(userAuth); // Lấy người dùng hiện tại và return đối tượng người dùng đó
    }, reject);
  });
};
