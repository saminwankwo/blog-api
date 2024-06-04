const User = require('../models/User');

exports.follow = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        const userToFollow = await User.findById(req.params.id);

        if (!userToFollow) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.following.includes(userToFollow.id)) {
            return res.status(400).json({ message: 'You are already following this user' });
        }

        user.following.push(userToFollow.id);
        userToFollow.followers.push(user.id);

        await user.save();
        await userToFollow.save();

        res.json({ message: 'User followed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.unfollow = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        const userToUnfollow = await User.findById(req.params.id);

        if (!userToUnfollow) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (!user.following.includes(userToUnfollow.id)) {
            return res.status(400).json({ message: 'You are not following this user' });
        }

        user.following = user.following.filter(id => id.toString() !== userToUnfollow.id.toString());
        userToUnfollow.followers = userToUnfollow.followers.filter(id => id.toString() !== user.id.toString());

        await user.save();
        await userToUnfollow.save();

        res.json({ message: 'User unfollowed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
