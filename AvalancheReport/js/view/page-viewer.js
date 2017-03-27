import { templateLoader } from '../helpers/template-loader.js';

function loadRawTemplate(selector, templateName) {
    let selectedItem = $(selector);
    return templateLoader.get(templateName)
        .then((template) => {
            selectedItem.html(template());
        });
}

function setHtmlWithCompiledData(selector, data, templateName) {
    let selectedItem = $(selector);
    return templateLoader.get(templateName)
        .then((template) => {
            selectedItem.html(template(data));
        });
}

class PageView {

    about(selector) {
        return loadRawTemplate(selector, 'about-us');
    }

    // homePage(selector, homePage) {
    //     return setHtmlWithCompiledData(selector, homePage, 'home');
    // }
    homePage(selector) {
        return loadRawTemplate(selector, 'home');
    }
    login(selector) {
        return loadRawTemplate(selector, 'login');
    }
    register(selector) {
        return loadRawTemplate(selector, 'register');
    }
    images(selector, data) {
        return setHtmlWithCompiledData(selector, data, 'images');
    }
}

let pageView = new PageView();
export { pageView };