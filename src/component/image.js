import React, { useState, useRef, useEffect } from 'react';

function TifImage() {
  const [zoom, setZoom] = useState(1);
  const [count, setCount] = useState(9);
  const [prevZoom , setPrevZoom] = useState(1)

  const [imageMatrix, setImageMatrix] = useState([
    [[0, 0], [1, 0], [2, 0]],
    [[0, 1], [1, 1], [2, 1]],
    [[0, 2], [1, 2], [2, 2]]
  ]);


  const handleChange = (tempZoom, prevZoom)=>{
    setPrevZoom(tempZoom)
    if(tempZoom-prevZoom >=0.1){
        setCount((prevCount)=>prevCount-1)
    } else {
        setCount((prevCount)=>prevCount+1)
    }
    console.log("count",count-1)
  }
  const handleScroll = (e) => {
    // Get the cursor position relative to the container
    const containerRect = containerRef.current.getBoundingClientRect();
    const cursorX = e.clientX - containerRect.left;
    const cursorY = e.clientY - containerRect.top;
  
    // Calculate the zoom origin based on the cursor position
    const originX = (cursorX / containerRect.width) * 100;
    const originY = (cursorY / containerRect.height) * 100;
  
    // Update zoom based on mouse wheel delta
    const tempZoom = Math.max(0.1, zoom - e.deltaY * 0.01-1);
    console.log("tempZoom", tempZoom)
    setZoom(tempZoom);
  
    if (tempZoom - prevZoom >= 0.1 || tempZoom - prevZoom <= -0.1) {
      console.log(tempZoom - prevZoom);
      console.log("Yes", tempZoom);
      handleChange(tempZoom, prevZoom);
    }
  
    // Apply the zoom and origin styles to the individual images, not the container
    const images = containerRef.current.querySelectorAll('img');
    images.forEach((img) => {
      img.style.transform = `scale(${tempZoom})`;
      img.style.transformOrigin = `${originX}% ${originY}%`;
    });
  
    // setPrevZoom(tempZoom);
  };
  
  const containerRef = useRef();
  useEffect(() => {
    containerRef.current = document.getElementById("box");
  }, []);
  const calculateTileStyle = (row, col) => {
    const left = col * 100;
    const top = row * 100;
  
    return {
      width: '100%',
      height: '100%',
      transform: `scale(${zoom})`,
      transformOrigin: '0 0',
      position: 'relative',
      left: `${left}%`,
      top: `${top}%`,
    };
  };
  
  

  return (
    <>
    <h1>Stitched image</h1>
    <div
      id="box"
      style={{
        border: 'solid',
        position:'relative',
        borderWidth: '2px',
        borderColor: 'black',
        width: '720px',
        height: '720px',
        left:'150px',
        right:'0px',
        overflow: 'hidden',
      }}
      
    >
    <div 
        onWheel={handleScroll}
        style={{
            // transform: `scale(${zoom})`,
            // transformOrigin: '0 0',
            width: '100%',
            height: '100%',
            overflow: 'hidden',
        }} 
    >
    {imageMatrix.map((item, index) =>{
        return <>
        <img
        key={index}
        src={`/CBC694_21/z${9}/x${item[0][0]}y${item[0][1]}.jpg`}
        alt=""
        style={calculateTileStyle(0, index)}
        onError={(e) => {
            e.target.src = 'https://www.unesale.com/ProductImages/Large/notfound.png';
        }}
        />
        <img
        key={index+1}
        src={`/CBC694_21/z${9}/x${item[1][0]}y${item[1][1]}.jpg`}
        alt=""
        style={calculateTileStyle(1, index)}
        onError={(e) => {
        e.target.src = 'https://www.unesale.com/ProductImages/Large/notfound.png';
        }}
        />
        <img
        key={index+2}
        src={`/CBC694_21/z${9}/x${item[2][0]}y${item[2][1]}.jpg`}
        alt=""
        style={calculateTileStyle(2, index)}
        onError={(e) => {
            e.target.src = 'https://www.unesale.com/ProductImages/Large/notfound.png';
        }}
        />
    </>
                
            

    //     <img
    //     key={index}
    //     src={`/CBC694_21/z${9}/x${item[2][1]}y${item[2][0]}.jpg`}
    //     alt=""
    //     style={calculateTileStyle(0, index)}
    //     onError={(e) => {
    //       e.target.src = 'https://www.unesale.com/ProductImages/Large/notfound.png';
    //     }}
    //   />
  
        
    })}
    </div>
    </div>
    <p>neuranics lab</p>

    </>
  );
}

export default TifImage;
