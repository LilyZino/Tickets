// Here we will export the conrtoller functions our touter will use

export const getExampleModel = async (req, res) => {
    const mailjet = require('node-mailjet')
        .connect('187b0a32d7380a84deaeb1ded861eb68', 'e02c897e8da191f92fbb6d61393972a1')
    const request = mailjet
        .post("send", { 'version': 'v3.1' })
        .request({
            "Messages": [
                {
                    "From": {
                        "Email": "shakedh100@gmail.com",
                        "Name": "Web"
                    },
                    "To": [
                        {
                            "Email": "shakedh100@gmail.com",
                            "Name": "Web"
                        }
                    ],
                    "Subject": "Greetings from Mailjet.",
                    "TextPart": "My first Mailjet email",
                    "HTMLPart": "<h3>Dear passenger 1, welcome to <a href='https://www.mailjet.com/'>Mailjet</a>!</h3><br />May the delivery force be with you!",
                    "CustomID": "AppGettingStartedTest"
                }
            ]
        })
    request
        .then((result) => {
            console.log(result.body)
        })
        .catch((err) => {
            console.log(err.statusCode)
        })

    // get ExampleModal
    res.send('mail sended');


};