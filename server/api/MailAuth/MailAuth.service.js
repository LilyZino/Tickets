import mailjet from 'node-mailjet';
import uuid from 'uuid/v4';
import MailAuth from './MailAuth.model';

export const sendAuthenticationMail = async (userMail, userFullName) => {
    const userUuid = uuid();
    const serverLink = `http://${process.env.SERVER_HOST}:${process.env.HOST_PORT}/api/mailAuth/verify/${userMail}/${userUuid}`;
    const mailTemplate = `<h2>Hi ${userFullName}</h2>
    We are very glad that you joined us. <br/>
    Please click <a href='${serverLink}'>here</a> to complete your registration<br/>
    <br/>
    Tickets App Team`;

    const mailjetHost = mailjet
        .connect('187b0a32d7380a84deaeb1ded861eb68', 'e02c897e8da191f92fbb6d61393972a1');

    try {
        const result = await mailjetHost
            .post('send', { version: 'v3.1' })
            .request({
                Messages: [
                    {
                        From: {
                            Email: 'shakedh100@cs.colman.ac.il',
                            Name: 'Tickets App'
                        },
                        To: [
                            {
                                Email: userMail,
                                Name: userFullName
                            }
                        ],
                        Subject: 'Hello and welcome to Tickets!',
                        HTMLPart: mailTemplate
                    }
                ]
            });

        console.log(result.body);

        const newMailAuth = new MailAuth({
            userMail,
            uuid: userUuid
        });

        await newMailAuth.save();
    } catch (error) {
        console.log(error.statusCode);
    }
};

export const sendConfirmationMail = async (userMail, userFullName, artist, time, location, price, amount) => {
    const userUuid = uuid();
    const mailTemplate = `<h2>Hi ${userFullName}</h2>
    Thank you so much for your purchase <br/>
    Here is your ticket for <b>${artist}</b> <br/>
    date: ${time} <br/>
    location: ${location} <br/>
    amount: ${amount} tickets <br/>
    price: ${price} ₪ <br/>
    <br/>
    Enjoy!<br/>
    Tickets App Team`;

    const mailjetHost = mailjet
        .connect('187b0a32d7380a84deaeb1ded861eb68', 'e02c897e8da191f92fbb6d61393972a1');
    try {
        const result = await mailjetHost
            .post('send', { version: 'v3.1' })
            .request({
                Messages: [
                    {
                        From: {
                            Email: 'shakedh100@cs.colman.ac.il',
                            Name: 'Tickets App'
                        },
                        To: [
                            {
                                Email: userMail,
                                Name: userFullName
                            }
                        ],
                        Subject: 'Here is your new ticket!',
                        HTMLPart: mailTemplate
                    }
                ]
            });

        console.log(result.body);

        const newMailAuth = new MailAuth({
            userMail,
            uuid: userUuid
        });

        await newMailAuth.save();
    } catch (error) {
        console.log(error.statusCode);
    }
};

export const sendConfirmationOfSaleMail = async (userMail, userFullName, artist, time, amount, price, user) => {
    const userUuid = uuid();
    const mailTemplate = `<h2>Hi ${userFullName}</h2>
    Your ticket has been sold! Hooray! <br/>
    <b>${amount} tickets for ${artist} on ${time}, bought by ${user}</b><br/>
    You received ${price}₪ in credits</br>
    <br/>
    Tickets App Team`;

    const mailjetHost = mailjet
        .connect('187b0a32d7380a84deaeb1ded861eb68', 'e02c897e8da191f92fbb6d61393972a1');

    try {
        const result = await mailjetHost
            .post('send', { version: 'v3.1' })
            .request({
                Messages: [
                    {
                        From: {
                            Email: 'shakedh100@cs.colman.ac.il',
                            Name: 'Tickets App'
                        },
                        To: [
                            {
                                Email: userMail,
                                Name: userFullName
                            }
                        ],
                        Subject: 'Ticket has been sold',
                        HTMLPart: mailTemplate
                    }
                ]
            });

        console.log(result.body);

        const newMailAuth = new MailAuth({
            userMail,
            uuid: userUuid
        });

        await newMailAuth.save();
    } catch (error) {
        console.log(error.statusCode);
    }
};