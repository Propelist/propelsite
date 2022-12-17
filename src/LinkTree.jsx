import React, {useState,useEffect} from 'react';
import {Link,useLocation} from 'react-router-dom'

import useJSON from './hooks/useJSON.jsx';
import useWindowSize from './hooks/useWindowSize.jsx';




export default function LinkTree(props) {

    let containerStyle=props.containerStyle
    let linkStyle = props.linkStyle
    const linkFile = '/links.json'
    const setLinks = useJSON(linkFile)
    const windowSize = useWindowSize()
    const location=useLocation()
    const [menuText,setMenuText]=useState({display:'flex'})

  useEffect(()=>{
    if(windowSize[0]<1000 && !(linkStyle==='linktree')){
      setMenuText({display:'none'})
    }
    else {
      setMenuText({display:'flex'})
    }
      },[windowSize,linkStyle]

    )
  
      return (
        <div className={containerStyle}>

          {
        

          setLinks.map((item) =>
          
          <Link to= {'../' + item.a} key={item.link} state= {item.modal? {background: location} : {}}> 
      
            <div className = {linkStyle} key={item.name}>
              <img alt={item.name} src={process.env.PUBLIC_URL + item.img} className='icon'></img>
              <div className= 'linktext' style={menuText}>{"  "+item.link}</div>
            </div>
         
          </Link>
           
           
            )
            }
        
  
        </div>
      )
    
        
    }