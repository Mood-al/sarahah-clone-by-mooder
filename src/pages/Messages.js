import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { AppContext } from "../context";
import { firestore } from "../firebase/config";
import avatar from "../avatar.png";

const Messages = () => {
  const { user, setModal } = useContext(AppContext);
  const [msgs, setMsgs] = useState([]);
  const [userName, setUserName] = useState("");
  const location = useLocation();

  useEffect(() => {
    if (user) {
      let documents = [];
      firestore
        .collection("message")
        .doc(user.uid)
        .collection("messages")
        .orderBy("createdAt", "desc")
        .onSnapshot((docs) => {
          docs.forEach((msg) => {
            documents.push({ ...msg.data(), id: msg.id });
          });
          setMsgs(documents);
        });

      firestore
        .collection("users")
        .doc(user.uid)
        .get()
        .then((doc) => {
          setUserName(doc.data());
        });
    }
  }, [user]);

  return (
    <>
      <div className="msgs">
        <div className="avatar">
          <img src={avatar} alt="" />
        </div>
        <h5 className="font-weight-bold text-center">
          {userName && userName.user}
        </h5>
        <div className="msg-link">
          <Link to={`/messages/${user && user.uid}`}>
            {user &&
              `${window.location.origin}${location.pathname}/${user.uid}`}
          </Link>
          <i className="fas fa-share-alt" onClick={() => setModal(true)}></i>
        </div>
        {/* {msgs.map((item) => (
        <div key={item.id}>{item.message}</div>
      ))}
      <div>
        {" "}
        {userName && userName.user} مرحبا بك يا
        <h4>رابطك </h4>
        <Link to={`/messages/${user && user.uid}`}>
          {user && `${window.location.origin}${location.pathname}${user.uid}`}
        </Link>
      </div> */}
      </div>
      <div className="msgs-sec">
        {msgs.map((item) => {
          let time = item.createdAt.seconds * 1000;
          let currentTime = new Date(time);
          let min = currentTime.getMinutes();
          let hour = currentTime.getUTCHours();
          let date = currentTime.getDate();
          let month = currentTime.getMonth() + 1;
          let year = currentTime.getFullYear();

          let fullTime =
            hour + ":" + min + " / " + date + "-" + month + "-" + year;

          return (
            <div key={item.id} className="msg">
              <div className="content">{item.message}</div>
              <div className="footer">{fullTime}</div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Messages;
