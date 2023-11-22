// AuthContext.js
import React, { useState, useEffect, useContext } from "react";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  async function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  async function signup(email, password, name) {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    console.log(user.uid); //user.uid is main
    const newRandomAvatar = getDefaultAvatar();
    await updateProfile(userCredential.user, {
      displayName: name,
      photoURL: newRandomAvatar,
    });
    return userCredential;
  }

  function logout() {
    return signOut(auth);
  }

  function resetPassword(email) {
    return sendPasswordResetEmail(auth, email);
  }

  const [isSigningIn, setIsSigningIn] = useState(false);

  async function googleSignUp() {
    setIsSigningIn(true);
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log(user.uid); //user.uid is main
      if (user.photoURL) {
        await updateProfile(user, { photoURL: user.photoURL });
      } else {
        const newRandomAvatar = getDefaultAvatar();
        await updateProfile(user, { photoURL: newRandomAvatar });
        localStorage.setItem("userAvatar", newRandomAvatar);
      }
      setIsSigningIn(false);
      // return user.uid;
    } catch (error) {
      console.error(error);
      setIsSigningIn(false);
    }
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setCurrentUser(user);
      if (user) {
        const storedAvatar = localStorage.getItem("userAvatar");
        if (!storedAvatar) {
          const newRandomAvatar = getDefaultAvatar();
          await updateProfile(user, { photoURL: newRandomAvatar });
          localStorage.setItem("userAvatar", newRandomAvatar);
        }
      }

      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    googleSignUp,
    isSigningIn,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

function getDefaultAvatar() {
  const generateRandomString = () => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const randomString = Array.from(
      { length: 10 },
      () => characters[Math.floor(Math.random() * characters.length)]
    ).join("");
    return randomString;
  };
  const randomString = generateRandomString();
  return `https://robohash.org/${randomString}.png`;
}
