import { homeController } from './js/controllers/home-controller.js';
import { imagesController } from './js/controllers/images-controller.js';
import { usersController } from './js/controllers/users-controller.js';
import { coursesController } from './js/controllers/courses-controller.js';

(function() {
    let sammyApp = Sammy('#main-content', function() {

        this.get('#/', function() {
            this.redirect('#/home');
        });

        this.get('#/home', (context) => {
            homeController.home(context, '#main-content');
        });

        this.get('#/about', (context) => {
            homeController.about(context, '#main-content');
        });
        this.get('#/login', (context) => {
            usersController.login(context, '#main-content');
        });
        this.get('#/register', (context) => {
            usersController.register(context, '#main-content');
        });
        this.get('#/logout', (context) => {
            usersController.logout(context, '#main-content');
        });

        this.get('#/images', (context) => {
            imagesController.images(context, '#main-content');
        });

        this.get('#/bulletin', (context) => {
            homeController.bulletin(context, '#main-content');
        });
        this.get('#/courses', (context) => {
            coursesController.courses(context, '#main-content');
        });
    });

    $(function() {
        sammyApp.run('#/');
    });
    usersController.isLoggedIn();
})();