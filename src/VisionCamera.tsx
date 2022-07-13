import React, { ReactNode } from 'react';
import "./VisionCamera.css";

export interface Resolution{
  width:number;
  height:number;
}

export interface CameraProps{
  isActive?:boolean;
  desiredCamera?:string;
  desiredResolution?:Resolution;
  facingMode?:string;
  children?: ReactNode;
  onOpened?: (cam:HTMLVideoElement) => void;
  onClosed?: () => void;
  onDeviceListLoaded?: (list:MediaDeviceInfo[]) => void;
}

interface PlayOptions {
  deviceId?:string;
  desiredResolution?:Resolution;
  facingMode?:string;
}

const VisionCamera = (props:CameraProps): React.ReactElement => {
  const devices = React.useRef(null);
  const localStream = React.useRef(null);
  const camera = React.useRef(null);

  React.useEffect(()=>{
    console.log("mounted");
    console.log(props);
    if (props.isActive === true) {
      playWithDesired();
    }
  },[])

  React.useEffect(() => {
    if (props.isActive === true) {
      playWithDesired();
    }else{
      stop();
    }
  }, [props.isActive]);

  React.useEffect(() => {
    if (props.isActive === true) {
      playWithDesired();
    }
  }, [props.desiredCamera,props.desiredResolution,props.facingMode]);

  const playWithDesired = async () => {
    if (!devices.current) {
      await loadDevices(); // load the camera devices list if it hasn't been loaded
    }
    let desiredDevice = getDesiredDevice(devices.current)
       
    if (desiredDevice) {
      let options:PlayOptions = {};
      options.deviceId=desiredDevice;
      if (props.desiredResolution) {
        options.desiredResolution=props.desiredResolution;
      }
      play(options);
    }else{
      throw new Error("No camera detected");
    }
  }
    
  const getDesiredDevice = (devices:MediaDeviceInfo[]) => {
    var count = 0;
    var desiredIndex = 0;
    for (var i=0;i<devices.length;i++){
      var device = devices[i];
      var label = device.label || `Camera ${count++}`;
      if (props.desiredCamera) {
        if (label.toLowerCase().indexOf(props.desiredCamera.toLowerCase()) != -1) {
          desiredIndex = i;
          break;
        } 
      }
    }
  
    if (devices.length>0) {
      return devices[desiredIndex].deviceId; // return the device id
    }else{
      return null;
    }
  }
    
  const play = (options:PlayOptions) => {
    stop(); // close before play
    var constraints:any = {};
  
    if (options.deviceId){
      constraints = {
        video: {deviceId: options.deviceId},
        audio: false
      }
    }else{
      constraints = {
        video: {width:1280, height:720},
        audio: false
      }
    }
       
    if (options.desiredResolution) {
      constraints["video"]["width"] = options.desiredResolution.width;
      constraints["video"]["height"] = options.desiredResolution.height;
    }
    navigator.mediaDevices.getUserMedia(constraints).then(function(stream) {
      localStream.current = stream;
      // Attach local stream to video element
      camera.current.srcObject = stream;
    }).catch(function(err) {
      console.error('getUserMediaError', err, err.stack);
    });
  }
     
  const stop = () => {
    try{
      if (localStream.current){
        const stream = localStream.current as MediaStream;
        const tracks = stream.getTracks();
        for (let index = 0; index < tracks.length; index++) {
          const track = tracks[index];
          track.stop() 
        }
        if (props.onClosed) {
          props.onClosed();
        }
      }
    } catch (e){
      console.log(e);
    }
  };

  const loadDevices = async () => {
    const constraints = {video: true, audio: false};
    const stream = await navigator.mediaDevices.getUserMedia(constraints) // ask for permission
    const mediaDevices = await navigator.mediaDevices.enumerateDevices();
    let cameraDevices = [];
    for (let i=0;i<mediaDevices.length;i++){
      let device = mediaDevices[i];
      if (device.kind == 'videoinput'){ // filter out audio devices
        cameraDevices.push(device);
      }
    }
    devices.current = cameraDevices;
    const tracks = stream.getTracks();
    for (let i=0;i<tracks.length;i++) {
      const track = tracks[i];
      track.stop();  // stop the opened camera
    }
    if (props.onDeviceListLoaded) {
      props.onDeviceListLoaded(cameraDevices);
    }
  }

  const onCameraOpened = () => {
    console.log("onCameraOpened");
    if (props.onOpened) {
      props.onOpened(camera.current);
    }
  }

  return (
    <div className="camera-container full">
      <video className="camera full" ref={camera} muted autoPlay={true} playsInline={true} onLoadedData={onCameraOpened}></video>
      {props.children}
    </div>
  )
}

export default VisionCamera;