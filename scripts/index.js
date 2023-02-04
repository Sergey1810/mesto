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

  const createProfileBtn = document.querySelector('.profile__create-btn');
  const createCardBtn = document.querySelector('.profile__add-btn');
  const closeCardBtn = document.querySelector('.popup__btn-card-close')
  const addCardBtn = document.querySelector('.popup__btn-card-create')
  const closePopupBtn = document.querySelector('.popup__btn-close');
  const closeProfileBtn = document.querySelector('.popup__btn-profile-close')
  const profileName = document.querySelector('.profile__title');
  const profileJob = document.querySelector('.profile__subtitle');
  const formElement = document.querySelector('.profile-popup');
  const popupCard = document.querySelector('.popup-card');
  const nameInput = formElement.querySelector('.popup__input_type_name');
  const jobInput = formElement.querySelector('.popup__input_type_job');
  const titleInput = popupCard.querySelector('.popup__input_type_name-card');
  const urlInput = popupCard.querySelector('.popup__input_type_url');
  const formProfile = document.querySelector('.popup_form-profile');
  const formCards = document.querySelector('.popup__form_type_card');
  const elements = document.querySelector('.elements');
  const popupImage = document.querySelector('.popup__image');
  const formImage = document.querySelector('.popup-image');
  const formImageSubtitle = document.querySelector('.popup__subtitle')
  const template = document.querySelector('#card').content.querySelector('.element');
  const imageClose = document.querySelector('.popup__btn-image-close')

  function createCard(item) {

    const card = template.cloneNode(true)
    card.querySelector('.element__image').src = item.link
    card.querySelector('.element__image').alt = item.name
    card.querySelector('.element__image').addEventListener('click', function() {
      popupImage.src = item.link
      popupImage.alt = item.name
      formImageSubtitle.textContent = item.name
      openPopup(formImage)
    })
    card.querySelector('.element__title').textContent = item.name;
    const like = card.querySelector('.element__like')
    like.addEventListener('click', function() {like.classList.toggle('element__like_active')});
    const clearCard = card.querySelector('.element__clear') 
    clearCard.addEventListener('click', function() {card.remove()})
   
    return card 
}


function handleCardSubmit (evt) {
    evt.preventDefault();
    const item = {
        name : titleInput.value,
        link : urlInput.value,
    }
    const card = createCard(item)
    evt.target.reset()
    elements.prepend(card)
    closePopup(popupCard)
}

function renderCards(arr) {
   const cards = arr.map(function (item) {
    const card = createCard(item)
    return card
})
  elements.append(...cards)
}

renderCards(initialCards)

function openPopup(popup){
  popup.classList.add('popup_open');
}

function closePopup(popup){
  popup.classList.remove('popup_open');
}

function openPopupProfile(){
    openPopup(formElement)
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
}

function handleFormSubmit (evt) {
    evt.preventDefault(); 
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup()
}

formProfile.addEventListener('submit', handleFormSubmit); 
createProfileBtn.addEventListener('click', openPopupProfile);
createCardBtn.addEventListener('click', () => {openPopup(popupCard)});
closeProfileBtn.addEventListener('click', () => {closePopup(formElement)});
closeCardBtn.addEventListener('click',() => {closePopup(popupCard)});
formCards.addEventListener('submit', handleCardSubmit);
imageClose.addEventListener('click', () => {closePopup(formImage)})