import {useState, useEffect} from 'react';

export default function useWindowSize(){

    const [windowSize,setWindowSize]=useState([window.innerWidth,window.innerHeight])
    function updateSize(){
        setWindowSize([window.innerWidth,window.innerHeight])
   
    }
    let timer;
    function debounce(func){
        
        if(timer){
        clearTimeout(timer)
        }

        timer = setTimeout(()=>{ 
        func()
            
        },25)
        }
       

useEffect(()=>{
   
    window.addEventListener('resize',()=>{debounce(updateSize)})

    return ()=>{window.addEventListener('resize',()=>{debounce(updateSize)})}
   
})

return windowSize
  }


