

import useJSON from './useJSON.jsx';


export default function useBlockData(link){
    
        let setLinks=useJSON(link)
        let assignID='row2'
       
        
        let compiledDiv=setLinks.map((item)=>{
            if(assignID==='row2'){
                assignID= 'row1'
            }
            else {
                assignID= 'row2'
    
            }
          
          
            item.id=assignID
    
            return item
            
        })
        
        return compiledDiv
    }