import mailjet from 'node-mailjet';
import uuid from 'uuid/v4';
import MailAuth from './MailAuth.model';

export const sendAuthenticationMail = async (userMail, userFullName) => {
    console.log('im blue');

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