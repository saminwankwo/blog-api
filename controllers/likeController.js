const Blog = require('../models/Blog');
const Like = require('../models/Like');

exports.addLike = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.blogId);

        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        const newLike = new Like({
            user: req.user.id,
            blog: blog.id
        });

        const like = await newLike.save();

        blog.likes.push(req.user.id);
        await blog.save();

        res.json(like);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.removeLike = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.blogId);

        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        const like = await Like.findOne({ user: req.user.id, blog: blog.id });

        if (!like) {
            return res.status(400).json({ message: 'You have not liked this blog' });
        }

        await like.remove();

        blog.likes = blog.likes.filter(id => id.toString() !== req.user.id.toString());
        await blog.save();

        res.json({ message: 'Like removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
