const fs = require('fs');
const path = require('path');
const https = require('https');

/**
 * Génère un fichier MP3 à partir d'un texte en appelant OpenTTS.
 * @param {string} texte - Le texte à convertir en voix.
 * @returns {Promise<string>} - Le chemin du fichier MP3 généré.
 */
async function genererVoix(texte) {
  return new Promise((resolve, reject) => {
    const url = `https://open-tts.duckdns.org/api/tts?lang=fr&voice=fr_mai&text=${encodeURIComponent(texte)}`;
    const fichierSortie = path.join(__dirname, 'voix.mp3');
    const fichier = fs.createWriteStream(fichierSortie);

    https.get(url, (res) => {
      if (res.statusCode !== 200) {
        return reject(new Error(`Erreur HTTP : ${res.statusCode}`));
      }

      res.pipe(fichier);
      fichier.on('finish', () => {
        fichier.close(() => resolve(fichierSortie));
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

module.exports = genererVoix;
