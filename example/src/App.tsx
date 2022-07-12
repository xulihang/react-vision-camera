import {VisionCamera} from 'react-vision-camera';
import "./App.css";

function App() {

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
    <div className="camera-container">
      <VisionCamera 
        isActive={true}
        desiredCamera="founder"
        facingMode="environment"
        desiredResolution={{width:1280,height:720}}
        onOpened={onOpened}
        onClosed={onClosed}
        onDeviceListLoaded={onDeviceListLoaded}
      ></VisionCamera>
    </div>
  );
}

export default App;
