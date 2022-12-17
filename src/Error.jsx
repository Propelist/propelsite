import React from 'react';
import {useNavigate} from 'react-router-dom'
import CanvasBackground from './CanvasBackground';





export default function Error(props){

    let navBack=useNavigate()
    

    
    return (
    
    <div style={{height: '100vh', width: '100vw'}} onClick={()=>{navBack('/')}}>
        
        <CanvasBackground/>
        <div className='headsouth'>{props.text}</div>
    </div>
       
       
 
)
        

}