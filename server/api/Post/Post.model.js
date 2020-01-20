const mongoose = require('mongoose');

const { Schema } = mongoose;

const PostSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    title: {
        type: String
    },
    text: {
        type: String,
        required: true
    },
    artist: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now,
        required: true
    },
    isSold: {
        type: Boolean,
        default: false,
    },
    count: {
        type: Number,
        required: true
    }
});

export default mongoose.model('post', PostSchema);
