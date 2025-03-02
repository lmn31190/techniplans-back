import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Connexion à MongoDB
mongoose.connect(process.env.MONGO_URI, {
}).then(() => console.log("MongoDB connecté"))
  .catch(err => console.error("Erreur de connexion à MongoDB :", err));

  const RealisationSchema = new mongoose.Schema({
    title: String,
    imageUrl: String,
    description: String,
    client: String,
    location: String,
    services: [String],
    date: { type: Date, default: Date.now },
    gallery: [String], // Ajout du champ gallery
  });
  

const Realisation = mongoose.model("Realisation", RealisationSchema);

// Route pour récupérer toutes les réalisations
app.get("/api/realisations", async (req, res) => {
  try {
    const realisations = await Realisation.find();
    res.json(realisations);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// Route pour récupérer une réalisation par ID
app.get("/api/realisations/:id", async (req, res) => {
  try {
    const realisation = await Realisation.findById(req.params.id);
    res.json(realisation);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// Lancement du serveur
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Serveur Running on Port ${PORT}`));
