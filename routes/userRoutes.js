const express = require('express');
const { follow, unfollow } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/follow/:id', authMiddleware, follow);
router.post('/unfollow/:id', authMiddleware, unfollow);

module.exports = router;
