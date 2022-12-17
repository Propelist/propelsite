
import React, {useEffect,useState} from "react"
import {Link} from 'react-router-dom'

import useWindowSize from './hooks/useWindowSize.jsx'

import logo from './resources/images/propellogo.png'
import homeIcon from './resources/icons/homeIcon.png'

export default function Logo (){
    let windowSize=useWindowSize()
    let [iconState,setIconState] = useState({})

    useEffect(()=>{
        if(windowSize[0]<1000){
          setIconState(true)
        }
        else {
            setIconState(false)
        }
          },[windowSize]
    
        )

    return(
        <div className={iconState? 'sidebar-links fixed':"logo"}>
            <Link to={'../'}>
                {iconState ?
                <img src={homeIcon} alt='home'  className='icon'></img>:
                <img src={logo} alt='home' width="200"></img> }
            </Link>
    
    </div>
    
    
    )


}



