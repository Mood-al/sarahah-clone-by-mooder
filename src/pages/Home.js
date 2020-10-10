import React, { useEffect } from "react";

import { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { AppContext } from "../context";

const Home = () => {
  const { isUser, user } = useContext(AppContext);
  const history = useHistory();
  useEffect(() => {
    if (user) {
      history.push("/messages");
    }
  }, [user, history]);

  return (
    <section
      className={isUser ? "home hide" : "home show"}
      style={{ display: "none" }}
    >
      <h4 className="text-center my-5 font-weight-bold">
        صراحة يتيح لك الحصول على نقد بناء من أصدقائك وزملائك في العمل
      </h4>
      <div className="btns">
        <Link to="signin">
          <button>
            دخول <i className="fas fa-user"></i>{" "}
          </button>
        </Link>
        <Link to="signup">
          <button>
            تسجيل <i className="far fa-edit"></i>
          </button>
        </Link>
      </div>
    </section>
  );
};

export default Home;
