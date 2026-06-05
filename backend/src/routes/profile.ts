import { Router, Request, Response } from "express";
import pool from "../config/db";

const router = Router();

// GET /api/profile
router.get("/", async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = 1; // TODO: replace with JWT user id
    const [rows] = await pool.query<any[]>(
      "SELECT * FROM profiles WHERE user_id = ?",
      [userId]
    );
    res.json(rows[0] || {});
  } catch (err) {
    console.error("GET /profile error:", err);
    res.status(500).json({ message: "Failed to get profile" });
  }
});

// POST /api/profile  ← this is what your frontend calls
router.post("/", async (req: Request, res: Response): Promise<void> => {
  const { fullName, phone, address, department } = req.body;

  if (!fullName) {
    res.status(400).json({ message: "fullName is required" });
    return;
  }

  try {
    const userId = 1; // TODO: replace with JWT user id

    await pool.query(
      `INSERT INTO profiles (user_id, fullName, phone, address, department)
       VALUES (?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE
         fullName   = VALUES(fullName),
         phone      = VALUES(phone),
         address    = VALUES(address),
         department = VALUES(department)`,
      [userId, fullName, phone, address, department]
    );

    const [rows] = await pool.query<any[]>(
      "SELECT * FROM profiles WHERE user_id = ?",
      [userId]
    );

    res.status(200).json(rows[0]);
  } catch (err) {
    console.error("POST /profile error:", err);
    res.status(500).json({ message: "Failed to save profile" });
  }
});

// PUT /api/profile
router.put("/", async (req: Request, res: Response): Promise<void> => {
  const { fullName, phone, address, department } = req.body;

  try {
    const userId = 1; // TODO: replace with JWT user id

    await pool.query(
      `INSERT INTO profiles (user_id, fullName, phone, address, department)
       VALUES (?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE
         fullName   = VALUES(fullName),
         phone      = VALUES(phone),
         address    = VALUES(address),
         department = VALUES(department)`,
      [userId, fullName, phone, address, department]
    );

    const [rows] = await pool.query<any[]>(
      "SELECT * FROM profiles WHERE user_id = ?",
      [userId]
    );

    res.json(rows[0]);
  } catch (err) {
    console.error("PUT /profile error:", err);
    res.status(500).json({ message: "Failed to save profile" });
  }
});

export default router;