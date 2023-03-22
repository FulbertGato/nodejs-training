import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
    res.json({
        message: "Bienvenue sur l'API de test de NodeJS",
        version: "1.0.0",
        author: "Gato Junior"
    });
});

export default router;