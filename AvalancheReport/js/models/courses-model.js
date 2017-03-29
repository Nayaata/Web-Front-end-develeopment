import { requester } from '../helpers/requester.js';

const kinvey_APP_ID = 'kid_Hy6KS9Bnl';
const kinvey_APP_SECRET = 'b29f8628042140ca87b41da18c3ea552';
const kinvey_MASTER_SECRET = 'b44dcc3c1fd145b089de0cf9b8bbdf0c';
const kinvey_URL = 'https://baas.kinvey.com/';

class CoursesModel {
    getAllCourses() {
        let promise = new Promise((resolve, reject) => {
            let url = kinvey_URL + 'appdata/' + kinvey_APP_ID + '/courses';
            let authBase64 = btoa(kinvey_APP_ID + ":" + kinvey_MASTER_SECRET);
            let headers = { Authorization: "Basic " + authBase64 };
            let options = { headers };
            requester.get(url, options)
                .then((res) => {
                    resolve(res);
                }, (err) => {
                    reject(err);
                });
        });
        return promise;
    }
}

let coursesModel = new CoursesModel();
export { coursesModel };