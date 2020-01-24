const mongoose = require('mongoose');

const { Schema } = mongoose;

const ConcertSchema = new Schema({
    artist: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    time: {
        type: Date,
        required: true
    },
});

export default mongoose.model('concert', ConcertSchema);
