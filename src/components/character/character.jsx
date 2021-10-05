import React, {useState} from 'react';
import Popup from '../popup/popup';

function Character({character}) {
  const {name, image, origin} = character;
  const [isPopupOpen, setModalState] = useState(false);

  const onModalStateSet = () => {
    setModalState(!isPopupOpen);
    document.body.style.overflow = isPopupOpen ? 'visible' : 'hidden';
  };

  return (
    <li className="characters__item">
      <img className="characters__image" src={image} alt="Character" width="150" height="150" onClick={onModalStateSet}/>
      <p className="characters__description" onClick={onModalStateSet}>{name} from {origin.name}</p>
      {isPopupOpen && <Popup character={character} onModalStateSet={onModalStateSet}/>}
    </li>
  )
}

export default Character;
