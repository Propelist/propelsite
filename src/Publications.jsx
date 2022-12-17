import React, {useState, useRef, useEffect} from 'react';


import Layout from './Layout.jsx';

import './css/pdf-reader.css';

import HeaderCard from './HeaderCard.jsx';
import PDFviewport from './PDFviewport.jsx';
import AlternatingBlocks from './AlternatingBlocks.jsx';
import expandIcon from './resources/icons/expandIcon.png';
import disabledExpandIcon from './resources/icons/dexpandIcon.png';
import collapseIcon from './resources/icons/collapseIcon.png';
import newTabIcon from './resources/icons/newTabIcon.png';
import disablednewTabIcon from './resources/icons/dnewTabIcon.png';

import useWindowSize from './hooks/useWindowSize.jsx';
import useBlockData from './hooks/useBlockData.jsx';

export default function Publications() {
    
    let windowSize=useWindowSize()
    const [width,setWidth]=useState({width: 1500})
    useEffect(()=>{
        
        
        if(windowSize[0]<1200){
            setWidth({width: '100%'})
        }
        else{
            setWidth({width: (windowSize[0]-400)})

        }
    },[windowSize]
)       
    return (

    <Layout
    
        content={
        <div>
            <HeaderCard  title="Select Publications" subtitle="Journal Publications & Conferences" titleClass="pubTitle"/>   
            <div id="publication-wrapper"
            style={width}
            >
                <AlternatingBlocks 
                data={useBlockData('/pubs.json')}
              
                headblock={<Block item={{
        
                    date: "Date",
                    place: "Venue",
                    name: "Publication Name",
                    coauthors: "Publication Co-authors",
                    notes:"Publication Information",
                    linka: "",
                    id:'lead-box'}}/>}
                block={Block}
                />
            </div>
        </div>
        }
        
    />
    )
  }





function Block(props){

    let windowSize=useWindowSize()
    let [boxHide,setBoxHide]= useState({display:'flex'})

    useEffect(()=>{
    
        if (windowSize[0]<1200){
            setBoxHide({display:'none'})
        }
        else{
        setBoxHide({display:'flex'})
        }


    },[windowSize])

    let item= props.item
    const [showing,showState]=useState(false)
    const pdfRef=useRef(null)
    let box3=""


    const openExternal= (e,link)=>{
 
        window.open(link,'_blank')


    }

    const handleclick= ()=>{
       
        showState(!showing)
     
    }

    if(item.id==='lead-box'){
        box3=<div id="box3"><span></span></div>


    }
    else{
        box3 = 
        <div id="box3">
            <div className={"external" + (item.linka==="N/A" ? " disabled" : "" )} onClick={(e)=>openExternal(e,item.linka)}><span id='pub-link'>Abstract {"   "}
            <img src={item.linka==="N/A" ? disablednewTabIcon: newTabIcon} alt='newTab' width="15"height ="15"></img> </span></div>
            <div className={"spread" + (item.linka==="N/A" ?  " disabled" : "" )} onClick={()=>handleclick()}>Full Text 
            {
            showing ? 
            <img src={collapseIcon} alt='collapse' width="20" height ="20"></img> :
            <img src={item.linka==="N/A" ? disabledExpandIcon : expandIcon} alt='expand' width="20"height ="20"></img>
            } 
            </div>
                
         </div>

    }
     
    
    return(
    
    <div key={item.notes} >
            <div className = "blocks" id={item.id}>
                <div id="box1" style={boxHide}>
                    <span id='date'>{item.date}</span>
                    
                    <span id='place'>{item.place}</span>
                </div>
                <div id="box2">
                    <span id='pub-title'>{item.name}</span>
                    <span id='co-authors'>{item.coauthors}</span>
                    <span id='pub-notes'>{item.notes}</span>
                </div>
                {box3}
            </div>
            
            {showing && <div className='pdfelement' ref={pdfRef}>
            {item.type==="pdf" &&<PDFviewport url={item.url} />}

            </div>}
    </div>

    )

}


      