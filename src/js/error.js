const errorElement = document.querySelector('#error');

export const showError = () => {
    errorElement.style.display = 'block';
};

export const hideError = () => {
    errorElement.style.display = 'none';
};

export const putHtmlInError = (text) => {
    errorElement.innerHTML = text;
};
