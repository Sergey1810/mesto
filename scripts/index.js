
let formElement = document.querySelector('.popup');
let nameInput = formElement.querySelector('.popup__input_type_name');
let jobInput = formElement.querySelector('.popup__input_type_job');
let createProfileBtn = document.querySelector('.profile__create-btn');
let closePopupBtn = document.querySelector('.popup__btn-close');
let profileName = document.querySelector('.profile__title');
let profileJob = document.querySelector('.profile__subtitle');
let form = document.querySelector('.popup__form')

createProfileBtn.addEventListener('click', openPopup);
closePopupBtn.addEventListener('click',closePopup);

function openPopup(){
    formElement.classList.add('popup_open');
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
}

function closePopup(){
    formElement.classList.remove('popup_open');
}

function handleFormSubmit (evt) {
    evt.preventDefault(); 

    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;

    closePopup()
}


form.addEventListener('submit', handleFormSubmit); 