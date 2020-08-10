import { sendConfirmationMail, sendConfirmationOfSaleMail } from '../api/MailAuth/MailAuth.service';

export const purchaseTicket = async (_id, sold, seller, userId, newcredit, totalPrice) => {
    await Ticket.find().where('_id').equals(_id).populate('concert')
        .then(result => {
            if (result) {
                func(result[0]);
            }
        });
    async function func(ticket) {
        try {
            const user = await User.findById(seller);
            const buyer = await User.findById(userId);
            if (user) {
                await sendConfirmationOfSaleMail(
                    user.email,
                    user.name,
                    ticket.concert.artist,
                    ticket.concert.time,
                    sold,
                    totalPrice,
                    buyer.name
                );
            }
            if (buyer) {
                await sendConfirmationMail(
                    buyer.email,
                    buyer.name,
                    ticket.concert.artist,
                    ticket.concert.time,
                    ticket.concert.location,
                    totalPrice,
                    sold
                );
            }
        } catch (error) {
            console.error(error.message);
            throw error;
        }
    }
    await User.findByIdAndUpdate(
        userId,
        {
            $push: {
                purchases: {
                    _id
                }
            },
            $set: {
                credits: newcredit
            }
        }
    );
    await User.updateOne(
        { _id: seller },
        {
            $inc: {
                credits: totalPrice
            }
        }
    );
    return Ticket.updateOne(
        { _id },
        {
            $set: {
                sold
            }
        }
    );
};