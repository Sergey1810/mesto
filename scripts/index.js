const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ]; 

  let createProfileBtn = document.querySelector('.profile__create-btn');
  let createCardBtn = document.querySelector('.profile__add-btn');
  let closeCardBtn = document.querySelector('.popup__btn-card-close')
  let addCardBtn = document.querySelector('.popup__btn-card-create')
  let closePopupBtn = document.querySelector('.popup__btn-close');
  let profileName = document.querySelector('.profile__title');
  let profileJob = document.querySelector('.profile__subtitle');
  let formElement = document.querySelector('.popup');
  let popupCard = document.querySelector('.popup-card');
  let nameInput = formElement.querySelector('.popup__input_type_name');
  let jobInput = formElement.querySelector('.popup__input_type_job');
  let titleInput = popupCard.querySelector('.popup__input_type_name-card');
  let urlInput = popupCard.querySelector('.popup__input_type_url');
  let form = document.querySelector('.popup__form');
  let formCards = document.querySelector('.popup__form_type_card');
  let elements = document.querySelector('.elements');
  let popupImage = document.querySelector('.popup__image');
  let formImage = document.querySelector('.popup-image');
  let formImageSubtitle = document.querySelector('.popup__subtitle')
  let template = document.querySelector('#card').content.querySelector('.element');
  let imageClose = document.querySelector('.popup__btn-image-close')

function handleCardSubmit (evt) {
    evt.preventDefault();
    let name = titleInput.value;
    let link = urlInput.value;
    const card = template.cloneNode(true)
    card.querySelector('.element__image').src = link
    card.querySelector('.element__image').addEventListener('click', function() {
      popupImage.src = link
      formImageSubtitle.textContent = name
      formImage.classList.add('popup_open')
    })
    card.querySelector('.element__title').textContent = name;
    let like = card.querySelector('.element__like')
    like.addEventListener('click',function() {like.classList.toggle('element__like_active')});
    let clearCard = card.querySelector('.element__clear') 
    clearCard.addEventListener('click',function() {
        card.remove();
        
    })
    elements.prepend(card)
    closePopupCard()
}

function renderCards(arr) {
   const cards = arr.map(function (item) {
    const card = template.cloneNode(true)
    card.querySelector('.element__image').src = item.link
    card.querySelector('.element__image').addEventListener('click', function() {
      popupImage.src = item.link
      formImageSubtitle.textContent = item.name
      formImage.classList.add('popup_open')
    })
    card.querySelector('.element__title').textContent = item.name;
    let like = card.querySelector('.element__like')
    like.addEventListener('click',function() {like.classList.toggle('element__like_active')});
    let clearCard = card.querySelector('.element__clear') 
    clearCard.addEventListener('click',function() {
        card.remove();
        
    })
    return card
  }) 
  elements.append(...cards)
}

renderCards(initialCards)

function openPopupCard(){
    popupCard.classList.add('popup_open');
}

function closePopupCard(){
    popupCard.classList.remove('popup_open')
}

function closePopup(){
    formElement.classList.remove('popup_open');
}

function closeImage(){
    formImage.classList.remove('popup_open')
}

function openPopup(){
    formElement.classList.add('popup_open');
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
}

function handleFormSubmit (evt) {
    evt.preventDefault(); 
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup()
}



form.addEventListener('submit', handleFormSubmit); 
createProfileBtn.addEventListener('click', openPopup);
createCardBtn.addEventListener('click', openPopupCard);
closePopupBtn.addEventListener('click', closePopup);
closeCardBtn.addEventListener('click', closePopupCard);
formCards.addEventListener('submit', handleCardSubmit);
imageClose.addEventListener('click', closeImage)