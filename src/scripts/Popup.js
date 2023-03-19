export default class Popup{
  constructor(popup){ 
    this._popup = popup
    this._closeBtn = this._popup.querySelector('.popup__btn-close');
  }

  openPopup(){
    this._popup.classList.add('popup_open');
  }

  closePopup(){
    this._popup.classList.remove('popup_open');
  }

  _handleEscClose(e){
    if (e.key === 'Escape') {  
      this.closePopup()
    }
  }
    
  _handleOverlayClose(e){
    if(e.target.closest('.popup__container') === null){
        this.closePopup()
    }
  }

  setEventListeners(){
    document.addEventListener('keydown', (e) => this._handleEscClose(e));
    document.addEventListener('mouseup',(e) => this._handleOverlayClose(e));
    this._closeBtn.addEventListener('click', () => this.closePopup()) 
    }
  }