import Card from './Card.js';
import FormValidator from "./FormValidator.js";
import Section from './Section.js';
import PopupWithForm from './PopupWithForm.js';
import PopupWithImage from './PopupWithImage.js';
import UserInfo from './UserInfo.js';

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

  const openProfileBtn = document.querySelector('.profile__create-btn');
  const createCardBtn = document.querySelector('.profile__add-btn');
  const profileName = document.querySelector('.profile__title');
  const profileJob = document.querySelector('.profile__subtitle');
  const popupProfile = document.querySelector('.popup-profile');
  const popupCard = document.querySelector('.popup-card');
  const nameInput = popupProfile.querySelector('.popup__input_type_name');
  const jobInput = popupProfile.querySelector('.popup__input_type_job');
  const elements = document.querySelector('.elements');
  const template = document.querySelector('#card').content.querySelector('.element');
  export const image = document.querySelector('.popup__image');
  export const subtitle = document.querySelector('.popup__subtitle');
  

const handleCardClick = (name, link, popup) => {
  const popupImage = new PopupWithImage(popup)
  popupImage.openPopup(name, link)
  popupImage.setEventListeners()
}

function createCard(item) {
  const card = new Card(item, template, handleCardClick);
  const cardElement = card.generateCard();
  return cardElement
}

const CardList = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card(item, template, handleCardClick);
    const cardElement = card.generateCard();
    CardList.addItem(cardElement);
  }
}, elements);

CardList.rendererItems()

const formConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__btn-save',
  inactiveButtonClass: 'popup__btn-save_disable',
  inputErrorClass: 'popup__input_error',
  errorClass: 'popup__error-message_active'
}

const formValidators = {}

const enableValidation = (formConfig) => {
  const formList = Array.from(document.querySelectorAll(formConfig.formSelector))
  formList.forEach((formElement) => {
    const validator = new FormValidator(formElement, formConfig)
    const formName = formElement.getAttribute('name')
    formValidators[formName] = validator;
   validator.enableValidations();
  }); 
};

enableValidation(formConfig);

const info = new UserInfo(profileName, profileJob)

const profilePopup = new PopupWithForm(popupProfile, (item) => {
    info.setUserInfo(item)
})

profilePopup.setEventListeners();

const cardPopup = new PopupWithForm(popupCard, (item)=>{
  elements.prepend(createCard({name:item.title, link:item.url}))
  formValidators['popupCards'].resetValidation()
})

cardPopup.setEventListeners()

openProfileBtn.addEventListener('click', ()=>{
  const data = info.getUserInfo()
  nameInput.value = data.name,
  jobInput.value = data.job
  profilePopup.openPopup()
 })

createCardBtn.addEventListener('click', ()=>{
  cardPopup.openPopup()
})

