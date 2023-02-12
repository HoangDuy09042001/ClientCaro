import { useCallback, useRef, useState } from "react";
import axios from "axios";
import Webcam from "react-webcam"
function WebCamCapture() {
    const webCamRef = useRef(null)
    const videoConstraints = {
        width: 200,
        height: 200,
        facingMode: 'user'
    }
    const [name, setName] = useState('')
    const capture = useCallback(()=>{
        const imageSrc = webCamRef.current.getScreenshot()
        console.log(`imageSrc = ${imageSrc}`)
        axios.post('http://127.0.0.1:5000/api',{data: imageSrc})
         .then(res => {
            console.log(`reponse= ${res}`)
            setName(res.data)
         })
         .catch(error=> {
            console.log(`error = ${error}`)
         })
    },[webCamRef])
    return (
        <div>
            <Webcam
             audio= {false}
             height={300}
             ref={webCamRef}
             screenshotFormat = 'image/jpeg'
             width={350}
             videoConstraints = {videoConstraints}
            />
            <button onClick={capture}>Click me!</button>
            <h2>{name}</h2>
        </div>
    )
}

export default WebCamCapture;
