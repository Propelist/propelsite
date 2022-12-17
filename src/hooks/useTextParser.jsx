import {useState, useEffect} from 'react';

export default function useTextParser(filename){
    const [text,setText] = useState([])
    

    useEffect(() => {
        fetch(process.env.PUBLIC_URL + '/jsons' + filename)
        .then((res) => res.text())
        .then((data) => {
          data=data.split('\n')
          
          let map=data
          .map((item,index)=>{

          return <p>{'\u0009'+item}</p>

          })
        
          map=map.reduce((prev,curr)=>{

            return [prev,' ',curr]
        })
        setText(map)
          
    })

  
        .catch((error) => 
          console.log('Error:', error))
  
    
  },[filename])
  return text

  }