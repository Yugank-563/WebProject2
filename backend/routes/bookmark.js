import express from "express";
import {
  toggleBookmark,
  checkBookmark,
  getAllBookmarks,
} from "../controllers/bookmarkController.js";

const router = express.Router();


router.post("/toggle", toggleBookmark);
router.get("/check/:userId/:postId", checkBookmark);
router.get("/:userId", getAllBookmarks);

export default router;
