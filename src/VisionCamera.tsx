import React from 'react';

const VisionCamera = (): React.ReactElement => {
  React.useEffect(()=>{
    console.log("mounted");
  },[])

  return (
    <div>Test</div>
  )
}

export default VisionCamera;