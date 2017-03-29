import { requester } from '../helpers/requester.js';
import { notificator } from '../helpers/notificator.js';
import * as CryptoJS from '../../node_modules/crypto-js/crypto-js.js';

const kinvey_APP_ID = 'kid_Hy6KS9Bnl';
const kinvey_APP_SECRET = 'b29f8628042140ca87b41da18c3ea552';
const kinvey_MASTER_SECRET = 'b44dcc3c1fd145b089de0cf9b8bbdf0c';
const kinvey_URL = 'https://baas.kinvey.com/';

const STORAGE_USERNAME = 'STORAGE_USERNAME';
const STORAGE_USERNAME_ID = 'STORAGE_USERNAME_ID';
const STORAGE_AUTH_KEY = 'STORAGE_AUTH_KEY';

function createRequestOptions(user) {
    return {
        username: user.username,
        password: CryptoJS.SHA1($(user.password).val()).toString(),
        address: user.address || undefined,
        email: user.email || undefined,
        phone: user.phone || undefined
    }
}

class UserModel {
    register(user) {
        let promise = new Promise((resolve, reject) => {
            let url = kinvey_URL + 'user/' + kinvey_APP_ID;
            let authBase64 = btoa(kinvey_APP_ID + ":" + kinvey_APP_SECRET);
            let headers = { Authorization: "Basic " + authBase64 };
            let data = createRequestOptions(user);
            let options = { headers, data };
            requester.post(url, options)
                .then(function(res) {
                    localStorage.setItem(STORAGE_USERNAME, res.username);
                    localStorage.setItem(STORAGE_USERNAME_ID, res._id);
                    localStorage.setItem(STORAGE_AUTH_KEY, res._kmd.authtoken);
                    resolve(res);
                }, function(err) {
                    reject(err.responseText);
                });
        });
        return promise;
    }

    login(user) {
        let promise = new Promise((resolve, reject) => {
            let url = kinvey_URL + 'user/' + kinvey_APP_ID + '/login';
            let authBase64 = btoa(kinvey_APP_ID + ":" + kinvey_APP_SECRET);
            let headers = { Authorization: "Basic " + authBase64 };
            let data = createRequestOptions(user);
            let options = { headers, data };
            requester.post(url, options)
                .then(function(res) {
                    localStorage.setItem(STORAGE_USERNAME, res.username);
                    localStorage.setItem(STORAGE_USERNAME_ID, res._id);
                    localStorage.setItem(STORAGE_AUTH_KEY, res._kmd.authtoken);
                    resolve(res);
                }, function(err) {
                    reject(err);
                });
            // .then(() => {
            //     $("#main-content").on("click", "#logOut", function() {
            //         $("#logOut").removeClass("hidden");
            //         $("#logIn").addClass("hidden");
            //     })
            // });
        });

        return promise;
    }


    logout() {
        let promise = new Promise((resolve, reject) => {
            let url = kinvey_URL + 'user/' + kinvey_APP_ID + '/_logout';
            let authBase64 = btoa(kinvey_APP_ID + ":" + kinvey_APP_SECRET);
            let headers = { Authorization: "Kinvey " + localStorage.getItem(STORAGE_AUTH_KEY) };
            let options = { headers };
            requester.post(url, options)
                .then(function(res) {
                    localStorage.clear();
                    notificator.success("Logout successfully");
                    resolve(res);
                }, function(err) {
                    notificator.error("Logout unsuccessfully");
                    reject(err);
                });
            // .then(() => {
            //     $("#main-content").on("click", "#logOut", function() {
            //         $(this).addClass("hidden");
            //         $("#logIn").removeClass("hidden");
            //     })
            // });
        });

        return promise;
    }
}

let userModel = new UserModel();
export { userModel };