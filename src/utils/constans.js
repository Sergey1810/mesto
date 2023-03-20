export const initialCards = [
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

 export const openProfileBtn = document.querySelector('.profile__create-btn');
 export const createCardBtn = document.querySelector('.profile__add-btn');
 export  const profileName = document.querySelector('.profile__title');
 export  const profileJob = document.querySelector('.profile__subtitle');
const popupProfile = document.querySelector('.popup-profile');
export   const nameInput = popupProfile.querySelector('.popup__input_type_name');
export  const jobInput = popupProfile.querySelector('.popup__input_type_job');
export  const template = document.querySelector('#card').content.querySelector('.element');