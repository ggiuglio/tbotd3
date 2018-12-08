import React from 'react';
import loaderGif from "../../images/loader.gif";
import "./loader.css"

const Loader = () => {
  return (
    <div className="loader">
      <img src={loaderGif} alt="" />
    </div>
  )
}

export default Loader;