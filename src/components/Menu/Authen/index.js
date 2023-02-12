/* eslint-disable no-undef */
import React, { useState, useEffect } from "react";
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
const Authen = ({
  clickAuthen,
  changeIsLoginSystem,
  openSetting,
  multiplePlayer,
  onpenPlayRound,
}) => {
  
  const [faceioInstance, setFaceioInstance] = useState(null)

  useEffect(() => {
    const faceIoScript = document.createElement('script')
    faceIoScript.src = '//cdn.faceio.net/fio.js'
    faceIoScript.async = true
    faceIoScript.onload = () => faceIoScriptLoaded()
    document.body.appendChild(faceIoScript)

    return () => {
      document.body.removeChild(faceIoScript)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const faceIoScriptLoaded = () => {
    console.log(faceIO)
    if (faceIO && !faceioInstance) {
      setFaceioInstance(new faceIO('fioa72e3'))
    }
  }
  // Xác thực một khuôn mặt đã có vào hệ thống
  const faceSignIn = async () => {
    try {
      const userData = await faceioInstance.authenticate({
        locale: "auto",
      })
      console.log(userData)
  
      console.log('Unique Facial ID: ', userData.facialId)
      console.log('PayLoad: ', userData.payload)
      await fetchLoginById(userData.payload.userId)
    } catch (errorCode) {
      console.log(errorCode)
      handleError(errorCode)
    }
  }
  const handleError = (errCode) => {
    // Log all possible error codes during user interaction..
    // Refer to: https://faceio.net/integration-guide#error-codes
    // for a detailed overview when these errors are triggered.
    // const fioErrCode={PERMISSION_REFUSED:1,NO_FACES_DETECTED:2,UNRECOGNIZED_FACE:3,MANY_FACES:4,PAD_ATTACK:5,FACE_MISMATCH:6,NETWORK_IO:7,WRONG_PIN_CODE:8,PROCESSING_ERR:9,UNAUTHORIZED:10,TERMS_NOT_ACCEPTED:11,UI_NOT_READY:12,SESSION_EXPIRED:13,TIMEOUT:14,TOO_MANY_REQUESTS:15,EMPTY_ORIGIN:16,FORBIDDDEN_ORIGIN:17,FORBIDDDEN_COUNTRY:18,UNIQUE_PIN_REQUIRED:19,SESSION_IN_PROGRESS:20},fioState={UI_READY:1,PERM_WAIT:2,PERM_REFUSED:3,PERM_GRANTED:4,REPLY_WAIT:5,PERM_PIN_WAIT:6,AUTH_FAILURE:7,AUTH_SUCCESS:8}
    switch (errCode) {
      case fioErrCode.PERMISSION_REFUSED:
        console.log("Access to the Camera stream was denied by the end user")
        break
      case fioErrCode.NO_FACES_DETECTED:
        console.log("No faces were detected during the enroll or authentication process")
        break
      case fioErrCode.UNRECOGNIZED_FACE:
        console.log("Unrecognized face on this application's Facial Index")
        break
      case fioErrCode.MANY_FACES:
        console.log("Two or more faces were detected during the scan process")
        break
      case fioErrCode.PAD_ATTACK:
        console.log("Presentation (Spoof) Attack (PAD) detected during the scan process")
        break
      case fioErrCode.FACE_MISMATCH:
        console.log("Calculated Facial Vectors of the user being enrolled do not matches")
        break
      case fioErrCode.WRONG_PIN_CODE:
        console.log("Wrong PIN code supplied by the user being authenticated")
        break
      case fioErrCode.PROCESSING_ERR:
        console.log("Server side error")
        break
      case fioErrCode.UNAUTHORIZED:
        console.log("Your application is not allowed to perform the requested operation (eg. Invalid ID, Blocked, Paused, etc.). Refer to the FACEIO Console for additional information")
        break
      case fioErrCode.TERMS_NOT_ACCEPTED:
        console.log("Terms & Conditions set out by FACEIO/host application rejected by the end user")
        break
      case fioErrCode.UI_NOT_READY:
        console.log("The FACEIO Widget code could not be (or is being) injected onto the client DOM")
        break
      case fioErrCode.SESSION_EXPIRED:
        console.log("Client session expired. The first promise was already fulfilled but the host application failed to act accordingly")
        break
      case fioErrCode.TIMEOUT:
        console.log("Ongoing operation timed out (eg, Camera access permission, ToS accept delay, Face not yet detected, Server Reply, etc.)")
        break
      case fioErrCode.TOO_MANY_REQUESTS:
        console.log("Widget instantiation requests exceeded for freemium applications. Does not apply for upgraded applications")
        break
      case fioErrCode.EMPTY_ORIGIN:
        console.log("Origin or Referer HTTP request header is empty or missing")
        break
      case fioErrCode.FORBIDDDEN_ORIGIN:
        console.log("Domain origin is forbidden from instantiating fio.js")
        break
      case fioErrCode.FORBIDDDEN_COUNTRY:
        console.log("Country ISO-3166-1 Code is forbidden from instantiating fio.js")
        break
      case fioErrCode.SESSION_IN_PROGRESS:
        console.log("Another authentication or enrollment session is in progress")
        break
      case fioErrCode.NETWORK_IO:
      default:
        console.log("Error while establishing network connection with the target FACEIO processing node")
        break
    }
  }
  const [isLogin, setIsLogin] = useState(true);
  const [data, setData] = useState({});
  const changeHandler = (e) => {
    setData({ ...data, [e.target.name]: [e.target.value] });
  };
  const clickButton = (e) => {
    e.preventDefault();
    setIsLogin(!isLogin);
  };
  const fetchLoginById = async(idFace)=>{
    console.log('id', idFace)
    try {
      console.log('try')
      const reponse = await axios.get(
        `http://localhost:8080/api/face/${idFace}`
      );

      console.log(reponse.data);
      if (reponse.data) {
        changeIsLoginSystem(reponse.data);
        openSetting();
        if (multiplePlayer === true) {
          onpenPlayRound();
        }
        clickAuthen();
      }
    } catch (err) {
      console.log(err);
    }
  }
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
            openSetting();
            if (multiplePlayer === true) {
              onpenPlayRound();
            }
            clickAuthen();
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
            score: 0,
            imgUrl: "",
            age: "",
            hobby: "",
            verify: false
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
        <div className="relative-item" onClick={faceSignIn}>
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
