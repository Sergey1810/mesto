import Popup from './Popup.js'

export default class PopupWithForm extends Popup {
    constructor(popup, handlerPopupSubmit){
      super(popup),
      this._form = this._popup.querySelector('.popup__form')
      this._handlerPopupSubmit = handlerPopupSubmit
    }

    _getInputValues(){
        this._inputList = this._form.querySelectorAll('.popup__input');
        this._formValues = {};
        this._inputList.forEach(input => {
          this._formValues[input.name] = input.value;
        });
        return this._formValues;
    }

    closePopup(){
        super.closePopup();
        this._form.reset();
    }

    setEventListeners(){
      this._form.addEventListener('submit', (e) =>{
        e.preventDefault();
        this._handlerPopupSubmit(this._getInputValues())
        this.closePopup()
      } )   
      super.setEventListeners();
    }

   
}