const appElement = document.querySelector('#app');

export const showApp = () => {
    appElement.style.display = 'block';
};

export const hideApp = () => {
    appElement.style.display = 'none';
};

export const putHtmlInApp = (text) => {
    appElement.innerHTML = text;
};

export const addEventListenersToButtons = (listener) => {
    Array.from(appElement.querySelector('button')).forEach((button) => {
        button.addEventListener('click', listener);
    });
};
