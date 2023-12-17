import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Route, Routes, useLocation} from "react-router-dom";


import HeaderCanvas from './HeaderCanvas.jsx';
import About from './About.jsx';
import Publications from './Publications.jsx'
import Redirect from './Redirect.jsx';
import Projects from './Projects.jsx';
import Aoc2023 from './Aoc2023.jsx'
import './css/index.css';
import './css/Frontpage.css';
import './css/Projects.css';
import './css/animations.css';
import './css/About.css';
import './css/redirect.css';
import Error from './Error.jsx';

function Index(){
const location = useLocation()
const background = location.state && location.state.background
  
return(
  <div>
  <Routes location={background || location}>
    <Route
      path= "/"
      element= {<HeaderCanvas/>}
      errorElement={<Error text="A development error occurred please head back"/>}
    />
    <Route
      path= "/publications"
      element= {<Publications/>}
      />
    <Route
      path= "/gis"
      element= {<Projects/>}
      />
    <Route
      path= "/about"
      element= {<About/>}
      />
    <Route
      path= "/aoc2023"
      element= {<Aoc2023/>}
      />
    <Route
      path= "/*"
      element= {<Error text={"There is nothing here for you but bad feelings and pointless waste. Click anywhere to go back"}/>}
      />
  </Routes>
  
  {background && 
  <Routes>
    <Route
      path= "/github"
      element= {<Redirect url='https://github.com/Propelist' site='Github'/>}
      />
    <Route
      path= "/linkedin"
      element= {<Redirect url='https://www.linkedin.com/in/cnoyahr/' site='Linkedin'/>}
    />
  </Routes>
    }
  </div>
)
 
}


  
ReactDOM.createRoot(document.getElementById('root')).render(
<BrowserRouter>
  <Index/>
</BrowserRouter>


);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
