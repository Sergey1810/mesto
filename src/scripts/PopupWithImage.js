import Popup from './Popup.js'
import {image, subtitle} from '../pages/index.js'

export default class PopupWithImage extends Popup{
  constructor(popup){
    super(popup)
  }

  openPopup(name, link){
    image.src = link; 
    image.alt = name;
    subtitle.textContent = name;
    super.openPopup()
  }
}