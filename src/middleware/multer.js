const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const dir = "./uploads";
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
        cb(null, dir);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

// Define which field should be treated as a file
const upload = multer({ 
    storage: storage,
    fileField: 'images' // Assuming 'images' is the field in your form data for file uploads
});

module.exports = upload;
