const Comment = require('../models/Comment');
const Blog = require('../models/Blog');

exports.addComment = async (req, res) => {
    const { content } = req.body;

    try {
        const blog = await Blog.findById(req.params.blogId);

        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        const newComment = new Comment({
            content,
            author: req.user.id,
            blog: blog.id
        });

        const comment = await newComment.save();

        blog.comments.push(comment.id);
        await blog.save();

        res.json(comment);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.getComments = async (req, res) => {
    try {
        const comments = await Comment.find({ blog: req.params.blogId }).populate('author', 'username');
        res.json(comments);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
