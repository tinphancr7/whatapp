import {Router} from "express";
import {
	addImageMessage,
	addMessage,
	addMessage,
	getInitialContactsWithMessages,
	getMessages,
} from "../controllers/MessageController.js";

const router = Router();
const uploadImage = multer({dest: "uploads/images"});
router.post("/add-message", addMessage);
router.get("/get-messages/:from/:to", getMessages);
router.post("/add-image-message", uploadImage.single("image"), addImageMessage);
router.get("/get-initial-contacts/:from", getInitialContactsWithMessages);
export default router;
