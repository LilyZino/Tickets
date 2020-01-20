const mongoose = require('mongoose');

const { Schema } = mongoose;

const MailAuthSchema = new Schema({
    userMail: {
        type: String,
    },
    uuid: {
        type: String
    },
});

export default mongoose.model('mailAuth', MailAuthSchema);
