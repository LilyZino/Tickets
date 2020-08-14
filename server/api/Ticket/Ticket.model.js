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
    description: {
        type: String
    },
    isPhysical: {
        type: Boolean,
        required: true
    },
    isSold: {
        type: Boolean,
        default: false
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
