import { Schema, model } from 'mongoose';

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    isAuthenticated: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    isBlocked: {
        type: Boolean,
        default: false
    },
    rank: {
        type: Number,
        default: 0
    },
    credits: {
        type: Number,
        default: 0
    },
    purchases: [{
        ticket: {
            type: Schema.Types.ObjectId,
            ref: 'ticket'
        },
        rank: {
            type: Number,
            default: 0
        }
    }],
    reports: [{
        complaint: {
            type: String,
        },
        byUser: {
            type: String,
        }
    }]
});

export default model('user', userSchema);
