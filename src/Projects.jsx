import React, {useState, useEffect} from 'react';


import Layout from './Layout.jsx';
import { MapContainer, TileLayer} from 'react-leaflet';
import HeaderCard from './HeaderCard.jsx';
import AlternatingBlocks from './AlternatingBlocks.jsx';


import useWindowSize from './hooks/useWindowSize';
import useBlockData from './hooks/useBlockData.jsx';

import 'leaflet/dist/leaflet.css';

export default function Projects() {

  

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

    return(
        <Layout
        
            content={
            <div>
                <HeaderCard  title="GIS Projects" subtitle="" titleClass="pubTitle"/>
                <div style={width}>
                    <Map />  
                </div> 
                
                <div id="project-wrapper"
                style={width}
                >
                <AlternatingBlocks 
                    data={useBlockData('/projects.json')} 
                    block={Block}
             
                    headblock={<Block 
                        
                        item={{
                        name: "Click projects to show them on map",
                        description: 'Project Description',
                        header: true}}
                    />}
                />
                    </div>
            </div>
                    }
        />
    )
    }        


    function Block(props){

        let item= props.item
       
      
        const handleclick= ()=>{
            
           
           <Map map={props.map}/>
 
           
        }
        
        return(
        
        <div key={item.notes} >
                <div className = "projectbutton" id={item.id}
                    onClick={()=>{handleclick()}}
                    > 
                        <div>{item.name}</div>
                    
                    </div>
        </div>
    
        )
    
    }
    
    
    function Map(props){
       
        
        return(
        <div>
        
        <MapContainer className='mapcontainer' center={[52, -115]} zoom={6} scrollWheelZoom={false}>
        
        <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        </MapContainer>
        <div className='update'> GIS projects take some development time! <br/> Map Projects are still under Construction! <br/> Please check back in Q1 2023 for updates</div>
        </div>
        
        )
    }

  