const multer = require('multer');

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {

    const  userType  =  req.userType;
    let storagePath = '../frontend/public/uploads/other';

    if(userType ==  'seller') storagePath = '../frontend/public/uploads/brandLogo';
    else if(userType  == 'user') storagePath = '../frontend/public/uploads/profilePic';

    cb(null, storagePath);
  },
  filename: async  (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const storedFileName  =`${file.fieldname}-${uniqueSuffix}.${file.originalname.split('.').pop()}`;
    cb(null, storedFileName);
    req.storedFileName  = storedFileName;
  }
});

// File filter for image types
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only JPEG, PNG, and JPG are allowed!'), false);
  }
};

// Multer instance
const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2 MB limit
  fileFilter
});

module.exports.upload = upload;