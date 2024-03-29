import Popup from './Popup.js'

export default class PopupWithImage extends Popup{
  constructor(popup){
    super(popup)
    this._image = this._popup.querySelector('.popup__image');
    this._subtitle = this._popup.querySelector('.popup__subtitle');
  }

  openPopup(name, link){
    this._image.src = link; 
    this._image.alt = name;
    this._subtitle.textContent = name;
    super.openPopup()
  }
}