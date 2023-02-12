/* eslint-disable no-undef */
import { useState, useEffect } from "react";
import SingleUser from "../icons/SingleUser";
import CloseSetting from "../icons/CloseSetting";
import Upload from "../icons/Upload";
import axios from "axios";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../Base";
import "./index.scss";
function Setting({ userInfors, closeSetting }) {
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
  const faceRegistration = async () => {
    try {
      const userInfo = await faceioInstance.enroll({
        locale: "auto",
        payload: {
          userIdNode: userInfors.idNode,
          userId: userInfors.id,
          username: userInfors.userName,
          password: userInfors.password
        },
      })
      console.log(userInfo)
      console.log('Unique Facial ID: ', userInfo.facialId)
      console.log('Enrollment Date: ', userInfo.timestamp)
      console.log('Gender: ', userInfo.details.gender)
      console.log('Age Approximation: ', userInfo.details.age)
      try {
        const response = await axios.put(
          `http://localhost:8080/api/user/${userInfors.idNode}`,
          {
            verify: true
          }
        );
        console.log(`res: ${response}`);
      } catch (error) {
        console.log(error);
      }
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
  const VerifyFace = async()=>{
    if(userInfors.verify) {
      alert("You've verified")
    }else if(!userInfors.verify) {
      faceRegistration()      
    }
  }
  const [userName, setUserName] = useState(userInfors.userName);
  const [hobby, setHobby] = useState(null);
  const [age, setAge] = useState(null);
  const [imgUrl, setImgUrl] = useState(null);
  const submitUpdate = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8080/api/user/${userInfors.idNode}`,
        {
          imgUrl: imgUrl,
          userName: userName,
          age: age,
          hobby: hobby,
        }
      );
      console.log(`res: ${response}`);
    } catch (error) {
      console.log(error);
    }
  };
  const [imageUpload, setImageUpload] = useState(null);
  const uploadFile = () => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `images/${userInfors.id}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        console.log('url', url)
        setImgUrl(url);
      });
    });
  };
  return (
    <div className="setting">
      <div className="close-btn" onClick={closeSetting}><CloseSetting height={50} width={50}/></div>
      <div className="avt">
        <div className="upload-tag">
          <div className="image" style={{backgroundImage: `url(${imgUrl||userInfors.imgUrl})`, backgroundSize: 'cover'}}><div className="upload-btn" onClick={uploadFile}><Upload /></div></div>
          <input
            type="file"
            accept="image/png, image/jpeg"
            onChange={(e) => setImageUpload(e.target.files[0])}
          />
        </div>
      </div>
      <div className="user-info">
        <div className="info-item">
          <SingleUser />
          <input
            type="text"
            placeholder="userName"
            onChange={(e) => {
              setUserName(e.target.value)}}
          />
        </div>
        <div className="info-item">
          <SingleUser />
          <input
            type="text"
            placeholder="hobby"
            onChange={(e) => setHobby(e.target.value)}
          />
        </div>
        <div className="info-item">
          <SingleUser />
          <input
            type="text"
            placeholder="age"
            onChange={(e) => setAge(e.target.value)}
          />
        </div>
      </div>
      <div className="verify-face" onClick={VerifyFace}>Face Verification</div>
      <div
        className="update-btn"
        onClick={submitUpdate}
      >
        Update
      </div>
    </div>
  );
}

export default Setting;
