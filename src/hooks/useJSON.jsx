import {useState, useEffect } from 'react';

export default function useJSON(filename){
    const [links,linkState] = useState([])

    useEffect(() => {
        fetch(process.env.PUBLIC_URL + '/jsons' + filename)
        .then((res) => res.json())
        .then((data) => linkState(data.links))
        .catch((error) => 
          console.log('Error:', error))
        
  },[filename])
  return links

  }