const express = require('express');
const { createBlog, getBlogs, getBlog } = require('../controllers/blogController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', authMiddleware, createBlog);
router.get('/', getBlogs);
router.get('/:id', getBlog);

module.exports = router;
