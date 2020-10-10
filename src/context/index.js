import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import { auth } from "../firebase/config";
const AppContext = createContext();
const AppProvider = (props) => {
  const [isUser, setIsUser] = useState(true);
  const [user, setUser] = useState(null);
  const [link, setLink] = useState(null);
  const [modal, setModal] = useState(false);
  const [err, setErr] = useState("");
  const [bar, setBar] = useState(false);
  useEffect(() => {
    // const unsub = () => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setIsUser(true);
        setUser(user);
      } else {
        setIsUser(false);
        setUser(null);
      }
    });
    // setUser(auth.currentUser);
    // };
    // return () => unsub();
  }, []);

  const handleErr = (text) => {
    setTimeout(() => {
      setErr(text);
    }, 0);
    setTimeout(() => {
      setErr("");
    }, 2000);
  };
  return (
    <AppContext.Provider
      value={{
        isUser,
        user,
        setLink,
        link,
        setModal,
        modal,
        handleErr,
        setErr,
        err,
        setBar,
        bar,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
