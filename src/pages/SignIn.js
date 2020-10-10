import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import HeaderTitle from "../compos/HeaderTitle";
import { AppContext } from "../context";
import { auth } from "../firebase/config";

const SignIn = () => {
  const { handleErr, setErr, err } = useContext(AppContext);
  const history = useHistory();
  const [inputVal, setInputVal] = useState({
    email: "",
    password: "",
  });
  const onInputChange = (e) => {
    setInputVal({
      ...inputVal,
      [e.target.name]: e.target.value,
    });
  };
  const onFormSubmit = (e) => {
    e.preventDefault();
    if (inputVal.email && inputVal.password) {
      auth
        .signInWithEmailAndPassword(inputVal.email, inputVal.password)
        .then((cred) => {
          history.push("/messages");
        })
        .catch((err) => {
          setErr(err.message);
          setTimeout(() => {
            setErr("");
          }, 2000);
        });
    } else {
      handleErr("يجب تعبئة الحقول الفارغة");
    }
  };
  return (
    <section className="signin">
      <HeaderTitle title="دخول" className="user" />
      <div className="form-container">
        <form className="signInForm" onSubmit={onFormSubmit}>
          <input type="text" name="email" onChange={onInputChange} />
          <input type="password" name="password" onChange={onInputChange} />
          <button type="submit">دخول</button>
          <Link to="/signup">تسجيل</Link>
        </form>
        <h5 className="text-center my-2 text-danger">{err}</h5>
      </div>
    </section>
  );
};

export default SignIn;
