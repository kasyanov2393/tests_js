import { addEventListenersToButtons, putHtmlInApp, showApp } from './app';
import { putHtmlInError, showError, hideError } from './error';
import { hideLoader, showLoader } from './loader';
import { getItemsRequest, toggleFavoriteRequest } from './requests';

const LOADING_ERROR_MESSAGE = 'Произошла ошибка, попробуйте ещё раз.';
const LOADING_MESSAGE = 'Загрузка...';

export default () => {
    hideError();
    showLoader();

    getItemsRequest()
        .then(({ data }) => {
            if (data.result !== 'ok' || typeof data.html === 'undefined') {
                putHtmlInError(LOADING_ERROR_MESSAGE);
                showError();
            } else {
                putHtmlInApp(data.html);
                showApp();

                addEventListenersToButtons((e) => {
                    e.preventDefault();

                    e.currentTarget.textContent = LOADING_MESSAGE;

                    toggleFavoriteRequest(e.currentTarget.dataset.id).then(
                        ({ data: buttonData }) => {
                            if (buttonData.result === 'set') {
                                e.currentTarget.textContent = '🌝';
                            } else {
                                e.currentTarget.textContent = '🌚';
                            }
                        },
                    );
                });
            }
        })
        .catch((e) => {
            putHtmlInError(e.message);
            showError();
        })
        .finally(() => {
            hideLoader();
        });
};
