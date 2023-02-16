
const enableValidations = ({formSelector,
inputSelector,
submitButtonSelector,
inactiveButtonClass,
inputErrorClass,
errorClass}) => {
  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach((formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    const SubmitFormBtn = formElement.querySelector(submitButtonSelector);
      inputList.forEach((elementInput) => {
      const errorTextContainerSelector = `.${elementInput.name}-input-error`;
      const elementError = formElement.querySelector(errorTextContainerSelector);
      elementInput.addEventListener('input', (e) => {
        const input = e.target;
        checkFormValidity(inputList, SubmitFormBtn, inactiveButtonClass);
        checkFieldValidity(input, elementError, inputErrorClass, errorClass);
      });
    });
  });
}

const checkFormValidity = (elementsFields, elementSubmit, inactiveButtonClass) => {
    toggleFormSubmit(elementSubmit, { disable: true }, inactiveButtonClass);
    const formIsValid = elementsFields.every(({ validity }) => validity.valid);
    if (!formIsValid) {
      toggleFormSubmit(elementSubmit, { disable: false },inactiveButtonClass);
    }
    return formIsValid;
  };

const setFieldError = (elementInput, elementError,{ validationMessage, valid, invalidInputClass },errorClass) => {
  elementError = document.querySelector(`.${elementInput.name}-input-error`);
  elementError.textContent = validationMessage;
  if (valid) {
    elementInput.classList.remove(invalidInputClass);
    elementError.classList.remove(`${errorClass}`)
  } else {
    elementInput.classList.add(invalidInputClass);
    elementError.classList.add(`${errorClass}`);
  }
  };
  
const checkFieldValidity = (elementInput, elementError, invalidInputClass, errorClass) => {
  const { validationMessage, validity: { valid } } = elementInput;
  const params = {
    validationMessage,
    valid,
    invalidInputClass,
  };
  setFieldError(elementInput, elementError, params, errorClass);
  return valid;
};

const toggleFormSubmit = (elementSubmit, { disable }, inactiveButtonClass) => {
  if (disable) {
    elementSubmit.classList.remove(inactiveButtonClass)
    elementSubmit.removeAttribute('disabled');
  } else {
    elementSubmit.classList.add(inactiveButtonClass)
    elementSubmit.setAttribute('disabled', 'disabled');
  }
};