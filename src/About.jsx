import React from 'react';
import HeaderCard from './HeaderCard.jsx';
import ContactForm from './ContactForm.jsx';
import useTextParser from './hooks/useTextParser.jsx'
import Layout from './Layout.jsx'
import pfp from './resources/images/pfp.jpg';



export default function About(){

    return (

    <Layout
    content ={
        <div className='biobody'>
            <HeaderCard  title="What is Propel Studios?" subtitle="" titleClass="pubTitle"/> 
            <div className="bio"> 
                <ProfilePic/>
                <Biography/>
            
            </div>
            <ContactForm/>
        </div>
            }
            />
    
        )
      }


function ProfilePic(){

return(
    <div>
        <img src={pfp} alt="profile pic" style={{borderRadius: '50%'}} width="300" height="300"></img>

    </div>

)

}


function Biography(){

    let text = useTextParser('/bio.txt')
    
return (

    <div className="bio-text">
    {text}
    </div>


)



}




