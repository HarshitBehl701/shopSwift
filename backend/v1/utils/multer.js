const multer = require("multer");

// Configure storage with both buffer and disk storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const userType = req.userType;
    let storagePath = "../frontend/public/uploads/other";

    if (userType === "seller") storagePath = "../frontend/public/uploads/brandLogo";
    else if (userType === "user") storagePath = "../frontend/public/uploads/profilePic";

    cb(null, storagePath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const storedFileName = `${file.fieldname}-${uniqueSuffix}.${file.originalname.split(".").pop()}`;
    cb(null, storedFileName);
    req.storedFileName = storedFileName;
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type. Only JPEG, PNG, and JPG are allowed!"), false);
  }
};

const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2 MB limit
  fileFilter,
});

// Middleware to handle Multer errors
const handleMulterErrors = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    // Handle Multer-specific errors
    return res.status(400).json({ error: `Multer error: ${err.message}` });
  } else if (err) {
    // Handle custom file filter or other errors
    return res.status(400).json({ error: err.message });
  }
  next();
};

module.exports = {
  upload,
  handleMulterErrors,
};