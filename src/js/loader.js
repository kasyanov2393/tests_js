const loaderElement = document.querySelector('#loader');

export const showLoader = () => {
    loaderElement.style.display = 'block';
};

export const hideLoader = () => {
    loaderElement.style.display = 'none';
};
