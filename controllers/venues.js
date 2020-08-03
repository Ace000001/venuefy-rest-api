const { validationResult } = require('express-validator/check');

exports.getVenues = (req, res, next) => {
    res.status(200).json({
        venues: [{
            _id: 'v1',
            ownerId: 'u1',
            title: 'The Paradise Banquet Hall',
            imageUrl: 'https://source.unsplash.com/dS2hi__ZZMk/840x840',
            imageLibrary: [
                'https://www.gstatic.com/webp/gallery/1.jpg',
                'https://source.unsplash.com/1024x768/?woman',
                'https://source.unsplash.com/1024x768/?ice',
                'https://source.unsplash.com/1024x768/?hotel',
                'https://source.unsplash.com/1024x768/?bar',
                'https://source.unsplash.com/1024x768/?smoke',
                'https://source.unsplash.com/1024x768/?summer',
                'https://source.unsplash.com/1024x768/?winter',
                'https://source.unsplash.com/1024x768/?autum',
                'https://source.unsplash.com/1024x768/?spring',
                'https://source.unsplash.com/1024x768/?girl',
                'https://source.unsplash.com/1024x768/?tree',
                'https://source.unsplash.com/1024x768/?water'
            ],
            facilities: [
                { name: 'energy', type: 'simple-line-icon', text: 'Gym' },
                { name: 'air', type: 'entypo', text: 'AC' },
                { name: 'tree', type: 'font-awesome', text: 'Park' },
                { name: 'car', type: 'font-awesome-5', text: 'Transportation' },
                { name: 'food', type: 'material-community', text: 'Meal' },
                { name: 'check', type: 'feather', text: 'Bridel Room' },
                { name: 'pool', type: 'material-icon', text: 'Pool' }
            ],
            pricePerHead: '500',
            minOcc: '50',
            maxOcc: '250',
            location: { latitude: 31.383859, longitude: 74.173177 },
            address: '406-E, Canal Gardens, Lahore, Pakistan',
            contactNo: '+923314018408'
        }],
    });
};

exports.createVenue = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            message: 'Valisation failed, entered data is incorrect.',
            errors: errors.array()
        })
    }
    const title = req.body.title;
    //create venue in db
    res.status(201).json({
        message: "venue added successfully!",
        venue: { title: "First Request" },
    });
};
