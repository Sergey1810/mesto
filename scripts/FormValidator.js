export default class FormValidator{
    constructor(data, formConfig){
      this._formSelector = data
      this._inputSelector = formConfig.inputSelector;
      this._submitButtonSelector = formConfig.submitButtonSelector;
      this._inactiveButtonClass = formConfig.inactiveButtonClass;
      this._inputErrorClass = formConfig.inputErrorClass;
      this._errorClass = formConfig.errorClass;
    }

    _checkFormValidity() {
      this._formIsValid = this._inputList.every(({ validity }) => validity.valid);
      this._toggleFormSubmit();
      return this._formIsValid;
    };
        
    _checkFieldValidity() {
      this._elementError = document.querySelector(`.${this._elementInput.name}-input-error`);
      this._elementError.textContent = this._elementInput.validationMessage;
      if (this._elementInput.validity.valid) {
        this._elementInput.classList.remove(this._inputErrorClass);
        this._elementError.classList.remove(`${this._errorClass}`)
      } else {
        this._elementInput.classList.add(this._inputErrorClass);
        this._elementError.classList.add(`${this._errorClass}`);
      }
    };
        
    _toggleFormSubmit() {
      if (this._formIsValid) {
        this._submitFormBtn.classList.remove(this._inactiveButtonClass)
        this._submitFormBtn.removeAttribute('disabled');
      } else {
        this._submitFormBtn.classList.add(this._inactiveButtonClass)
        this._submitFormBtn.setAttribute('disabled', 'disabled');
      }
    };

    resetValidation() {
      this._formIsValid = false
      this._toggleFormSubmit();
      this._inputList.forEach((inputElement) => {
      this._hideError(inputElement);
    });   
    }

    _hideError(inputElement){
      this._elementError = document.querySelector(`.${inputElement.name}-input-error`);
      inputElement.classList.remove(this._inputErrorClass);
      inputElement.value = '';
      this._elementError.classList.remove(`${this._errorClass}`);
    }

    _setEventListener(elementInput){
       elementInput.addEventListener('input', (e) => {
        this._elementInput = elementInput
        this._checkFormValidity();
        this._checkFieldValidity();   
      });
    }

    enableValidations() {
      this._inputList = Array.from(this._formSelector.querySelectorAll(this._inputSelector));
      this._submitFormBtn = this._formSelector.querySelector(this._submitButtonSelector);
      this._inputList.forEach((elementInput) => {
      const errorTextContainerSelector = `.${elementInput.name}-input-error`;
      this._elementError = this._formSelector.querySelector(errorTextContainerSelector);
      this._setEventListener(elementInput);
      }); 
    };
}