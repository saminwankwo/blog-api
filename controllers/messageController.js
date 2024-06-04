const Message = require('../models/Message');

exports.sendMessage = async (req, res) => {
    const { content, receiverId } = req.body;

    try {
        const newMessage = new Message({
            content,
            sender: req.user.id,
            receiver: receiverId
        });

        const message = await newMessage.save();

        res.json(message);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.getMessages = async (req, res) => {
    try {
        const messages = await Message.find({
            $or: [
                { sender: req.user.id, receiver: req.params.userId },
                { sender: req.params.userId, receiver: req.user.id }
            ]
        }).populate('sender', 'username').populate('receiver', 'username');

        res.json(messages);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
