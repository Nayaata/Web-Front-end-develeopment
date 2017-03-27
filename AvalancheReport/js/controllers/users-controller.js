import { requester } from '../helpers/requester.js';
import { userModel } from '../models/user-model.js';
import { pageView } from '../view/page-viewer.js';
import { notificator } from '../helpers/notificator.js';

const kinvey_APP_ID = 'kid_BkuT-lUql';
const kinvey_APP_SECRET = 'b92b557c5d1f4edca34238eca4e1b481';
const kinvey_MASTER_SECRET = 'bab6be0bbcb647729a5d93b1bc1f1413';
const kinvey_URL = 'https://baas.kinvey.com/';

const STORAGE_USERNAME = 'STORAGE_USERNAME';

class UserController {

    register(context, selector) {

        pageView.register(selector)
        $("#main-content").on("click", "#btn-register", function() {
            let user = {
                username: $('#rg-username').val(),
                password: $('#rg-password').val(),
                email: $('#rg-email').val(),
                address: $('#rg-address').val(),
                phone: $('#rg-phone').val()
            };
            userModel.register(user)
                .then((res) => {
                    notificator.success('Registered Successfully');
                }, (err) => {
                    notificator.error("Register Unsuccessful");
                });
        });
    }
    login(context, selector) {

        pageView.login(selector)
        $("#main-content").on("click", "#btn-login", function() {
            let user = {
                username: $('#tb-username').val(),
                password: $('#tb-password').val()
            };
            userModel.login(user)
                .then((res) => {
                    notificator.success('Login Successfully');
                }, (err) => {
                    notificator.error("Login Unsuccessful");
                });
        });
    }

    logout() {
        $("#logOut").addClass("hidden");
        $("#logIn").removeClass("hidden");
        userModel.logout()
            .then((res) => {

                notificator.success('Successfully logout')
            }, (err) => {
                notificator.success('Successfully logout')
            });
    }

    profile(context, selector) {
        userModel.getCurrentUserInfo()
            .then((res) => {
                let data = userEvents.updateDataProfile(res);
                return pageView.profilePage(selector, data);
            }, (err) => {
                console.log(err);
            }).then(() => {
                userEvents.editProfile();
                userEvents.updateProfile();
                userEvents.cancelEditProfile();
            });
    }
    isLoggedIn() {
        $("#main-content").on("click", )
        if (localStorage.getItem(STORAGE_USERNAME)) {
            $("#logOut").removeClass("hidden");
            $("#logIn").addClass("hidden");
        } else {
            $("#logOut").addClass("hidden");
            $("#logIn").removeClass("hidden");
        }
    }
}

let usersController = new UserController();
export { usersController };