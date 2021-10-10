import React, {useState} from 'react';
import Popup from '../popup/popup';
import PropTypes from 'prop-types';

function Character({character, onFavoriteButtonClick}) {
  const {name, image, origin, id} = character;
  const [isFavoriteActive, setFavoriteState] = useState(character.isFavorite);
  const [isPopupOpen, setModalState] = useState(false);

  const onModalStateSet = () => {
    setModalState(!isPopupOpen);
    document.body.style.overflow = isPopupOpen ? 'visible' : 'hidden';
  };

  const handleFavoriteButtonClick = (evt) => {
    const newCharacter = Object.assign({}, character);
    newCharacter.isFavorite = evt.target.checked;
    onFavoriteButtonClick(newCharacter);
    setFavoriteState(!isFavoriteActive);
  };

  return (
    <li className="characters__item">
      <div className="characters__favorite-wrapper">
        <label className="characters__favorite" htmlFor={id}>
          <input className="visually-hidden" id={id} checked={isFavoriteActive} type="checkbox" onChange={handleFavoriteButtonClick}/>
          <svg className="characters__favorite-icon" xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 504 504" enableBackground='new 0 0 504 504' xmlSpace="preserve">
            <circle fill="#48a3a1" cx="252" cy="252" r="252"/>
            <path fill="#a83452" d="M331 115c-34 0-64 19-79 47a90 90 0 0 0-169 43c0 70 169 223 169 223s169-146 169-223c0-50-40-90-90-90z"/>
          </svg>
        </label>
        <img className="characters__image" src={image} alt="Character" width="150" height="150" onClick={onModalStateSet}/>
      </div>
      <p className="characters__description" onClick={onModalStateSet}>{name} from {origin.name}</p>
      {isPopupOpen && <Popup character={character} onModalStateSet={onModalStateSet}/>}
    </li>
  );
}

Character.propTypes = {
  onFavoriteButtonClick: PropTypes.func.isRequired,
  character: PropTypes.shape({
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    origin: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Character;
