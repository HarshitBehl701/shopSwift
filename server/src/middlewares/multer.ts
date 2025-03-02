import { Request, Response, NextFunction } from "express";
import multer, { MulterError } from "multer";
import path from "path";
import fs from "fs";
import { getStoragePathOfServer, responseStructure } from "../utils/commonHelpers";

const storagePath  = getStoragePathOfServer();

// Ensure all directories exist
Object.values(storagePath).forEach((dir) => {
  const fullPath = path.join(process.cwd(), dir);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
  }
});

// Function to create multer instance dynamically
const getMulterInstance = (storageKey: string) => {
  const uploadDir = storagePath[storageKey];
  if (!uploadDir) throw new Error("Invalid storage key provided");

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(process.cwd(), uploadDir));
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      const fileName = `${uniqueSuffix}${path.extname(file.originalname)}`;
      if (!(req as any).filesName) {
        (req as any).filesName = [];
      }
      (req as any).filesName.push(fileName);
      cb(null, fileName);
    },
  });

  return multer({
    storage,
    limits: { fileSize: 2 * 1024 * 1024 }, // 2MB limit
    fileFilter: (req, file, cb) => {
      const fileTypes = /jpeg|jpg|png/;
      const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
      const mimeType = fileTypes.test(file.mimetype);
      if (extName && mimeType) {
        cb(null, true);
      } else {
        cb(new Error("Only JPEG, JPG, and PNG formats are allowed!"));
      }
    },
  });
};

// Middleware to handle errors
const handleMulterError = (err: any, req: Request, res: Response, next: NextFunction): void => {
  if (err instanceof MulterError) {
    res.status(400).json(responseStructure(false,err.message));
  } else if (err instanceof Error) {
    res.status(400).json(responseStructure(false,err.message));
  } else {
    next();
  }
};

// Wrapper function for dynamic multer usage
const upload = (fieldName: string, options: { storage: string, multiple?: boolean, maxCount?: number }) => {
  const multerInstance = getMulterInstance(options.storage);
  return (req: Request, res: Response, next: NextFunction) => {
    const uploadMiddleware = options.multiple
      ? multerInstance.array(fieldName, options.maxCount || 5)
      : multerInstance.single(fieldName);
    uploadMiddleware(req, res, (err) => {
      if (!(req as any).filesName) {
        (req as any).filesName = [];
      }
      if (req.file) {
        (req as any).filesName.push(req.file.filename);
      }
      if (req.files && Array.isArray(req.files)) {
        req.files.forEach((file: Express.Multer.File) => {
          (req as any).filesName.push(file.filename);
        });
      }
      next(err);
    });
  };
};

export { upload, handleMulterError };

// use :  upload("images", { storage: "user", multiple: true, maxCount: 5 })