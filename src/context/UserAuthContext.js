import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

import { sendEmailNotification } from "./yourEmailService";
const auth = getAuth();

const userAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
  const [user, setUser] = useState({});
  // const [loginAttempts, setLoginAttempts] = useState(0);
  // const [loginAttempts, setLoginAttempts] = useState(parseInt(localStorage.getItem('loginAttempts')) || 0);

  function logIn(email, password, loginAttempts, time) {
    var nowtime = Date.now();
    console.log("Your account is blocked for 1 hour." , nowtime - time);
    if (loginAttempts > 4) {
      if (nowtime - time < 3600000) {
      alert("Your account is blocked for 1 hour.");
      return;
      } 
      else {
        const editedInfo = {
          loginAttempts: "0",
        };
        console.log(editedInfo);

        fetch(`https://twitter-clone-backend-h1kp.onrender.com/userUpdates/${email}`, {
          method: "PATCH",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(editedInfo),
        });
        return;
    } 
    }
    else {
      return signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          console.log(loginAttempts);
          const editedInfo = {
            loginAttempts: "0",
          };
          console.log(editedInfo);

          fetch(`https://twitter-clone-backend-h1kp.onrender.com/userUpdates/${email}`, {
            method: "PATCH",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(editedInfo),
          });
        })
        .catch((error) => {
          const updatedLoginAttempts = parseInt(loginAttempts, 10) + 1; // Increment login attempts
          console.log(updatedLoginAttempts, loginAttempts);
          const editedInfo = {
            loginAttempts: updatedLoginAttempts,
          };
          console.log(editedInfo);
          fetch(`https://twitter-clone-backend-h1kp.onrender.com/userUpdates/${email}`, {
            method: "PATCH",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(editedInfo),
          });
          console.log("Login attempts k", loginAttempts);
          if (2 <= loginAttempts && loginAttempts < 4) {
            sendEmailNotification(email, {
              message: ` You have done ${
                loginAttempts + 1
              } consecutive failed login attempts with an incorrect password`,
            });
            alert(
              ` You have done ${
                loginAttempts + 1
              } consecutive failed login attempts with an incorrect password`
            );
          } else if (loginAttempts >= 4) {
            sendEmailNotification(email, {
              message: ` You have done maximum failed attempts. Your account has been blocked for 1 hour.`,
            });
            alert(
              "You have done maximum failed attempts. Your account has been blocked for 1 hour."
            );
            const updatedTime = Date.now();
            const editedInfo = {
              loginAttempts: updatedLoginAttempts,
              time: updatedTime,
            };
            console.log(editedInfo);
            fetch(`https://twitter-clone-backend-h1kp.onrender.com/userUpdates/${email}`, {
              method: "PATCH",
              headers: {
                "content-type": "application/json",
              },
              body: JSON.stringify(editedInfo),
            });
          }
          throw error;
        });
    }
  }

  function signUp(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }
  function logOut() {
    return signOut(auth);
  }
  function googleSignIn() {
    const googleAuthProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleAuthProvider);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
      setUser(currentuser);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <userAuthContext.Provider
      value={{ user, logIn, signUp, logOut, googleSignIn }}
    >
      {children}
    </userAuthContext.Provider>
  );
}

export function useUserAuth() {
  return useContext(userAuthContext);
}
