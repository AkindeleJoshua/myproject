import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import pool from "../config/db";

// ─── Register ────────────────────────────────────────────────────────────────
export const registerUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      res.status(400).json({ message: "All fields are required" });
      return;
    }

    const [existing]: any = await pool.query(
      "SELECT id FROM users WHERE email = ?",
      [email]
    );
    if (existing.length > 0) {
      res.status(409).json({ message: "Email already registered" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const [result]: any = await pool.query(
      "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
      [username, email, hashedPassword]
    );

    res.status(201).json({
      message: "User registered successfully",
      userId: result.insertId,
    });
  } catch (error) {
    console.error("registerUser error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ─── Login ────────────────────────────────────────────────────────────────────
export const loginUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ message: "Email and password are required" });
      return;
    }

    const [rows]: any = await pool.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (rows.length === 0) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    const user = rows[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    // TODO: replace with JWT when ready
    res.status(200).json({
      message: "Login successful",
      userId: user.id,
      username: user.username,
    });
  } catch (error) {
    console.error("loginUser error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ─── Save Profile ─────────────────────────────────────────────────────────────
export const saveProfile = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { fullName, phone, address, department } = req.body;

    if (!fullName) {
      res.status(400).json({ message: "fullName is required" });
      return;
    }

    const userId = 1; // TODO: replace with real user id from JWT

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

    // Return full profile so frontend can update state directly
    res.status(200).json({ fullName, phone, address, department });
  } catch (error) {
    console.error("saveProfile error:", error);
    res.status(500).json({ message: "Server error" });
  }
};