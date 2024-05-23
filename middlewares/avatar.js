import path from "node:path";
import crypto from "node:crypto";
import multer from "multer";
import Jimp from "jimp";
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, path.resolve("tmp"));
  },
  filename(req, file, cb) {
    const extname = path.extname(file.originalname);
    const basename = path.basename(file.originalname, extname);
    const suffix = crypto.randomUUID();

    cb(null, `${basename}-${suffix}${extname}`);
  },
});
const uploadAvatarMiddleware = multer({ storage });

const optimizeAvatarMiddleware = async (req, res, next) => {
  try {
    const avatar = await Jimp.read(req.file.path);
    avatar.resize(250, 250).quality(60).write(req.file.path);
    next();
  } catch (error) {
    next(error);
  }
};
export { uploadAvatarMiddleware, optimizeAvatarMiddleware };
