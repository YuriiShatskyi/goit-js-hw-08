import throttle from 'lodash.throttle'

const STORAGE_KEY = 'feedback-form-state';

const refs = { 
    form: document.querySelector(".feedback-form"),
    textarea: document.querySelector(".feedback-form textarea"),
    emailRef: document.querySelector('input'),    
}

refs.form.addEventListener('submit', onFormSubmit);
refs.textarea.addEventListener('input', throttle(onTextareaInput, 500));
refs.form.addEventListener("input", throttle(formDataInput, 500));

function onFormSubmit(evt) { 
    evt.preventDefault();
    console.log({email: refs.emailRef.value, message: refs.textarea.value});

    evt.currentTarget.reset()
  
    localStorage.clear()
}

function formDataInput(evt) {  
    const formData = {
    email: refs.form.elements.email.value,
    message: refs.form.elements.message.value,
  };
  
    localStorage.setItem("feedback-form-state", JSON.stringify(formData));
}
    
function onTextareaInput(evt) {
    const message = evt.target.value;
    
    localStorage.setItem(STORAGE_KEY, message);
    
}

function getCurrentValuesOnForm() {
    const localStorageData = localStorage.getItem('feedback-form-state');
        if (localStorageData) {
    const currentData = JSON.parse(localStorageData);
    emailRef.value = currentData.email;
    messageRef.value = currentData.message;
}
};

getCurrentValuesOnForm();