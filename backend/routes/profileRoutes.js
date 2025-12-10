const router = require('express').Router();
const auth = require('../middleware/authMiddleware');
const multer = require('multer');
const upload = multer({ dest:'uploads/' });
const { getProfile, updateProfile } = require('../controllers/profileController');

router.get('/', auth, getProfile);
router.put('/', auth, upload.single('avatar'), updateProfile);

module.exports = router;
