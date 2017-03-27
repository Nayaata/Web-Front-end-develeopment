import { pageView } from '../view/page-viewer.js';
import { homeModel } from '../models/home-model.js';

class HomeController {

    home(context, selector) {
        // homeModel.getHomeData()
        //     .then((res) => {
        //         let data = {
        //             data: res[0]
        //         };
        //         return pageView.homePage(selector, data);
        //     }, (err) => {
        //         console.log(err);
        //     });
        return pageView.homePage(selector);
    }
    about(context, selector) {
        return pageView.about(selector);
    }
}

let homeController = new HomeController();
export { homeController };