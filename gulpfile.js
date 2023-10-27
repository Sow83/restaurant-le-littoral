const { src, dest, series, parallel } = require('gulp')
const uglify = require('gulp-uglify')
const htmlmin = require('gulp-htmlmin')
const gulpCopy = require('gulp-copy')
const fs = require('fs-extra')
const changed = require('gulp-changed')
const newer = require('gulp-newer')
const replace = require('gulp-replace')
const path = require('path')


// Ce code minifiera le fichier JavaScript puis l'enregistre dans le dossier "build/js"
function minifyJs() {
  return src(['src/js/*.js', 'src/sass/vendors/aos/*.js'])
    .pipe(newer('build/js')) // Ne traite que les fichiers modifiés, newer regarde s'il ya un changement 
    .pipe(uglify()) // Minifie le fichier js
    .pipe(dest('build/js'));
}
exports.minifyJs = minifyJs


// Minifie le code HTML et remplace le chemin du script pour aos.js
function minifyHtml() {
  return src('src/*.html')
    .pipe(newer('build')) // Ne traite que les fichiers modifiés
    .pipe(htmlmin({
      collapseWhitespace: true, // Supprime les espaces blancs
      removeComments: true, // Supprime les commentaires
    }))
    .pipe(replace('src="sass/vendors/aos/aos.js"', 'src="js/aos.js"'))
    .pipe(dest('build'));
}
exports.minifyHtml = minifyHtml

// Copie le fichier CSS prefixé dans le dossier "build"
function copyFileCssPrefixed() {
  return src('src/public/css/prefixed/style.css')
    .pipe(newer('build/public/css')) // Ne traite que les fichiers modifiés
    .pipe(gulpCopy('build/public/css', { prefix: 4 })) // "prefix" définit combien de parties du chemin src (séparées par /) doivent être supprimées du chemin d'origine. Donc à la sortie on aura: build/public/css/style.css
}
exports.copyFileCssPrefixed = copyFileCssPrefixed


/* Le code utilise une approche asynchrone pour charger le module gulp-imagemin. 
Cette approche est nécessaire car gulp-imagemin est désormais un module ES (ECMAScript)
et ne peut pas être importé directement avec require dans un module CommonJS.*/
let imagemin = null;

const imageMinify = series(
  async () => {
    imagemin = await import('gulp-imagemin');
  },
  () => src('src/public/images/**/*') // Chemin vers les images sources en dossier et sous dossier
      .pipe(changed('build/public/images')) //vérifie si les fichiers source ont été modifiés depuis la dernière exécution de la tâche
      .pipe(imagemin.default()) //compresse les images
      .pipe(dest('build/public/images'))
);

exports.imageMinify = imageMinify;


// Tâche pour vider le dossier 'dist' avec la copie du fichier .htaccess dans le dossier "build"
function cleanBuild(cb) {

  // Supprime tous les fichiers et dossiers du dossier "dist"
  fs.emptyDirSync('build');

  // Copiez le fichier .htaccess dans le dossier "dist"
  if (fs.existsSync('.htaccess')) {
    fs.copyFileSync('.htaccess', path.join('build', '.htaccess'));
  }
  cb()
}
exports.cleanBuild = cleanBuild;




exports.build = series(cleanBuild, parallel(minifyHtml, minifyJs, copyFileCssPrefixed, imageMinify));



//NB: "Gulp build" exécute gulp
