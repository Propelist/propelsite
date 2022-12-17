import React from "react"

export default function AlternatingBlocks(props){
    
    let data=props.data
    let headblock=props.headblock
    let Block=props.block


    let compiledDiv=data.map((eachBlock)=>{
   console.log(props.map)
            return <Block map={props.map} key= {eachBlock.name} item= {eachBlock}/>
            })
    return ( 
       <div className='abcontainer'>
        
    {headblock}
    {compiledDiv}
    
    </div>

   )

}