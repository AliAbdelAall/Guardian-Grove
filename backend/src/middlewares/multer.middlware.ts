import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "public/profile-pictures");
	},
	filename: (req, file, cb) => {
		const extname = path.extname(file.originalname);
		const filename =
			Date.now() + "-" + Math.round(Math.random() * 1e9) + extname;
		cb(null, filename);
	},
});
console.log();
const uploadImage = multer({
	storage: storage,
	limits: { fileSize: 5 * 1024 * 1024 },
	fileFilter: function (req, file, cb) {
		if (file.mimetype.startsWith("image/")) {
			cb(null, true);
		} else {
			cb(new Error("Only images are allowed"));
		}
	},
});

const multerMiddlware = uploadImage.single("image");

export default multerMiddlware;
