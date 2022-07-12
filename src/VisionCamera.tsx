import React from 'react';

export interface Resolution{
  width:number;
  height:number;
}

export interface CameraProps{
  isActive?:boolean;
  desiredCamera?:string;
  desiredResolution?:Resolution;
  facingMode?:string;
}

const VisionCamera = (props:CameraProps): React.ReactElement => {
  React.useEffect(()=>{
    console.log("mounted");
    console.log(props);
  },[])

  return (
    <div>Test</div>
  )
}

export default VisionCamera;