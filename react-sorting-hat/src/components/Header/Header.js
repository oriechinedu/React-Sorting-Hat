import React from 'react'
import './Header.css'
import logo from '../../hogwart-image.jpeg';

export default function header(){
  return (
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <h1 className="App-title">Hogwarts -School of Witchcraft and Wizardry</h1>
    </header>
  );
}