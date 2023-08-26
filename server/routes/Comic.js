import { Router } from "express";
import {
  getAllComic,
  getComicById,
  createComic,
  updateComic,
  deleteComic,
} from "../controllers/Comic.js";

const router = Router();

router.get("/", getAllComic);
router.get("/:id", getComicById);
router.post("/create", createComic);
router.put("/update/:id", updateComic);
router.delete("/delete/:id", deleteComic);

export default router;
