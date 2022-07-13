import React, { ChangeEvent } from 'react';
import {VisionCamera} from 'react-vision-camera';
import "./App.css";

function App() {
  const [isActive,setIsActive] = React.useState(true);
  const [cameras,setCameras] = React.useState([] as MediaDeviceInfo[]);
  const [selectedCameraLabel,setSelectedCameraLabel] = React.useState("");
  const [desiredCamera, setDesiredCamera] = React.useState("founder");
  const resSel = React.useRef(null);
  const camSel = React.useRef(null);
  const onOpened = (cam:HTMLVideoElement,camLabel:string) => {
    console.log("opened");
    console.log(camLabel);
    setSelectedCameraLabel(camLabel);
  }

  const onClosed = () => {
    console.log("closed");
  }

  const onDeviceListLoaded = (devices:MediaDeviceInfo[]) => {
    console.log(devices);
    setCameras(devices);
  }

  const onCameraSelected = (e:any) => {
    setDesiredCamera(e.target.value);
    setSelectedCameraLabel(e.target.value);
  }

  return (
    <div className="container">
      <div className="barcode-scanner">
        <div className="vision-camera">
          <VisionCamera 
            isActive={isActive}
            desiredCamera={desiredCamera}
            facingMode="environment"
            desiredResolution={{width:1280,height:720}}
            onOpened={onOpened}
            onClosed={onClosed}
            onDeviceListLoaded={onDeviceListLoaded}
          >
          </VisionCamera>
        </div>
        <div>
          <div>
            <select ref={resSel}>
            </select>
          </div>
          <div>
            <select ref={camSel} value={selectedCameraLabel} onChange={(e) => onCameraSelected(e)}>
              {cameras.map((camera,idx) => (
                <option key={idx} value={camera.label}>{camera.label}</option>
              ))}
            </select>
          </div>
          <button onClick={() => setIsActive(!isActive)}>{isActive ? "Stop" : "Start"}</button>
        </div>
      </div>
    </div>
  );
}

export default App;
