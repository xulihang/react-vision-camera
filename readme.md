
## React Vision Camera

![version](https://img.shields.io/npm/v/react-vision-camera.svg)
![downloads](https://img.shields.io/npm/dm/react-vision-camera.svg)
![jsdelivr](https://img.shields.io/jsdelivr/npm/hm/react-vision-camera.svg)

Camera component for React using `getUserMedia`. We can use this component for computer vision tasks like barcode scanning, text recognition, etc.

[Online demo](https://shiny-naiad-b61af3.netlify.app/)

### Installation

```
npm install react-vision-camera
```

### Usage

```jsx

import {VisionCamera} from 'react-vision-camera';

function App() {
  const [isActive,setIsActive] = React.useState(true); //whether the camera is active
  const [isPause,setIsPause] = React.useState(false); //whether the video is paused
  const onOpened = (cam:HTMLVideoElement,camLabel:string) => { // You can access the video element in the onOpened event
    console.log("opened"); 
  }

  const onClosed = () => {
    console.log("closed");
  }
  
  const onDeviceListLoaded = (devices:MediaDeviceInfo[]) => {
    console.log(devices);
  }
  
  return (
    <div>
      <VisionCamera 
        isActive={isActive}
        isPause={isPause}
        desiredCamera="back"
        desiredResolution={{width:1280,height:720}}
        onOpened={onOpened}
        onClosed={onClosed}
        onDeviceListLoaded={onDeviceListLoaded}
      >
      </VisionCamera>
    </div>
  )
}

```

### FAQ

How to specify which camera to use?

1. Use the `desiredCamera` prop. If one of the camera's name contains it, then it will be used. You can get the devices list in the `onDeviceListLoaded` event.
2. Use the `facingMode` prop. Set it to `environment` to use the back camera. Set it to `user` to use the front camera. Please note that this is not supported on Desktop.

You can use the two props together. `facingMode` has a higher priority.

### License

MIT
