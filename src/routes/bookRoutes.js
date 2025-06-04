import express from "express";
import {
  save,
  list,
  upload,
  recentBooks,
  getUsersBooks,
  deleteBook,
  updateBook,
  bookBought,
  toggleFavorite,
  getFavorite,
} from "../controllers/bookController.js";

const router = express.Router();

router.post("/save/:id", upload.single("image"), save);
router.get("/books", list);
router.get("/recent", recentBooks);
router.get("/books-user/:id", getUsersBooks);
router.delete("/delete/:id", deleteBook);
router.put("/update/:id", upload.single("image"), updateBook);
router.put("/bought/:id", bookBought);
router.post("/favorites/:id", toggleFavorite);
router.get("/list/:id", getFavorite);

export default router;
