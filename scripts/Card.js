export default class Card{
    constructor(data, template, handleCardClick){
    this._template = template;
    this._name = data.name;
    this._link = data.link;
    this._popupImg = document.querySelector('.popup-image');
    this._handleCardClick = handleCardClick;
    }

    _getTemplate() {
      const card = this._template.cloneNode(true);
      return card;
      }

    _toggleLike(){
      this._likeButton.addEventListener('click', () => {this._likeButton.classList.toggle('element__like_active')});
    }

    _deleteCard(){
      this._clearCard.addEventListener('click', () => {this._element.remove()})
    }

    _handleImageClick(){
      this._image.addEventListener('click', () => {
        this._handleCardClick(this._name, this._link, this._popupImg)
        })
    }
    
    _setEventListeners() {
        this._toggleLike();
        this._deleteCard();
        this._handleImageClick();
    }
    
    generateCard() {
        this._element = this._getTemplate();  
        this._image = this._element.querySelector('.element__image');
        this._likeButton = this._element.querySelector('.element__like');
        this._clearCard = this._element.querySelector('.element__clear');
        this._image.src = this._link;
        this._image.alt = this._name;
        this._element.querySelector('.element__title').textContent = this._name;
        this._setEventListeners();
        
        return this._element;
      }
}