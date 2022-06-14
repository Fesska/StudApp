import { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";

import { app, db } from "../components/utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth/";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const auth = getAuth(app);
  const authState = useAuthState(auth);

  const signIn = (newUser, cb) => {
    signInWithEmailAndPassword(auth, newUser.login, newUser.password)
      .then(() => {
        const updateUserInfo = async () => {
          const usersCollectionRef = collection(db, "users");
          // Запрашиваем пользователя из коллекции users по совпадению поля UID

          const q = query(
            usersCollectionRef,
            where("uuid", "==", auth.currentUser.uid)
          );

          const data = await getDocs(q);
          const userRef = data.docs.pop().data();
          const rights = userRef.rights;
          const name = userRef.name;
          const group = userRef.group;

          setUser({
            login: newUser.login,
            name: name,
            group: group,
            rights: rights,
          });

          console.log("user " + newUser.login + " logged in");

          cb();
        };

        updateUserInfo();
      })
      .catch((error) => {
        console.log(error.code);
        console.log(error.message);
      });
  };

  const signOut = (cb) => {
    auth.signOut().then(setUser(null));
    cb();
  };

  const signUp = (newUser, cb) => {
    createUserWithEmailAndPassword(auth, newUser.login, newUser.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        const usersCollectionRef = collection(db, "users");

        const createNewUser = async () => {
          await addDoc(usersCollectionRef, {
            name: newUser.name,
            group: newUser.group,
            rights: newUser.rights,
            uuid: user.uid,
          });
        };

        setUser({
          login: newUser.login,
          name: newUser.name,
          group: newUser.group,
          rights: newUser.rights,
        });

        createNewUser();

        console.log("user " + newUser.login + "created");
        cb();
      })
      .catch((error) => {
        console.log(error.code);
        console.log(error.message);
      });
  };

  useEffect(() => {
    if (authState[0]) {
      const updateUserInfo = async () => {
        const usersCollectionRef = collection(db, "users");

        // Запрашиваем пользователя из коллекции users по совпадению поля UID
        const q = query(
          usersCollectionRef,
          where("uuid", "==", auth.currentUser.uid)
        );

        const data = await getDocs(q);
        const userRef = data.docs.pop().data();
        const rights = userRef.rights;
        const name = userRef.name;
        const group = userRef.group;

        setUser({
          login: auth.currentUser.email,
          name: name,
          group: group,
          rights: rights,
        });

        console.log("user " + auth.currentUser.email + " logged in");
      };

      updateUserInfo();
    }
  }, [authState]);

  const value = { user, signIn, signOut, signUp };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
