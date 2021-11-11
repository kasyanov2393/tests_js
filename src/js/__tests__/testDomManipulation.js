import Loader from '../loader';
import App from '../app';

const app = new App();

describe('DOM Manipulation testing', () => {
    beforeAll(() => {
        app.showApp();
    });

    afterAll(() => {
        app.hideApp();
    });

    it('should add element into #app block', () => {
        app.putHtmlInApp('some text');

        expect(app).toMatchSnapshot();
    });

    it('should show and hide loader element', () => {
        const loader = new Loader();

        const loaderId = '#loader';

        loader.showLoader();

        const queriedLoader = document.querySelector(loaderId);

        expect(queriedLoader).toBeDefined();
        expect(queriedLoader.style.display).toBe('block');
        expect(queriedLoader.textContent).toBe('Loading...');

        loader.hideLoader();

        expect(queriedLoader.style.display).toBe('none');
    });

    it('should call callbacks that added to buttons', () => {
        let buttonTemplates = '';
        const buttonClickHandler = jest.fn();

        for (let i = 0; i < 5; i += 1) {
            buttonTemplates = buttonTemplates.concat('<button></button>');
        }

        app.putHtmlInApp(buttonTemplates);

        const buttonElements = document.querySelectorAll('button');

        expect(buttonElements).not.toBeNull();
        expect(buttonElements.length).toBe(5);

        app.addEventListenersToButtons(buttonClickHandler);
        buttonElements.forEach((button) => { button.click(); });

        expect(buttonClickHandler).toBeCalled();
        expect(buttonClickHandler).toHaveBeenCalledTimes(5);
    });
});
