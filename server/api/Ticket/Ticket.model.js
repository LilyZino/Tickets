const mongoose = require('mongoose');

const { Schema } = mongoose;

const TicketSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    concert: {
        type: Schema.Types.ObjectId,
        ref: 'concert'
    },
    price: {
        type: Number,
        required: true
    },
    isSold: {
        type: Boolean,
        default: false,
    },
    amount: {
        type: Number,
        required: true
    }
});

export default mongoose.model('ticket', TicketSchema);
