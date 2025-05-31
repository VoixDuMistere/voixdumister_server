const fs = require('fs');
const path = require('path');

/**
 * Simule la génération de voix en créant un fichier audio factice.
 * @param {string} texte - Le texte à convertir en voix.
 * @returns {Promise<string>} - Le chemin du fichier audio généré.
 */
async function genererVoix(texte) {
  const chemin = path.join(__dirname, 'test.mp3');
  const contenuFictif = Buffer.from('FAKE AUDIO', 'utf-8');
  fs.writeFileSync(chemin, contenuFictif);
  return chemin;
}

module.exports = genererVoix;
