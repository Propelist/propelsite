
import React, {useRef, useState} from 'react';
import ReCAPTCHA from "react-google-recaptcha"
import emailjs from '@emailjs/browser'


export default function ContactForm(){
    
const [email,setEmail]= useState('')
const [yemail,setYemail]= useState('')
const [yname,setYname]= useState('')
const [message,setMessage]= useState('')
const [errStyle,setErrStyle] = useState({color: 'red'})
const [captcha,setCaptcha] = useState(false)
const emailRef=useRef()
const yemailRef=useRef()
const yNameRef=useRef()
const formRef=useRef()
const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

function handleSubmit(e){
    e.preventDefault()
    if (captcha){
        if (yemail.match(mailformat)){
            if(yname){
                if (email){
                    emailjs.sendForm(process.env.REACT_APP_SERVICE_ID,
                    process.env.REACT_APP_TEMPLATE_ID,
                    formRef.current,
                    process.env.REACT_APP_PUBLIC_KEY)
                    .then((result) => {
                    setErrStyle({color: 'green'})
                    setMessage('Your message has been successfully sent!')
                    
                }, (error) => {
                    setErrStyle({color: 'red'})
                    setMessage('Something went wrong, please try again')
                })
        
                }
                else{
                    emailRef.current.focus()
                    setErrStyle({color: 'red'})
                    setMessage('Contact field can not be blank')

                }
            }
            else{
                yNameRef.current.focus()
                setErrStyle({color: 'red'})
                setMessage('Please leave your name')
            }
        }
        else{
            yemailRef.current.focus()
            setErrStyle({color: 'red'})
            setMessage('Please provide a valid email')
        }
    }
    else{
    setErrStyle({color: 'red'})
    setMessage('Please complete the captcha')
    }

}


return(
<div>
    <form ref={formRef} onSubmit={handleSubmit}>
            <label className='contact'>
                <textarea name="contactForm" className='textbox' value={email} ref={emailRef} onChange={(e) => setEmail(e.target.value)}></textarea>
            </label>

        <div className= 'submission'>
            <div className= 'userinfo'>
                <label> email address:   
                    <input className= 'youremail' name='youremail' type='text' value={yemail} ref={yemailRef} onChange={(e) => setYemail(e.target.value)}></input>
                    </label>
                
                <label>name:   
                <input className= 'yourname' name='yourname' type='text' value={yname} ref={yNameRef} onChange={(e) => setYname(e.target.value)}></input>
                </label>
                
            </div>
            
            <ReCAPTCHA sitekey={process.env.REACT_APP_CAPTCHA_KEY} theme='dark' onChange={()=>{setCaptcha(true)}}/>
            
            <label style={errStyle}>
            
            <input className= 'submitform' type='submit' value={'submit'}></input>
            {message}
            </label>
            
        </div>
    </form>
</div>

)






}