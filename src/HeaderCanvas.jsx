import React, {useEffect,useRef, useState} from 'react';

import useWindowSize from './hooks/useWindowSize.jsx';

import Canvas from './Canvas.jsx';
import HeaderCard from './HeaderCard.jsx';
import LinkTree from './LinkTree.jsx';
import light0 from './resources/icons/lightOn.png';
import light1 from './resources/icons/lightOff.png';
import CanvasBackground from './CanvasBackground.jsx';

export default function HeaderCanvas(){
  
  let circleRef=[]
  let isMoving=false
  let mousePos=null
  let lightRef= []
  let timer=[]
  const lightOn= new Image()
  const lightOff= new Image()
  lightOn.src=light0
  lightOff.src=light1
  let init= true
  const speed = .02
  let alphaRef= []
  let rotate=0
  let hoverTimeout=[]
  const [renderNum,setReset]=useState(1)
  let windowSize=useWindowSize()
  const bb = useRef([(windowSize[0]/2)-(windowSize[0]/100*20+70),(windowSize[1]/2)-(windowSize[1]/100*10+170),
  (windowSize[0]/100*40+50),windowSize[1]/100*20+360]) 


    useEffect(()=>{
      
      if (windowSize[0]<768){
        setReset(10)
        bb.current=[-20,-20,0,0]
        
      }
      else if (windowSize[0]<900){
        setReset(20)
        bb.current=[(windowSize[0]/2)-(windowSize[0]/100*20+30),(windowSize[1]/2)-(windowSize[1]/100*10+170),
        (windowSize[0]/100*40+60),windowSize[1]/100*20+340]
      }
      else{
        setReset(30)
        bb.current=[(windowSize[0]/2)-(windowSize[0]/100*20+30),(windowSize[1]/2)-(windowSize[1]/100*10+170),
        (windowSize[0]/100*40+60),windowSize[1]/100*20+340]
       }
      



    },[windowSize])



  function initializeCircles(canvas){
    let numShapes=renderNum
    let r = 35
 
    let circles = []
    
    let initSpeed=.5
    for (let i=1;i<=numShapes;i++){
      
      let xPos=(Math.random(0,1)*canvas.width-2*r)
      let yPos=(Math.random(0,1)*canvas.height-2*r)
      let xV= (Math.sign(Math.random(0,1)-.5)*Math.random(0,1))*initSpeed
      let yV = (Math.sign(Math.random(0,1)-.5)*Math.sqrt(1-Math.pow(xV,2)))*initSpeed
    timer.push(null)
    alphaRef.push(1)
    lightRef.push(false)
    hoverTimeout.push(true)
    circles.push([xPos,yPos,xV,yV,r])
   

  circleRef= circles
    }
  }



  function boundingBox(type,xPos,yPos,r,dimensions,xV,yV) { 

    
    let [bottomX,bottomY,width,height] = dimensions
    let [topX,topY]= [bottomX+width,bottomY+height]
    let xEval=false
    let yEval=false

    if (type==='inner'){

       xEval= xPos+r> topX ||xPos-r < bottomX
       yEval= yPos+r>topY || yPos-r < bottomY
      if (xEval){
            xV=-xV
          }
      if (yEval){
            yV=-yV
          }

       if (xPos-r<bottomX){
        xPos=r+bottomX
       
      }
      if(xPos+r>topX){
        xPos=topX-r
        
      }
  
      if(yPos-r<bottomY){
        yPos=r+bottomY
      
      }
      if (yPos+r> topY){
        yPos=topY-r
       
      }

    }
    if (type==='outer'){

      if (xPos+r > bottomX && xPos-r < topX && yPos+r > bottomY &&  yPos-r < topY){
        let allsides=[Math.abs(xPos+r-bottomX),
            Math.abs(xPos-r-topX),
            Math.abs(yPos+r-bottomY),
            Math.abs(yPos-r-topY)
          ]
          let [sideL,sideR,sideB,sideT]=allsides
         
          let isSmallest= Math.min(...allsides)

        if (sideL===isSmallest){
          xPos= bottomX-r
          xV=-xV
       
        }
        else if(sideR===isSmallest){
          xPos=topX+r
          xV=-xV
          
        }
    
        else if(sideB===isSmallest){
          yPos=bottomY-r
          yV=-yV
        }
        else if (sideT===isSmallest){
          yPos=topY+r
          yV=-yV
          
        }
      }
    }
    //resets position in case velocity is too fast

    return [xPos,yPos,xV,yV]
  }



  function collisionDetection(canvas){
    
    let circles = circleRef;
    let next=1;
    for (let i=0;i<circles.length;i++){
      

      let [xPos1,yPos1,xV1,yV1,r]=circles[i];


      for (let j=next;j<circles.length;j++){

       
        let [xPos2,yPos2,xV2,yV2,r]=circles[j];
        let deltaXH= (xPos2+xV2)-(xPos1-xV1)
        let deltaYH= (yPos2+yV2)-(yPos1+yV1)
        let deltaX= xPos2-xPos1
        let deltaY= yPos2-yPos1
        let distanceH = Math.sqrt((Math.pow(deltaXH,2)+Math.pow(deltaYH,2)))
        let distance = Math.sqrt((Math.pow(deltaX,2)+Math.pow(deltaY,2)))
  
       
        

        if ((r+r-40) > distanceH){

          
          circles[i]=[xPos1-xV1,yPos1-yV1,xV1,yV1,r]
          circles[j]=[xPos2-xV2,yPos2-yV2,xV2,yV2,r]
            xV1=-deltaX/distance
            yV1=-deltaY/distance
            xV2= -xV1
            yV2= -xV2
            
            resetLight(i)
            resetLight(j)
            hoverTimeout[i]=true
            hoverTimeout[j]=true
            }
            
            circles[j]=[xPos2+xV2*speed,yPos2+yV2*speed,xV2,yV2,r]
        }
        
      if (isMoving){
      hoverLight(i)
      }
    
    
      [xPos1,yPos1,xV1,yV1] = boundingBox('inner',xPos1,yPos1,r,[-20,-20,canvas.width+40,canvas.height+40],xV1,yV1);
      [xPos1,yPos1,xV1,yV1] = boundingBox('outer',xPos1,yPos1,r,bb.current
      ,xV1,yV1);
      circles[i]=[xPos1+xV1*speed,yPos1+yV1*speed,xV1,yV1,r]
      next++
    }



  }

  function hoverLight(index){

    let [xPos1,yPos1,,,r]=circleRef[index]
    let [xMouse,yMouse] =mousePos
    
  
      let deltaX= xPos1-xMouse
      let deltaY= yPos1-yMouse
      let distance = Math.sqrt((Math.pow(deltaX,2)+Math.pow(deltaY,2)))

      if (distance<r && hoverTimeout[index]){
        resetLight(index)
        hoverTimeout[index]=false
        
        

      }


  }

  function resetLight(index){
    
    lightRef[index]=true
   
    timer[index]=setTimeout(()=>{   
        lightRef[index]=false
        alphaRef[index]=1
        hoverTimeout[index]=true
        clearTimeout(timer[index])
      },5000)
    

    }

  


  function onmousemove(e){
     
      let offsetX=e.target.getBoundingClientRect().x
      let offsetY=e.target.getBoundingClientRect().y
      let mousePosX=e.clientX-offsetX
      let mousePosY=e.clientY-offsetY
      isMoving=true;
      mousePos=[mousePosX,mousePosY];

    }
  function onmouseleave(e){
    isMoving=false
    }
 
  
  function draw(ctx,canvas){
    
    
    if(init){
     
      initializeCircles(canvas)
      init=false
      
    }


    ctx.clearRect(0,0,canvas.width,canvas.height)
    
    // ctx.fillStyle = '#EEE222'
    // ctx.rect((windowSize[0]/2)-(windowSize[0]/100*20+30),(windowSize[1]/2)-(windowSize[1]/100*10+170),
    // (windowSize[0]/100*40+60),windowSize[1]/100*20+340)
    // ctx.fill();
    
    collisionDetection(canvas)
  
    for (let i=0;i<renderNum;i++){
      let [xPos,yPos,,,r]=circleRef[i]
      
      
      
        
      
      ctx.save()
      ctx.beginPath()
      
      ctx.translate(xPos,yPos)
      ctx.rotate(rotate*Math.PI/360)
      ctx.drawImage(lightOff,-r,-r,2*r,2*r)
      
      ctx.closePath()
      ctx.restore()
        // ctx.fill();
      

      if (lightRef[i]){
       
        alphaRef[i]=alphaRef[i]-0.001
        if(alphaRef[i]<0){
          alphaRef[i]=0.001
        }
        
        
        ctx.save()
        ctx.beginPath()
        ctx.globalAlpha=alphaRef[i]
        ctx.translate(xPos,yPos)
        ctx.rotate(rotate*Math.PI/360)
        ctx.drawImage(lightOn,-r,-r,2*r,2*r)
        ctx.closePath()
        ctx.restore()
        }
      }

    rotate+=1.5
    if (rotate>360){
      rotate=0

    }      

    }

  

  return (

  <div id='canvaswrapper'>
    
      <CanvasBackground/>
      <Canvas 
      draw ={draw}
      id= 'portcanvas'
      onMouseMove={onmousemove}
      onMouseLeave ={onmouseleave}
      />
    <div className='mainmenu'>
        <HeaderCard 
            title= "Welcome to Propel Studios"
            subtitle = "A dynamic portfolio built in React.js"
            titleClass= "titleCard"/>
        <div className='linklist'>
          <LinkTree containerStyle='linktree-container' linkStyle='linktree' />
        </div>
    </div>
  </div>
  )
}


