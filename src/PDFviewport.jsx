import React, {useRef,useState,useEffect} from 'react';
import {Document,Page} from 'react-pdf/dist/esm/entry.webpack'
import './css/pdf-reader.css';


export default function PDFviewport(props){
    let url=props.url
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(0);
    const zoomPercent= useRef(0);
    const [pageSize, setPageSize] = useState(parseFloat(0.5));
    const docRef=useRef(null)
    const containerRef=useRef(null)
    let [styles,setStyles]=useState({maxHeight:'700'})
    let [conStyles,setConStyles]=useState(null)



useEffect(()=>{


    setConStyles({
        maxWidth: containerRef.current.parentNode.clientWidth
    })

    if (docRef.current.getBoundingClientRect().width>containerRef.current.parentNode.clientWidth){
        setStyles({
            justifyContent: "left",
            overflowX: "scroll",
            maxHeight:'700'
        }

    )}
    
    else{
        setStyles({
            justifyContent: "center",
            overflowX: "hidden",
            maxHeight:'700'
        }


    )}


}, [pageSize])






function onleftclick(){
    if (!(pageNumber-1<0)){
    setPageNumber(pageNumber-1)
    
    }
}

function onrightclick(){
    if(!(pageNumber>=numPages-1))
    setPageNumber(pageNumber+1)
    
}

function onloadsuccess(pdf){
    setNumPages(pdf._transport._numPages)
    zoomPercent.current=(parseInt(100*styles.maxHeight/pdf._pageInfo.view[3]))
    setPageSize((styles.maxHeight/pdf._pageInfo.view[3]).toFixed(2))
    

}

function setPage(e){
    
    if(e.target.value>0 && e.target.value<=numPages)
    setPageNumber(parseInt(e.target.value-1))
    
   

}

function zoomIn(){
    if (parseFloat(pageSize)<2.5){
    setPageSize((parseFloat(pageSize)+0.05).toFixed(2))
    zoomPercent.current= (parseInt(zoomPercent.current)+5)
    }
    }

function zoomOut(){
if (parseFloat(pageSize)>0.1){

setPageSize((parseFloat(pageSize)-0.05).toFixed(2))
zoomPercent.current= (parseInt(zoomPercent.current)-5)
   
         }
        }

function zoomTo(e){
    
    
    if(e.target.value>=10 && e.target.value<=250){
    zoomPercent.current= parseInt(e.target.value)
    setPageSize(e.target.value/100)
    
    }
    }


return(
    
    <div className='pdf-container' ref={containerRef} style={conStyles}>
        <div className='controls'>
            <div className='zoomIndex'> Zoom: {zoomPercent.current} % </div>
            <input className='pagename' type='text' onChange={(e)=>{zoomTo(e)}} size={1} ></input>
            <div className="minuszoom" onClick={zoomOut}> － </div>
            <div className="pluszoom" onClick={zoomIn}> ＋ </div>
            <div className='pageIndex'> {pageNumber+1} of {numPages}</div>
            <div className="leftclick" onClick={onleftclick}> ❮ </div>
            <input className='pagename' onChange={(e)=>{setPage(e)}} size={1} type="text"></input>
            <div className="rightclick" onClick={onrightclick}> ❯ </div>
        </div>
            <div className='handleoverflow' style={styles} >
                <Document file={process.env.PUBLIC_URL + url} inputRef={docRef}>
                    <Page pageIndex={pageNumber}
                    scale={parseFloat(pageSize)}
                    onLoadSuccess= {onloadsuccess}
                    onLoadError={console.error}
                    
                    
                    
                    options={{useSystemFonts:true}}
                
                    />
                </Document>
            </div>
      
    </div>
)

}