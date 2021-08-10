import { auth } from "../../firebase/utils";

export const handleResetPasswordAPI = (email) => {
  const conif = {
    url: "http://localhost:3000/login",
  };

  return new Promise((resolve, reject) => {
    auth
      .sendPasswordResetEmail(email, conif)
      .then(() => {
        resolve();
      })
      .catch(() => {
        const err = ["Email not found. Please try again"];
        reject(err);
      });
  });
};
