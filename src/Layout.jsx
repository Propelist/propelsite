import React, {useEffect,useState} from 'react';
import './css/App.css';
import Logo from './Logo.jsx';
import LinkTree from './LinkTree.jsx';
import useWindowSize from './hooks/useWindowSize.jsx';

export default function Layout(props){

const [leftStyle,setLeftStyle]=useState({display:'flex'})
const [rightStyle,setRightStyle]=useState({})
const [barSize,setbarSize]=useState(true)
const [topBar,setTopbar]=useState({display:'none'})
let windowSize = useWindowSize()

useEffect(()=>{
    if (windowSize[0]<1500){
        setRightStyle({display:'none'})
    }
    else{
        setRightStyle({display:'flex'})
    }
    if (windowSize[0]<1000){
        setbarSize(true)
    }
    else{
        setbarSize(false)
    }
    if (windowSize[0]<768){
        setLeftStyle({display:'none'})
        setTopbar({display:'flex'})
    }
    else{
        setLeftStyle({display:'flex'})
        setTopbar({display:'none'})
    }
},[windowSize]
)

return(
<div className="dockwrapper">
    <div className={`leftdock ${barSize? ' leftMin' : ' leftFull'}`} style={leftStyle}>
    <Logo/>
    <LinkTree containerStyle='sidebar-container' linkStyle='sidebar-links' />
    </div>
    <div className='middock'>
        <div className='topdock' style={topBar}>
            <Logo/>
            <LinkTree containerStyle='topbar' linkStyle='topbar-links' />
        </div>
    {props.content}
    </div>
    <div className='rightdock'style={rightStyle} >
    {props.right}
    </div> 
</div> 
)
}
