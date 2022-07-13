import React from 'react';
import {VisionCamera} from 'react-vision-camera';
import "./App.css";

function App() {
  const [isActive,setIsActive] = React.useState(true);
  const onOpened = (cam:HTMLVideoElement) => {
    console.log("opened");
    console.log(cam);
  }

  const onClosed = () => {
    console.log("closed");
  }

  const onDeviceListLoaded = (devices:MediaDeviceInfo[]) => {
    console.log(devices);
  }

  return (
    <div className="container">
      <div className="barcode-scanner">
        <div className="vision-camera">
          <VisionCamera 
            isActive={isActive}
            desiredCamera="founder"
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
            <select>
            </select>
          </div>
          <div>
            <select>
            </select>
          </div>
          <button onClick={() => setIsActive(!isActive)}>{isActive ? "Stop" : "Start"}</button>
        </div>
      </div>
    </div>
  );
}

export default App;
