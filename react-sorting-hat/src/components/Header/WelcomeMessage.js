import React from 'react'
import './Header.css'

export default function welcomeMessage({ children, startHandler, showBtn }) {
  return (
    <div className="App-intro">
      <p>
        Hi, welcome back to school, strive to be the best you can.
      </p>
      {children}
      { !showBtn && <button onClick={startHandler} >Get started</button> }
    </div>
  );
}