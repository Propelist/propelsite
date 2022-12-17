
import React, { useEffect,useRef } from 'react';

export default function Canvas(props) {

    const {draw,...rest} = props
  
    return (
      <canvas {...rest} ref={useCanvas(draw)}>
  
      </canvas>)
  
  }

  function useCanvas (draw){
    
    const canvasRef = useRef(null)
    function resizeCanvas(ctx,canvas){
      const {width, height}= canvas.getBoundingClientRect()
      if(canvas.width !== width|| canvas.height !== height){
        ctx.restore()
        ctx.clearRect(0,0,canvas.width,canvas.height)
        canvas.width=width
        canvas.height=height
        
      }


    }

    useEffect (()=>{
      const canvas = canvasRef.current
      const ctx = canvas.getContext("2d")
      
    
      const render = () =>
        {
        resizeCanvas(ctx,canvas)
        draw(ctx,canvas)
        window.requestAnimationFrame(render)
        }
      render()
  
    })
    
    return canvasRef
  
  }