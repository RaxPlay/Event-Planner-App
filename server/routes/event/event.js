import { pool } from "../../config/db.js";
import { protect } from "../../middleware/protect.js";
import express from "express";

const eventRouter = express.Router();

eventRouter.post("/create-event", protect, async (req, res) => {
  try {
    const { event_name, description, event_date, event_time } = req.body;

    const newEvent = await pool.query(
      "INSERT INTO events(event_name, description, event_date, event_time, user_id) VALUES($1, $2, $3, $4, $5) RETURNING *",
      [event_name, description, event_date, event_time, req.user.id],
    );

    await pool.query(
      "UPDATE users SET event_count = event_count + 1 WHERE id = $1",
      [req.user.id],
    );

    res.status(201).json(newEvent.rows);
  } catch (error) {
    console.error(error);
  }
});

eventRouter.delete("/delete-event", protect, async (req, res) => {
  try {
    await pool.query(
      "UPDATE users SET event_count = event_count + 1 WHERE id = $1",
      [req.user.id],
    );

    await pool.query("DELETE FROM events WHERE user_id = $1", [req.user.id]);
  } catch (error) {
    console.error(error);
  }
});

export default eventRouter;
