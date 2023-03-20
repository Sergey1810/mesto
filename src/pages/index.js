import './index.css';
import Card from '../components/Card.js';
import FormValidator from "../components/FormValidator.js";
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import { initialCards,openProfileBtn, createCardBtn, profileName, profileJob, nameInput, jobInput, template } from '../utils/constans.js';

const popupImage = new PopupWithImage('.popup-image')
popupImage.setEventListeners()

const handleCardClick = (name, link) => {
  popupImage.openPopup(name, link) 
}

function createCard(item) {
  const card = new Card(item, template, handleCardClick);
  const cardElement = card.generateCard();
  return cardElement
}

const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = createCard(item)
    cardList.addItem(card);
  }
}, '.elements');

cardList.rendererItems()

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

const profilePopup = new PopupWithForm('.popup-profile', (item) => {
    info.setUserInfo(item)
})

profilePopup.setEventListeners();

const cardPopup = new PopupWithForm('.popup-card', (item)=>{
  cardList.addCard(createCard({name:item.title, link:item.url}))
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

