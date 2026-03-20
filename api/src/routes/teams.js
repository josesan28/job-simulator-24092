const express = require("express");
const router = express.Router();
const pool = require("../config/db");

router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM teams");
    const rows = result.rows.map(r => ({
      id: r.id,
      campo1: r.name,
      campo2: r.city,
      campo3: r.conference,
      campo4: r.championships,
      campo5: r.win_rate,
      campo6: r.is_champion
    }));
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM teams WHERE id = $1", [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: "Not found" });
    const r = result.rows[0];
    res.json({
      id: r.id,
      campo1: r.name,
      campo2: r.city,
      campo3: r.conference,
      campo4: r.championships,
      campo5: r.win_rate,
      campo6: r.is_champion
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/", async (req, res) => {
  const { campo1, campo2, campo3, campo4, campo5, campo6 } = req.body;

  if (
    campo1 === undefined || campo2 === undefined || campo3 === undefined ||
    campo4 === undefined || campo5 === undefined || campo6 === undefined
  ) {
    return res.status(422).json({ error: "All fields are required" });
  }

  if (typeof campo1 !== "string" || typeof campo2 !== "string" || typeof campo3 !== "string") {
    return res.status(422).json({ error: "campo1, campo2 and campo3 must be strings" });
  }

  if (!Number.isInteger(campo4)) {
    return res.status(422).json({ error: "campo4 must be an integer" });
  }

  if (typeof campo5 !== "number") {
    return res.status(422).json({ error: "campo5 must be a float" });
  }

  if (typeof campo6 !== "boolean") {
    return res.status(422).json({ error: "campo6 must be a boolean" });
  }

  try {
    const result = await pool.query(
      "INSERT INTO teams (name, city, conference, championships, win_rate, is_champion) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [campo1, campo2, campo3, campo4, campo5, campo6]
    );
    const r = result.rows[0];
    res.status(201).json({
      id: r.id,
      campo1: r.name,
      campo2: r.city,
      campo3: r.conference,
      campo4: r.championships,
      campo5: r.win_rate,
      campo6: r.is_champion
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/:id", async (req, res) => {
  const { campo1, campo2, campo3, campo4, campo5, campo6 } = req.body;

  if (
    campo1 === undefined || campo2 === undefined || campo3 === undefined ||
    campo4 === undefined || campo5 === undefined || campo6 === undefined
  ) {
    return res.status(422).json({ error: "All fields are required" });
  }

  if (typeof campo1 !== "string" || typeof campo2 !== "string" || typeof campo3 !== "string") {
    return res.status(422).json({ error: "campo1, campo2 and campo3 must be strings" });
  }

  if (!Number.isInteger(campo4)) {
    return res.status(422).json({ error: "campo4 must be an integer" });
  }

  if (typeof campo5 !== "number") {
    return res.status(422).json({ error: "campo5 must be a float" });
  }

  if (typeof campo6 !== "boolean") {
    return res.status(422).json({ error: "campo6 must be a boolean" });
  }

  try {
    const result = await pool.query(
      "UPDATE teams SET name=$1, city=$2, conference=$3, championships=$4, win_rate=$5, is_champion=$6 WHERE id=$7 RETURNING *",
      [campo1, campo2, campo3, campo4, campo5, campo6, req.params.id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: "Not found" });
    const r = result.rows[0];
    res.json({
      id: r.id,
      campo1: r.name,
      campo2: r.city,
      campo3: r.conference,
      campo4: r.championships,
      campo5: r.win_rate,
      campo6: r.is_champion
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const result = await pool.query("DELETE FROM teams WHERE id=$1 RETURNING *", [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: "Not found" });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;