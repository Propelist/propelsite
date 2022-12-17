import React from 'react';

export default function HeaderCard(props) {

      
      let {title,subtitle,titleClass}=props
      
      return (
        <div className={titleClass}>
          <h1 id="title">{title}</h1>
          <h1 id="subtitle">{subtitle}</h1>
        </div>
      )
    }
