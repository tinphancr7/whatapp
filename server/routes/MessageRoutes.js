import {Router} from "express";
import {
	addMessage,
	getInitialContactsWithMessages,
	getMessages,
} from "../controllers/MessageController.js";

const router = Router();
router.post("/add-message", addMessage);
router.get("/get-messages/:from/:to", getMessages);
router.get("/get-initial-contacts/:from", getInitialContactsWithMessages);
export default router;
