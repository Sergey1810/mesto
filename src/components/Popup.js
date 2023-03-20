export default class Popup{
  constructor(popup){ 
    this._popup = document.querySelector(popup),
    this._closeBtn = this._popup.querySelector('.popup__btn-close')
  }

  openPopup(){
    this._popup.classList.add('popup_open');
    document.addEventListener('keydown', this._closeEsc = (e) => {this._handleEscClose(e)});
    document.addEventListener('mouseup', this._closeOver = (e) => {this._handleOverlayClose(e)});
  }

  closePopup(){
    this._popup.classList.remove('popup_open');
     document.removeEventListener('keydown', this._closeEsc);
     document.removeEventListener('mouseup', this._closeOver);
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
    this._closeBtn.addEventListener('click', () => this.closePopup()) 
    }
  }