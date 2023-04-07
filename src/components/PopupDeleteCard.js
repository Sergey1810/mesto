import Popup from './Popup.js'

export default class PopupDeleteCard extends Popup {
  constructor(popup){
    super(popup)
  }
 
  setSubmitHandel (action){
    this._handlerPopupSubmit = action;
  }

  setEventListeners(){
    this._popup.addEventListener('submit', (e) =>{
      e.preventDefault();
      this._handlerPopupSubmit()
      // super.closePopup()
    } )   
    super.setEventListeners();
  } 
}