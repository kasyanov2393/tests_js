import App from './app';
import Error from './error';
import Loader from './loader';
import { getItemsRequest, toggleFavoriteRequest } from './requests';

const LOADING_ERROR_MESSAGE = 'Произошла ошибка, попробуйте ещё раз.';
const LOADING_MESSAGE = 'Загрузка...';

const app = new App();
const loader = new Loader();
const error = new Error();

export default () => {
    error.hideError();
    loader.showLoader();

    getItemsRequest()
        .then(({ data }) => {
            if (data.result !== 'ok' || typeof data.html === 'undefined') {
                error.putHtmlInError(LOADING_ERROR_MESSAGE);
                error.showError();
            } else {
                app.putHtmlInApp(data.html);
                app.showApp();

                app.addEventListenersToButtons((e) => {
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
            error.putHtmlInError(e.message);
            error.showError();
        })
        .finally(() => {
            loader.hideLoader();
        });
};
