import { pageView } from '../view/page-viewer.js';
import { coursesModel } from '../models/courses-model.js';

class CoursesController {

    courses(context, selector) {
        coursesModel.getAllCourses()
            .then((res) => {
                let data = {
                    courses: res
                };
                return pageView.courses(selector, data);
            }, (err) => {
                console.log(err);
            });
    }
}

let coursesController = new CoursesController();
export { coursesController };