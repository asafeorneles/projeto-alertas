const path = require('path');
const multer = require('multer');
const fs = require('fs');

const uploadDir = path.join(__dirname, '..', 'uploads');

// Cria a pasta se não existir
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['.jpg', '.jpeg', '.png', '.mp4'];
    const extname = path.extname(file.originalname).toLowerCase();
    allowedTypes.includes(extname) 
      ? cb(null, true)
      : cb(new Error('Apenas imagens (JPEG, PNG) e vídeos (MP4) são permitidos!'));
  }
});

module.exports = upload;