import React, { useEffect, useRef, useState } from 'react'
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch'

function Viewer() {

    const[count,setCount]=useState(9);
    const[point,setPoint]=useState([200,200])
    const[zoom,setZoom]=useState(1)
    // useEffect(()=>{
    //     console.log(count)
    // },[])
    const[x,setX]=useState(0)
    const[y,setY]=useState(0)
    const[show,setShow]=useState([
        [[0,0],[1,0],[2,0]],
        [[0,1],[1,1],[2,1]],
        [[0,2],[1,2],[2,2]] 
    
    ])
    var matrix=[[[]]]
    // console.log("bvmh",count)
    const cvs = useRef(null);

    // var cvs=document.getElementById("canvas");
    // var ctx=cvs.getContext('2d')
    let value
    async function swipe(e){
        if(e.state.positionX>0&&e.state.scale>1&&matrix[0][0][0]>-1){
            // console.log(e)
            console.log(matrix )
            var a=matrix
            a.unshift([[matrix[0][0][0]-1,matrix[0][0][1]],[matrix[0][1][0]-1,matrix[0][1][1]],[matrix[0][1][0]-1,matrix[0][1][1]]])
            await setShow(a)
        }
    }
    function mousePos(evt){
        console.log(evt)
        var rect=cvs.current.getBoundingClientRect()
        setX(parseInt(evt.clientX-rect.left))
        setY(parseInt(evt.clientY-rect.top))
        let cursorX=parseInt(evt.clientX)
        let cursorY=parseInt(evt.clientY)
        
        
                // var p=ctx.getImageData(x,y,1,1).getImageData(x,y,1,1).getImageData
        //  value=document.getElementsByClassName("react-transform-component transform-component-module_content__uCDPE ")[0].style.transform
        
        console.log("coordinates",x,y)
        console.log("cursor",parseInt(evt.clientX),parseInt(evt.clientY))
    }
    // let set=0
    const handleChange=(e)=>{
        
        var xtemp=x
        var ytemp=y
        console.log(x,y)
        // console.log(xtemp,ytemp)
        // console.log(count)
        var x_new=xtemp*count/(count-1)
        var y_new=ytemp*count/(count-1)
        var image=[(x_new%512),y_new%512]
        var coord=[parseInt(x_new/512),parseInt(y_new/512)]
        // var x_new=xtemp*(zoom+1)/(9-parseInt(arr[0]))
        // var y_new=ytemp*(zoom+1)/(9-parseInt(arr[0]))
        // var image=[(x/arr[0])%512,(y/arr[0])%512]
        // var coord=[parseInt(x_new/512),parseInt(y_new/512)]
        console.log("imageno=> ",coord,"place=>",image)
        matrix=[
                    [[coord[0]-1,coord[1]-1],[coord[0],coord[1]-1],[coord[0]+1,coord[1]-1]],
                    [[coord[0]-1,coord[1]],[coord[0],coord[1]],[coord[0]+1,coord[1]]],
                    [[coord[0]-1,coord[1]+1],[coord[0],coord[1]+1],[coord[0]+1,coord[1]+1]]
                                                                                            ]
        // if(!isNaN(image[0])){
        //     console.log(matrix)
            setShow(matrix)
        //     // setPoint(-x_new,-y_new)
        // }
                                                                                    
    }
        // console.log(matrix)
        function myFunction(e){
            if(e.deltaY<0){
                if(zoom>=1.){
                    handleChange("e")

                    setCount(8)
                    // setZoom(1)
                }
                setZoom(zoom+0.2)
            }
            else{
                setZoom(zoom-0.2)
            }
        }
        console.log(zoom)
        useEffect(()=>{
        cvs.current.addEventListener("wheel",mousePos)

        document.getElementById("box").addEventListener("wheel", myFunction)

        },[zoom])
        useEffect(()=>{
            setZoom(1)
        },[count])
  return (
    <div id="box" ref={cvs} style={{"border":"solid","borderWidth":"2px","borderColor":"black",width:"720px",height:"720px",overflow:"hidden"}}>
       
            
            
                    {show.map((item)=>{
                        return <div  style={{position:"relative",width:"2000px",height:`${512*zoom}px`}}>
                            <img src={`/CBC694_21/z${count}/x${item[0][1]}y${item[0][0]}.jpg`} style={{position:"absolute",left:`${(0+512*(zoom-1)/2)-(x*(zoom-1))}px`,top:`${512*(zoom-1)/2-(y*(zoom-1))}px` ,transform: `scale(${zoom})`}}  onerror="this.src='https://www.unesale.com/ProductImages/Large/notfound.png'" alt=""/>
                            <img src={`/CBC694_21/z${count}/x${item[1][1]}y${item[1][0]}.jpg`} style={{position:"absolute",left:`${512*zoom+512*(zoom-1)/2-(x*(zoom-1))}px`,top:`${512*(zoom-1)/2-(y*(zoom-1))}px`,transform: `scale(${zoom})`}} onerror="this.src='https://www.unesale.com/ProductImages/Large/notfound.png'" alt=""/>
                            <img src={`/CBC694_21/z${count}/x${item[2][1]}y${item[2][0]}.jpg`} style={{position:"absolute",left:`${1024*zoom+512*(zoom-1)/2-(x*(zoom-1))}px`,top:`${512*(zoom-1)/2-(y*(zoom-1))}px`,transform:`scale(${zoom})`}} onerror="this.src='https://www.unesale.com/ProductImages/Large/notfound.png'" alt=""/>

                        </div>
                    })}
                {/* <div style={{"display":'flex',"flexDirection":"row",}}>
                <img src={`/CBC694_21/z${count}/x0y0.jpg`} alt=""/>
                <img src="/CBC694_21/z9/x0y1.jpg" alt=""/>
                <img src="/CBC694_21/z9/x0y2.jpg" alt=""/>
                </div>
                <div style={{"display":'flex',"flexDirection":"row",}}>
                <img src="/CBC694_21/z9/x1y0.jpg" alt=""/>
                <img src="/CBC694_21/z9/x1y1.jpg" alt=""/>
                <img src="/CBC694_21/z9/x1y2.jpg" alt=""/>
                </div>
                <div style={{"display":'flex',"flexDirection":"row",}}>
                <img src="/CBC694_21/z9/x2y0.jpg" alt=""/>
                <img src="/CBC694_21/z9/x2y1.jpg" alt=""/>
                <img src="/CBC694_21/z9/x2y2.jpg" alt=""/>
                </div> */}
    </div>
  )
}

export default Viewer