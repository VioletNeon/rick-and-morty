import React, {useRef, useEffect} from 'react';
import {trapFocus} from '../../utils';

const POPUP_CLASS_NAME = 'popup';
const KEY_ESCAPE_CODE = 27;

function Popup({character, onModalStateSet}) {
  const {name, image, origin, status, location, species, type, episode} = character;
  const popup = useRef(null);
  const episodes = episode.join('').match(/\d{1,}/g).join(', ');

  const onEscKeyDown = (evt) => {
    if (evt.keyCode === KEY_ESCAPE_CODE) {
      evt.preventDefault();
      onModalStateSet();
    }
  };

  const onOverlayModalClick = (evt) => {
    if (evt.target.className === POPUP_CLASS_NAME) {
      onModalStateSet();
    }
  };

  useEffect(() => {
    trapFocus(popup.current);
    document.addEventListener('keydown', onEscKeyDown);
    return () => document.removeEventListener('keydown', onEscKeyDown);
  });

  return (
    <div className="popup" onClick={onOverlayModalClick} ref={popup}>
      <div className="popup__wrapper">
        <h2 className="visually-hidden">Character card</h2>
        <img className="popup__image" src={image} alt="Character" width="300" height="300"/>
        <ul className="popup__list">
          <li className="popup__item">
            <p className="popup__description"><span>Name:</span> {name}</p>
          </li>
          <li className="popup__item">
            <p className="popup__description"><span>Status:</span> {status}</p>
          </li>
          <li className="popup__item">
            <p className="popup__description"><span>Species:</span> {species}</p>
          </li>
          <li className="popup__item">
            <p className="popup__description"><span>Type:</span> {!type && '-'}</p>
          </li>
          <li className="popup__item">
            <p className="popup__description"><span>First seen in:</span> {origin.name}</p>
          </li>
          <li className="popup__item">
            <p className="popup__description"><span>Last known location:</span> {location.name}</p>
          </li>
          <li className="popup__item">
            <p className="popup__description"><span>Episodes:</span> {episodes}</p>
          </li>
        </ul>
        <button className="popup__popup-close-button" type="button" aria-label="Закрыть" onClick={onModalStateSet} tabIndex="0">
        </button>
      </div>
    </div>
  )
}

export default Popup;
