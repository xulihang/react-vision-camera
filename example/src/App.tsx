import {VisionCamera,Resolution} from 'react-vision-camera';

function App() {
  return (
    <div className="App">
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
