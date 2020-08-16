import { sendConfirmationMail, sendConfirmationOfSaleMail } from '../api/MailAuth/MailAuth.service';
import Ticket from '../api/Ticket/Ticket.model';
import User from '../api/User/user.model';

export const purchaseTicket = async (_id, userId) => {
    const ticketId = _id;
    const buyerId = userId;
    const ticket = await Ticket.findById(_id).populate('user').populate('concert');
    const buyer = await User.findById(userId);

    try {
        // decrcease buyer credits & add to his purchases
        await User.findByIdAndUpdate(
            buyerId,
            {
                $push: {
                    purchases: {
                        ticket: {
                            _id
                        }
                    }
                },
                $inc: {
                    credits: (ticket.price * -1)
                }
            }
        );

        // update seller credit (add ticket price to seller credit)
        await User.updateOne(
            { _id: ticket.user._id },
            {
                $inc: {
                    credits: ticket.price
                }
            }
        );

        // mark ticket as sold
        await Ticket.updateOne(
            { _id: ticketId },
            {
                $set: {
                    isSold: true
                }
            }
        );

        if (ticket.user) {
            await sendConfirmationOfSaleMail(
                ticket.user.email,
                ticket.user.name,
                ticket.concert.artist,
                ticket.concert.time,
                ticket.amount,
                ticket.price,
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
                ticket.price,
                ticket.amount
            );
        }
    } catch (error) {
        console.error(error.message);
        throw error;
    }
};