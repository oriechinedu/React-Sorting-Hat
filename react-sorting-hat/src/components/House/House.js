import React from 'react'
import './House.css'

export default function house({ house}){
  return (
   <div className="house"
   style={{backgroundColor: house.color, color: '#fff'}}
   >
    <h2>Yay! you belong to the {house.name} !!</h2>
      <h4>About {house.name}</h4>
    <p>{house.bio}</p>
   </div>
  );
}