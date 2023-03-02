const popupImage = document.querySelector('.popup__image');
const formImageSubtitle = document.querySelector('.popup__subtitle')

export default class Card{
    constructor(data, templateSelector){
    this._templateSelector = templateSelector;
    this._name = data.name;
    this._link = data.link;
    this._popupImage = popupImage;
    this._formImageSubtitle = formImageSubtitle;
    this._popupImg = document.querySelector('.popup-image');
    }

    _getTemplate() {
      const card = this._templateSelector.cloneNode(true);
      return card;
      }

    _closeByEscape (e) {
      if (e.key === 'Escape') {
        const openedPopup = this._popupImg.querySelector('.popup_open') 
        this._handleClosePopup(openedPopup)
      }
    }
      
    _closeByOverlay(e){
      if(e.target.closest('.popup__container') === null){
        this._handleClosePopup(e.target)
      }
    }

    _handleOpenPopup() {
      this._popupImg.classList.add('popup_open');
      document.addEventListener('keydown', (e)=>this._closeByEscape(e));
      document.addEventListener('mouseup',(e)=>this._closeByOverlay(e));
    }
    
    _handleClosePopup() {
      this._popupImage.src = '';
      this._popupImg.classList.remove('popup_open');
      document.removeEventListener('keydown', (e)=>this._closeByEscape(e));
      document.removeEventListener('mouseup',(e)=>this._closeByOverlay(e));
    }
    
    _setEventListeners() {
      this._image.addEventListener('click', () => {
          this._handleOpenPopup();
        });
        this._closeCardBtn = this._popupImg.querySelector('.popup__btn-image-close')
        this._closeCardBtn.addEventListener('click', () => {
          this._handleClosePopup();
        }); 
    }
    
    generateCard() {
        this._element = this._getTemplate();  
        this._image = this._element.querySelector('.element__image');
        this._image.src = this._link;
        this._image.alt = this._name;
        this._image.addEventListener('click', () => {
        this._popupImage.src = this._link;
        this._popupImage.alt = this._name;
        this._formImageSubtitle.textContent = this._name;
        this._handleOpenPopup()
        })
        this._setEventListeners();
        const like = this._element.querySelector('.element__like')
        like.addEventListener('click', function() {like.classList.toggle('element__like_active')});
        this._element.querySelector('.element__title').textContent = this._name;
        const clearCard = this._element.querySelector('.element__clear') 
        clearCard.addEventListener('click', () => {this._element.remove()})
        return this._element;
      }
}