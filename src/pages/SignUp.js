import React, { useState } from "react";
import HeaderTitle from "../compos/HeaderTitle";
import { auth, firestore } from "../firebase/config";
import { useHistory } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../context";
const SignUp = (props) => {
  const { handleErr, setErr, err } = useContext(AppContext);

  let history = useHistory();
  const [inputVal, setInputVal] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onInputChange = (e) => {
    setInputVal({
      ...inputVal,
      [e.target.id]: e.target.value,
    });
  };
  const onFormSubmit = (e) => {
    e.preventDefault();
    if (inputVal.password && inputVal.name && inputVal.email) {
      auth
        .createUserWithEmailAndPassword(inputVal.email, inputVal.password)
        .then((cred) => {
          history.push("/messages");
          firestore.collection("users").doc(cred.user.uid).set({
            user: inputVal.name,
          });
        })
        .catch((err) => {
          setErr(err.message);
        });
    } else {
      handleErr("يجب تعبئة الحقول الفارغة");
    }
  };
  return (
    <section className="signup">
      <HeaderTitle title="تسجيل" className="edit" />
      <form className="form" dir="rtl" onSubmit={onFormSubmit}>
        <div className="input-container">
          <label htmlFor="name">الاسم</label>
          <input
            type="text"
            name="name"
            id="name"
            value={inputVal.name}
            onChange={onInputChange}
          />
        </div>
        <div className="input-container">
          <label htmlFor="email">الايميل</label>
          <input
            type="email"
            name="email"
            id="email"
            value={inputVal.email}
            onChange={onInputChange}
          />
        </div>
        <div className="input-container">
          <label htmlFor="password" className="passwordLabel">
            كلمة المرور
          </label>
          <input
            type="password"
            name="password"
            id="password"
            value={inputVal.password}
            onChange={onInputChange}
          />
        </div>
        <button type="submit">تسجيل</button>
        <h5 className="text-center my-2 text-danger">{err}</h5>
      </form>
    </section>
  );
};

export default SignUp;
