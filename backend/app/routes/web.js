import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
  res.render("welcome", { auth: "Đỗ Nguyên Giáp" });
});

export default router;
