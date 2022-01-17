const multer = require('multer');


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // console.log(file ,'fileFilrer')
        cb(null, 'public/profileImage')
    },
    filename: function (req, file, cb) {
        // console.log(file ,'fileFilrer')
        cb(null, Date.now() + file.originalname)
    },
})
let upload = multer(
    {

        fileFilter: (req, file, cb) => {
            const arr = ['jpeg', 'png',]
            const ext = file.mimetype.split('/')[1]
            if (arr.includes(ext)) {
                cb(null, true)
            } else {
                cb(new Error(`File Is Not Supported. Supported Files [jpeg, png]`), false);
                // cb(null, true)
            }
        },
        limits: { fileSize: 1024 * 1024 },
        storage: storage,
    });

module.exports.uploadMulti = upload.array('image');

module.exports.upload = upload.single('profile_image');

module.exports.multer = multer;


// .array(['image', 4]
// .fields([{ name: 'image', maxCount: 2 }]
// );

//for Single File
// .single('image');
// module.exports.upload = upload.single('image');


// module.exports = multer({
//     dest: 'upload/',
//     storage: multer.diskStorage,
//     fileFilter: (req, file, cb)=>{
//         if(file.mimetype.match(/jpg|jpeg|png|gif$i/)){
//             cb(new Error('File not supported'), false);    
//         } 

//         cb(null, true);
//     }
// });