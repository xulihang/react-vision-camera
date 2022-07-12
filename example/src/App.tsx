import {VisionCamera} from 'react-vision-camera';
import "./App.css";

function App() {
  return (
    <div className="camera-container">
      <VisionCamera 
        isActive={true}
        desiredCamera="founder"
        facingMode="environment"
        desiredResolution={{width:1280,height:720}}
      ></VisionCamera>
    </div>
  );
}

export default App;
