import React, {useState, useEffect, useRef} from 'react';
import {useNavigate} from 'react-router-dom'



export default function Redirect(props){

    let navBack=useNavigate()
    let url = props.url;
    let site = props.site;
    const [timer,setTimer] =useState(5)
    const interval = useRef(true)
    useEffect(()=>{
        
        if (!(interval.current===null)){

        interval.current = setInterval(()=>{
            setTimer(timer-1)
        }
            ,1000)
        if (timer===0){
            window.open(url,'_self')
            clearInterval(interval.current)
            interval.current=null
        }
        return (()=>clearInterval(interval.current))
    }
    })

    
    return (
    
<div className='redirect'>
    <div className='goback' onClick={()=>{navBack(-1);clearInterval(interval.current);interval.current=null}}> </div>
    <div className='redirect-box'>
        <div> You are being automatically redirected to {site} in {timer} seconds 
        <br/><br/>Thanks for stopping by. Hope your stay was valuable.</div>
        <div className= 'leavepage' onClick={()=>{window.open(url,'_self')}}> Leave Manually</div>
        <div className='returnal' onClick={()=>{navBack(-1); clearInterval(interval.current);interval.current=null}}>Wait, Take me back</div>
    
    </div>
 </div>
)
        

}
