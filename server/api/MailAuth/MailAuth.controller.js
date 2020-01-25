import MailAuth from './MailAuth.model';
import { setUserAuthenticated } from '../User/User.service';

export const verifyCode = async (req, res) => {
    const mailAuth = await MailAuth.findOne().where('userMail').equals(req.params.userMail);
    console.log(mailAuth);
    if (mailAuth.uuid === req.params.uuid) {
        await MailAuth.deleteOne(mailAuth);
        await setUserAuthenticated(req.params.userMail);
        res.send('Your user was authenticated successfully! enjoy Tickets');
    } else {
        res.send('Authentication link is incorrect, please address our support');
    }
};