import Card from './Card.js';
import FormValidator from "./FormValidator.js";

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
  const closeProfileBtn = document.querySelector('.popup__btn-profile-close')
  const profileName = document.querySelector('.profile__title');
  const profileJob = document.querySelector('.profile__subtitle');
  const popupProfile = document.querySelector('.popup-profile');
  const popupCard = document.querySelector('.popup-card');
  const nameInput = popupProfile.querySelector('.popup__input_type_name');
  const jobInput = popupProfile.querySelector('.popup__input_type_job');
  const titleInput = popupCard.querySelector('.popup__input_type_name-card');
  const urlInput = popupCard.querySelector('.popup__input_type_url');
  const formProfile = document.querySelector('.popup__form-profile');
  const formCards = document.querySelector('.popup__form_type_card');
  const elements = document.querySelector('.elements');
  const template = document.querySelector('#card').content.querySelector('.element');

function handleCardSubmit (e, template) {
    e.preventDefault();
    const item = {
        name : titleInput.value,
        link : urlInput.value,
    }
    const card = new Card(item, template);
    const cardElement = card.generateCard();
    e.target.reset()
    elements.prepend(cardElement)
    closePopup(popupCard)
}

const renderCards = (initialCards, template) => {
  initialCards.forEach((element) => {
     const cards = new Card(element,template);
     const cardElement = cards.generateCard();
     elements.append(cardElement);
   });
 };
 
renderCards(initialCards, template);

function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_open') 
    closePopup(openedPopup)
  }
}

function closeByOverlay(e){
  if(e.target.closest('.popup__container') === null){
    closePopup(e.target)
  }
}

function openPopup(popup){
  popup.classList.add('popup_open');
  document.addEventListener('keydown', closeByEscape);
  document.addEventListener('mouseup',closeByOverlay);
}

function closePopup(popup){
  popup.classList.remove('popup_open');
  document.removeEventListener('keydown', closeByEscape);
  document.removeEventListener('mouseup',closeByOverlay);
}

function openPopupProfile(){
    openPopup(popupProfile)
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
}

function handleProfileFormSubmit (evt) {
    evt.preventDefault(); 
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup(popupProfile)
}

formProfile.addEventListener('submit', handleProfileFormSubmit); 
formCards.addEventListener('submit',(e) => {handleCardSubmit(e, template)});
createProfileBtn.addEventListener('click', openPopupProfile);
createCardBtn.addEventListener('click', () => {openPopup(popupCard)});
closeProfileBtn.addEventListener('click', () => {closePopup(popupProfile)});
closeCardBtn.addEventListener('click',() => {closePopup(popupCard)});

const formConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__btn-save',
  inactiveButtonClass: 'popup__btn-save_disable',
  inputErrorClass: 'popup__input_error',
  errorClass: 'popup__error-message_active'
}

const valid = (formConfig) => {
  const formList = Array.from(document.querySelectorAll('.popup__form'));
  formList.forEach((data) => {
     const valid = new FormValidator(data, formConfig);
     valid.enableValidations();
   });
 };
 
 
valid(formConfig);