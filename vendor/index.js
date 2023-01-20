
let formElement = document.querySelector('.popup');
let nameInput = formElement.querySelector('.popup__input-name');
let jobInput = formElement.querySelector('.popup__input-job');
let createProfileBtn = document.querySelector('.profile__create-btn');
let closePopupBtn = document.querySelector('.popup__btn-close');
let profileName = document.querySelector('.profile__title');
let profileJob = document.querySelector('.profile__subtitle');

createProfileBtn.addEventListener('click', openPopup);
closePopupBtn.addEventListener('click',closePopup);

function openPopup(){
    formElement.classList.add('popup_open');
}

function closePopup(){
    formElement.classList.remove('popup_open');
}

nameInput.value = profileName.innerHTML;
jobInput.value = profileJob.innerHTML;

function handleFormSubmit (evt) {
    evt.preventDefault(); 

    profileName.textContent = `${nameInput.value}`;
    profileJob.textContent = `${jobInput.value}`;

    closePopup()
}


formElement.addEventListener('submit', handleFormSubmit); 