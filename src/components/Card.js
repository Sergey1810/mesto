
export default class Card{
    constructor(data, template, handleCardClick, {handleDeleteCard},userId, myToggleLike){
    this._userId = userId
    this._data = data
    this._template = template;
    this._name = data.name;
    this._link = data.link;
    this._popupImg = document.querySelector('.popup-image');
    this._handleCardClick = handleCardClick;
    this._handleDeleteCard = handleDeleteCard;
    this._myToggleLike = myToggleLike
    }

    _getTemplate() {
      const card = this._template.cloneNode(true);
      return card;
      }

    _getLikes(item){
        if(item.likes.some(like => like._id == this._userId)){
          this._likeButton.classList.add('element__like_active');
          this._likeInfo.textContent = `${item.likes.length}`
        }else{
          this._likeButton.classList.remove('element__like_active');
          this._likeInfo.textContent = `${item.likes.length}`
        }
    }

    _setMyLike(){
      this._myToggleLike(this._data)
    }

    _handleImageClick(){ 
      this._handleCardClick(this._name, this._link, this._popupImg)
    }

    deleteCard(){
      this._element.remove();
    }

    _delImage(){
      if(this._data.owner._id == this._userId){
        this._clearCard.classList.add('element__clear_visible')
      }
    }
    
    _setEventListeners() {
      this._likeButton.addEventListener('click', () => this._setMyLike());
      this._clearCard.addEventListener('click', () =>  this._handleDeleteCard(this))
      this._image.addEventListener('click', () =>  this._handleImageClick())   
    }
    
    generateCard() {
        this._element = this._getTemplate();  
        this._image = this._element.querySelector('.element__image');
        this._likeButton = this._element.querySelector('.element__like');
        this._clearCard = this._element.querySelector('.element__clear');
        this._delImage()
        this._likeInfo = this._element.querySelector('.element__like-info')
        this._image.src = this._link;
        this._image.alt = this._name;
        this._element.querySelector('.element__title').textContent = this._name;
        this._getLikes(this._data);
        this._setEventListeners();
        return this._element;
      }
}