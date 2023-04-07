import './index.css';
import Card from '../components/Card.js';
import FormValidator from "../components/FormValidator.js";
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import {Api} from '../components/Api.js'
import {openProfileBtn, createCardBtn, profileName, profileJob, nameInput, jobInput, template, avatar, avatarImage} from '../utils/constans.js';
import PopupDeleteCard from '../components/PopupDeleteCard';


export const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-63',
  headers: {
    authorization: 'e16750ca-eb0a-41b4-ae7b-01be71799fd1',
    'Content-Type': 'application/json'
  }
}); 

let userId = null;

const info = new UserInfo(profileName, profileJob, avatarImage)

Promise.all([api.getUserInfo(),api.getInitialCards()]).then(([users, cards]) => {
  userId = users._id
  userInfo(users)
  initialCards(cards)
})

const userInfo = (data) =>{
  const infoData = info.getUserInfo()
  infoData.name.textContent = data.name
  infoData.job.textContent = data.about
  infoData.avatar.src = data.avatar
}

let cardList = {}

const initialCards = (res) => {
   cardList = new Section({
    items: res,
    renderer: (item) => {
      const card = createCard(item)
      cardList.addItem(card);
    }
  }, '.elements');
  cardList.rendererItems()
}

const avatarPopup =  new PopupWithForm('.popup-avatar', (item) => {
  avatarPopup.renderLoading(true)
  api.setChangeAvatar(item.urls)
  .then(res =>{
    info.setUserAvatar(res.avatar, res.name) 
  })
  .catch(err => console.log(err))
  .finally(() => {
    avatarPopup.renderLoading(false)
    avatarPopup.closePopup()
  })
  formValidators['popupAvatar'].resetValidation()
})

avatarPopup.setEventListeners();

avatar.addEventListener('click', ()=>{
  avatarPopup.openPopup()
  avatarPopup.renderLoading(false)
})


const profilePopup = new PopupWithForm('.popup-profile', (item) => {
  profilePopup.renderLoading(true)
  api.setUserInfo(item.name, item.job).then((res) =>{
    info.setUserInfo({name:res.name, job:res.about})
  })
  .catch(err => console.log(err))
  .finally(() => {
    profilePopup.renderLoading(false)
    profilePopup.closePopup()
  })
})

openProfileBtn.addEventListener('click', ()=>{
  const data = info.getUserInfo()
  nameInput.value = data.name.textContent,
  jobInput.value = data.job.textContent
  profilePopup.openPopup()
  profilePopup.renderLoading(false)
 })

profilePopup.setEventListeners();

const popupDelete =  new PopupDeleteCard('.popup-delete')
popupDelete.setEventListeners()

function createCard(item) {
  const card = new Card(item, 
    template, 
    handleCardClick,{
    handleDeleteCard: (card) => {
      popupDelete.openPopup()
      popupDelete.setSubmitHandel(() => {
        api.setDeleteCard(card._data._id).then(() => {
          card.deleteCard()
          popupDelete.closePopup()
        })
        .catch((err) => console.log(err))
      })}},  
    userId, 
    () =>{
      if(item.likes.some(like => like._id == userId)){
        api.setRemoveLike(item._id)
        .then((res) => {
          card._getLikes(res)
          item = res
        })
        .catch(err => console.log(err))
      }else{
        api.setAddLike(item._id)
        .then((res)=>{
          card._getLikes(res)
          item = res
        })
        .catch(err => console.log(err))      
      }});
  const cardElement = card.generateCard();
  return cardElement
}

const cardPopup = new PopupWithForm('.popup-card', (item)=>{
  cardPopup.renderLoading(true)
  api.setAddCard(item.title, item.url)
      .then(res => {
     cardList.addCard(createCard(res)) 
  })
  .catch(err => console.log(err))
  .finally(() =>{
    cardPopup.renderLoading(false)
    cardPopup.closePopup()
  })
  formValidators['popupCards'].resetValidation()
})
cardPopup.setEventListeners()

createCardBtn.addEventListener('click', ()=>{
  cardPopup.openPopup()
  cardPopup.renderLoading(false)
})

const popupImage = new PopupWithImage('.popup-image')
popupImage.setEventListeners()

const handleCardClick = (name, link) => {
  popupImage.openPopup(name, link) 
}

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