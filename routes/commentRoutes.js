const express = require('express');
const { addComment, getComments } = require('../controllers/commentController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/:blogId', authMiddleware, addComment);
router.get('/:blogId', getComments);

module.exports = router;
