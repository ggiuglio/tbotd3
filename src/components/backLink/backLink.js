import React from 'react';
import backArrow from "../../images/back-arrow.jpg";
import "./backLink.css"
import { Link } from "react-router-dom";

const BackLink = () => {
  return (
    <div className="backLink">
      <Link to="/">
        <div> 
          <img src={backArrow} alt="" /> 
          BACK TO SURVEYS LIST 
        </div>
      </Link>
    </div>
  )
}

export default BackLink;