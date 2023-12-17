import {useState, useEffect} from 'react';

export default function useTextParser(filename){
    const [text,setText] = useState([])
    

    useEffect(() => {
        fetch(process.env.PUBLIC_URL + '/jsons' + filename)
        .then((res) => res.text())
        .then((data) => {
          data=data.split('\n')
          
        setText(data)
          
    })

  
        .catch((error) => 
          console.log('Error:', error))
  
    
  },[filename])
  return text

  }