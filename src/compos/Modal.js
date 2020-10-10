import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { useLocation } from "react-router-dom";
import { AppContext } from "../context";
import { CopyToClipboard } from "react-copy-to-clipboard";
const Modal = () => {
  const { user, setModal } = useContext(AppContext);
  const location = useLocation();
  const [link, setLink] = useState("");
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    if (user) {
      setLink(`${window.location.origin}${location.pathname}/${user.uid}`);
    }
  }, [user, location]);
  const copyFunc = (e) => {
    setTimeout(() => {
      setCopied(true);
    }, 20);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };
  const closeModal = (e) => {
    if (e.target.classList.contains("myModal")) {
      setModal(false);
    }
  };
  return (
    <div className="myModal" onClick={closeModal}>
      <div className="modalContent">
        <span onClick={() => setModal(false)}>X</span>
        <h2 className="text-right pb-2 border-bottom ">شارك حسابك</h2>
        <div className="inputContainer">
          <input
            type="text"
            value={link}
            onChange={() => {
              setLink("");
              setCopied(true);
            }}
            disabled
          />
          <CopyToClipboard text={link}>
            <i className="fas fa-copy" onClick={copyFunc}></i>
          </CopyToClipboard>
        </div>
        <h5 className="my-2 text-center text-danger">
          {copied ? "تم النسخ إلى الحافظة" : ""}
        </h5>
      </div>
    </div>
  );
};

export default Modal;
