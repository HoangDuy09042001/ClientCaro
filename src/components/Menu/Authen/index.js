import React, { useState } from "react";
import axios from "axios";
import Key from "../../icons/Key";
import SingleUser from "../../icons/SingleUser";
import Confirm from "../../icons/Confirm";
import Twitter from "../../icons/Twitter";
import Gmail from "../../icons/Gmail";
import Facebook from "../../icons/Facebook";
import Close from "../../icons/Close";
import "./index.scss";
const { v4: uuidv4 } = require("uuid");
const Authen = ({ clickAuthen, changeIsLoginSystem }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [data, setData] = useState({});
  const changeHandler = (e) => {
    setData({ ...data, [e.target.name]: [e.target.value] });
  };
  const clickButton = (e) => {
    e.preventDefault();
    setIsLogin(!isLogin);
  };
  const fetchQuotes = async () => {
    if (isLogin) {
      if (
        data.username[0] !== "" &&
        data.username[0] !== undefined &&
        data.password[0] !== "" &&
        data.password[0] !== undefined
      ) {
        try {
          const reponse = await axios.get(
            `http://localhost:8080/api/user/${data.username[0]}/${data.password[0]}`
          );

          console.log(reponse.data);
          if (reponse.data) {
            changeIsLoginSystem(reponse.data);
          }
        } catch (err) {
          console.log(err);
        }
        setData({});
      } else {
        console.error("You've put unsufficient information in");
      }
    } else {
      try {
        if (data.password[0] === data.confirmpassword[0]) {
          const reponse = await axios.post(`http://localhost:8080/api/user`, {
            id: uuidv4(),
            userName: data.username[0],
            password: data.password[0],
            score: 0
          });
          console.log(reponse.data);
        } else {
          console.log("These are different");
        }
      } catch (err) {
        console.log(err);
      }
      setData({});
    }
  };
  return (
    <div className="authen">
      <div className="title-authen">{isLogin ? "Sign in" : "Sign up"}</div>
      <div className="info-authen">
        <div className="info-item">
          <SingleUser height={30} width={30} />
          <input
            type="text"
            placeholder="username"
            name="username"
            onChange={changeHandler}
            onKeyPress={(event) => {
              event.key === "Enter" && fetchQuotes();
            }}
          />
        </div>
        <div className="info-item">
          <Key height={30} width={30} />
          <input
            type="password"
            placeholder="password"
            name="password"
            onChange={changeHandler}
            onKeyPress={(event) => {
              event.key === "Enter" && fetchQuotes();
            }}
          />
        </div>
        <div className={!isLogin ? "info-item" : "info-item none"}>
          <Confirm height={30} width={30} />
          <input
            type="password"
            placeholder="confirm password"
            name="confirmpassword"
            onChange={changeHandler}
            onKeyPress={(event) => {
              event.key === "Enter" && fetchQuotes();
            }}
          />
        </div>
      </div>
      <div className="btn-authen" onClick={fetchQuotes}>
        {isLogin ? "Sign in" : "Sign up"}
      </div>
      <div className="passage" onClick={clickButton}>
        {isLogin
          ? "Don't have an account? Sign up. Forgot your password?"
          : "Sign in"}
      </div>
      <div className="relative-auth">
        <div className="relative-item">
          <Twitter />
        </div>
        <div className="relative-item">
          <Gmail />
        </div>
        <div className="relative-item">
          <Facebook />
        </div>
      </div>
      <div className="close-btn" onClick={clickAuthen}>
        <Close />
      </div>
    </div>
  );
};

export default Authen;
