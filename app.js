const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');

const venuesRoutes = require('./routes/venues');
const authRoutes = require('./routes/auth');

const app = express();

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images');
    },
    filename: (req, file, cb) => {
        cb(null, `${new Date().toISOString().replace(/[\/\\:]/g, "_")}_${file.originalname}`)
    }
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg')
        cb(null, true)
    else
        cb(null, false)
}


// let imageConfigs = [];
// imageConfigs.push({name:'image', maxCount:1});

app.use(bodyParser.json());
app.use('/images', express.static(path.join(__dirname, 'images')));

// app.use(multer({ storage: fileStorage, fileFilter: fileFilter }).single('image'));
// multi image upload based on dynamic liberary input
// app.use((req, res, next) => {
//     if (req.body.liberary) {
//         const liberaryTitles = JSON.parse(req.body.liberary);
//         liberaryTitles.map((item, index) => {
//             imageConfigs.push({name:item.title.replace(' ', '').toLowerCase(), maxCount:100});
//         });
//     }
//     app.use(multer({ storage: fileStorage, fileFilter: fileFilter }).fields(imageConfigs));
//     next();
// });
app.use(multer({ storage: fileStorage, fileFilter: fileFilter }).array('venueImage', 100));


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Accept');
    next();
});

app.use(venuesRoutes);
app.use(authRoutes);

app.use((error, req, res, next) => {
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data });
});

mongoose
    .connect(
        'mongodb+srv://db-user:word2pass@venuefy.mmkeq.mongodb.net/venuefy?retryWrites=true&w=majority'
    ).then(result => {
        app.listen(8080);
    })
    .catch(error => {
        console.log(error);
    });