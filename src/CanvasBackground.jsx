import React from "react"

export default function CanvasBackground(){

    return(
    <div id="canvasbg" style={{backgroundImage: 'url(' + process.env.PUBLIC_URL + '/images/background.png)'}}>
      {""}
    </div>
    )
  }