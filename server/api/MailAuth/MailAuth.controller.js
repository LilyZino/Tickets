import mailjet from 'node-mailjet';

export const sendAuthenticationMail = async (req, res) => {
    console.log('im blue');

    const [userMail, userFullName] = ['shir.avraham13@gmail.com', 'Shaked Hadas'];
    const mailTemplate = `<h2>Hi ${userFullName}</h2>
    We are very glad that you joined us. <br/>
    Please click <a href='https://www.mailjet.com/'>here</a> to complete your registration<br/>
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
                        // TextPart: 'My first Mailjet email',
                        HTMLPart: mailTemplate
                        // CustomID: 'AppGettingStartedTest'
                    }
                ]
            });

        console.log(result.body);
    } catch (error) {
        console.log(error.statusCode);
    }
    // request
    //     .then((result) => {
    //         console.log(result.body);
    //     })
    //     .catch((err) => {
    //         console.log(err.statusCode);
    //     });

    // get ExampleModal
    res.send('mail was sended');
};


export const verifyCode = () => {

};