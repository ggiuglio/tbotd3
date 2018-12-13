import React from 'react';
import loaderGif from "../../images/loader.gif";
import "./actionLogConsole.css"

const ActionLogConsole = ({messages}) => {

  const logs = messages.map((message, i) => {
    return <div key = {1}> {message} </div>
  });

  return (
    <div>
      {logs}
    </div>
  )
}

export default ActionLogConsole;