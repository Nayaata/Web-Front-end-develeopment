import { pageView } from '../view/page-viewer.js';
import { imagesModel } from '../models/images-model.js';

class ImagesController {

    images(context, selector) {
        imagesModel.getAllImages()
            .then((res) => {
                let data = {
                    images: res
                };
                return pageView.images(selector, data);
            }, (err) => {
                console.log(err);
            });
    }
}

let imagesController = new ImagesController();
export { imagesController };