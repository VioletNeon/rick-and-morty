import React from 'react';

function Character({character}) {
  const {name, image, origin} = character;

  return (
    <li className="characters__item">
      <img src={image} alt="Character image" width="150" height="150"/>
      <p className="characters__description">{name} from {origin.name}</p>
    </li>
  )
}

export default Character;
