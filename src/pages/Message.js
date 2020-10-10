import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { firestore, timeStamp } from "../firebase/config";
import avatar from "../avatar.png";
import { useContext } from "react";
import { AppContext } from "../context";
const Message = () => {
  const [msg, setMsg] = useState("");
  const [userName, setUserName] = useState("");
  const { id } = useParams();
  const { isUser } = useContext(AppContext);
  const [err, setErr] = useState("");
  const [msgSent, setMsgSent] = useState(false);
  const onTextareaChange = (e) => {
    setMsg(e.target.value);
  };
  const onFormSubmit = (e) => {
    e.preventDefault();
    if (msg) {
      firestore
        .collection("message")
        .doc(id)
        .collection("messages")
        .add({ message: msg, createdAt: timeStamp() });
      setMsg("");
      setMsgSent(true);
    } else {
      setMsgSent(false);
      setTimeout(() => {
        setErr("يجب عليك كتابة رسالة");
      }, 100);
      setTimeout(() => {
        setErr("");
      }, 2000);
    }

    // fetch username
  };
  useEffect(() => {
    firestore
      .collection("users")
      .doc(id)
      .get()
      .then((doc) => {
        setUserName(doc.data());
        console.log(doc.data());
      });
  }, [id]);
  return (
    <section className="msgs">
      {msgSent ? (
        <h3 className="text-center display-4">" شكراً لصراحتك :)</h3>
      ) : (
        <>
          <div className="avatar">
            <img src={avatar} alt="" />
          </div>
          <h5 className="font-weight-bold text-center">
            {userName && userName.user}
          </h5>
          <form className="msg-form" onSubmit={onFormSubmit}>
            <textarea
              name="msg"
              cols="30"
              rows="10"
              disabled={isUser ? true : false}
              value={msg}
              onChange={onTextareaChange}
              placeholder=":)اجعل رسالتك بناءة"
            ></textarea>
            <button type="submit" disabled={isUser ? true : false}>
              ارسال <i className="fas fa-paper-plane"></i>
            </button>
          </form>
          <h3 className="text-center my-4">
            {isUser
              ? "لا يمكنك إرسال صراحة إلى نفسك، يرجى مشاركة رابط حسابك مع أصدقائك :)"
              : ""}
          </h3>
          <h4 className="text-center my-4 text-danger">{err}</h4>
        </>
      )}
    </section>
  );
};

export default Message;
