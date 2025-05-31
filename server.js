
const express = require('express');
const genererVoix = require('./generer_voix');
const path = require('path');
const app = express();

app.use(express.json());
const PORT = 4000;

app.post('/generer-voix', async (req, res) => {
  const { texte } = req.body;
  if (!texte) return res.status(400).send("Texte manquant");

  try {
    const chemin = await genererVoix(texte);
    res.sendFile(path.resolve(chemin));
  } catch (err) {
    console.error("Erreur lors de la génération :", err);
    res.status(500).send("Erreur serveur");
  }
});

app.listen(PORT, () => {
  console.log(`Serveur voix lancé sur http://localhost:${PORT}`);
});
