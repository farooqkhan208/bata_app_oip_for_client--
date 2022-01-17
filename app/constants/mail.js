const nodemailer = require('nodemailer');
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

const oauth2Client = new OAuth2(
    "400622524554-pap6hroofas8cniqk1bcum4lis4uftlv.apps.googleusercontent.com", // ClientID
    "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", // Client Secret
    "https://developers.google.com/oauthplayground" // Redirect URL
);

// oauth2Client.setCredentials({
//     refresh_token: "1//04ptyvZrf7ZXxCgYIARAAGAQSNwF-L9IrJS7tFUoaFGEOcQe0mFnID90bluXohzXuU1RyVaY6epx9NWZrX0UKhAA1VJPEJsy15_o"
// });

const accessToken = oauth2Client.getAccessToken()
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        type: "OAuth2",
        user: "oipdummy@gmail.com",
        // pass: 'pakistan12@4',
        clientId: "400622524554-pap6hroofas8cniqk1bcum4lis4uftlv.apps.googleusercontent.com",
        clientSecret: "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",
        refreshToken: "1//04ptyvZrf7ZXxCgYIARAAGAQSNwF-L9IrJS7tFUoaFGEOcQe0mFnID90bluXohzXuU1RyVaY6epx9NWZrX0UKhAA1VJPEJsy15_o",
        accessToken
    },
    tls: {
        rejectUnauthorized: false
    }
});
const sendMail = (mailOptions) => {

    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                reject(error);
            } else {
                resolve(info);
            }
        });
    });
}

module.exports.send = (to, subject, html) => {
    console.log(to, subject, html)
    const mailOptions = {
        from: 'oipdummy@gmail.com',
        to,
        subject,
        html
    };
    return new Promise((resolve, reject) => {
        sendMail(mailOptions).then(function (response) {
            resolve(response);
        }).catch(function (error) {
            reject(error);
        });
    })
}



