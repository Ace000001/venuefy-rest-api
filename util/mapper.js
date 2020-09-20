// const handleNoImage = () => {
//     const error = new Error('No image provided');
//     error.statusCode = 422;
//     throw error;
// }

exports.mapVenue = (req, dest) => {
    dest.title = req.body.title;
    dest.imageUrl = req.body.imageUrl;
    if (req.file) {
        imageUrl = req.file.path;
    }
    if (!dest.imageUrl) {
        const error = new Error('No image provided');
        error.statusCode = 422;
        throw error;
    }
    dest.imageLibrary = [
        'https=//www.gstatic.com/webp/gallery/1.jpg',
        'https=//source.unsplash.com/1024x768/?woman',
        'https=//source.unsplash.com/1024x768/?ice',
        'https=//source.unsplash.com/1024x768/?hotel',
        'https=//source.unsplash.com/1024x768/?bar',
        'https=//source.unsplash.com/1024x768/?smoke',
        'https=//source.unsplash.com/1024x768/?summer',
        'https=//source.unsplash.com/1024x768/?winter',
        'https=//source.unsplash.com/1024x768/?autum',
        'https=//source.unsplash.com/1024x768/?spring',
        'https=//source.unsplash.com/1024x768/?girl',
        'https=//source.unsplash.com/1024x768/?tree',
        'https=//source.unsplash.com/1024x768/?water'
    ];
    dest.facilities = req.body.facilities;
    dest.pricePerHead = req.body.pricePerHead;
    dest.minOcc = req.body.minOcc;
    dest.maxOcc = req.body.maxOcc;
    dest.location = req.body.location;
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