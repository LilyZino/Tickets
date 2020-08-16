import mailjet from 'node-mailjet';
import uuid from 'uuid/v4';
import MailAuth from './MailAuth.model';
import moment from 'moment';

export const sendAuthenticationMail = async (userMail, userFullName) => {
    const userUuid = uuid();
    const serverLink = `http://${process.env.SERVER_HOST}:${process.env.HOST_PORT}/api/mailAuth/verify/${userMail}/${userUuid}`;
    const mailTemplate = `<h2>Hi ${userFullName}</h2>
    We are very glad that you joined us. <br/>
    Please click <a href='${serverLink}'>here</a> to complete your registration<br/>
    <br/>
    Tickets App Team`;

    const mailjetHost = mailjet
        .connect('17435b7178d3a7d91bff8350ffb34f6c', '68e09ccfff7dbdb93bbd3fedfb24026f');

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
    You can find your ticket for <b>${artist}</b> in your purchases area at Tickets<br/>
    date: ${moment(time).format('DD/MM/YYYY HH:mm')} <br/>
    location: ${location} <br/>
    amount: ${amount} tickets <br/>
    price: ${price} ₪ <br/>
    <br/>
    Enjoy!<br/>
    Tickets App Team`;

    const mailjetHost = mailjet
        .connect('17435b7178d3a7d91bff8350ffb34f6c', '68e09ccfff7dbdb93bbd3fedfb24026f');
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
                        Subject: 'Thank you for your purchase!',
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
    <b>${amount} tickets for ${artist} on ${moment(time).format('DD/MM/YYYY HH:mm')}, bought by ${user}</b><br/>
    You received ${price}₪ in credits</br>
    <br/>
    Tickets App Team`;

    const mailjetHost = mailjet
        .connect('17435b7178d3a7d91bff8350ffb34f6c', '68e09ccfff7dbdb93bbd3fedfb24026f');

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