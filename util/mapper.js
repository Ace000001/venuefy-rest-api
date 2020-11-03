const fs = require('fs');
const path = require('path');

// const handleNoImage = () => {
//     const error = new Error('No image provided');
//     error.statusCode = 422;
//     throw error;
// }
const clearImage = filePath => {
    filePath = path.join(__dirname, '..', filePath);
    fs.unlink(filePath, err => console.log(err));
}

exports.mapVenue = (req, dest) => {
    const baseUrl = req.protocol + '://' + req.headers.host + '/';

    dest.title = req.body.title;
    const titleImage = req.files.filter(file => file.originalname === req.body.titleImage)[0];
    if (titleImage) {
        // dest.imageUrl = baseUrl + req.file.path;
        dest.imageUrl = baseUrl + titleImage.path;
    }
    if (!dest.imageUrl) {
        const error = new Error('No image provided');
        error.statusCode = 422;
        throw error;
    }
    const librarySchema = JSON.parse(req.body.library);
    //clear old images if a library input is deleted
    if (dest.imageLibrary.length > librarySchema.length) {
        dest.imageLibrary.forEach(lib => {
            const newImages = librarySchema.find(sc => sc.title === lib.title);
            if (!newImages)
                lib.images.forEach(img => {
                    clearImage(img.replace(baseUrl, ''));
                });
        });
    }
    //update existing images
    const imageLibrary = librarySchema.map((item, i) => {
        return {
            title: item.title,
            images: item.images.map((imgname, i) => {
                if (imgname.includes(baseUrl)) {
                    return imgname;
                }
                else {
                    const oldLibCat = dest.imageLibrary.find(lb => lb.title === item.title);
                    if (oldLibCat?.images[i])
                        clearImage(oldLibCat.images[i].replace(baseUrl, ''));
                    const newImageUrl = req.files.find(file => file.originalname === imgname).path;
                    return baseUrl + newImageUrl;
                }
            })
        }
    });
    dest.imageLibrary = imageLibrary;
    dest.facilities = JSON.parse(req.body.facilities);
    dest.pricePerHead = req.body.pricePerHead;
    dest.minOcc = req.body.minOcc;
    dest.maxOcc = req.body.maxOcc;
    dest.location = JSON.parse(req.body.location);
    dest.address = req.body.address;
    dest.contactNo = req.body.contactNo;
    dest.user = req.userId;
}

exports.mapUser = async (req, dest) => {
    dest.name = req.body.name;
    dest.email = req.body.email;
    dest.password = req.body.password;
    dest.role = 'user';
}