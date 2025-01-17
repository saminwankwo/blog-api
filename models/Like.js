const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const likeSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    blog: { type: Schema.Types.ObjectId, ref: 'Blog', required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Like', likeSchema);
