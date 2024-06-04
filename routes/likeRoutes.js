const express = require('express');
const { addLike, removeLike } = require('../controllers/likeController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/:blogId', authMiddleware, addLike);
router.delete('/:blogId', authMiddleware, removeLike);

module.exports = router;
