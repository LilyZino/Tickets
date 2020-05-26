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
    amount: {
        type: Number,
        required: true
    },
    sold: {
        type: Number
    },
    upForExchange: {
        type: Boolean,
        required: true
    },
    file: {
        type: String
    },
    image: {
        type: String
    },
    upForExchange: {
        type: Boolean,
        default: false
    }
});

export default mongoose.model('ticket', TicketSchema);
