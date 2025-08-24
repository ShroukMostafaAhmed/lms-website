import React from 'react';

export default function BackgroundShapes() {
  return (
    <>
<div className="absolute top-[32%] left-0 w-[400px] h-[1220px] bg-gradient-to-r from-blue-200 to-white z-0 blur-md opacity-40 rounded-tr-[150px] rounded-br-[10px]" />

<img
  src="/shapes/shape_111.png"
  alt="Shape 111"
  className="absolute top-[36%] left-0 w-[300px] z-0"
/>

  <img
    src="public/shapes/shape_115.png"
    className="absolute top-[80%] left-[2%] z-0"
    alt="Shape 115"
  />
  <img
    src="public/shapes/shape_123.png"
    className="absolute bottom-[21%] left-[4%] z-0"
    alt="Shape 123"
  />
    </>
  );
}
