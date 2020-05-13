import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
    destination: './server/config/public',
    filename(req, file, cb) {
        cb(null, `IMAGE-${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({
    storage
});


module.exports = upload;