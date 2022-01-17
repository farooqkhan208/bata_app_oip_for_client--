const config = require("config")
const twilio = require('twilio')(config.get("twilio.account_SID"), config.get("twilio.account_Token"))

exports.verifySms = function ({ phone, code }) {
    console.log(phone, code)
    return new Promise(function (resolve, reject) {
        twilio.verify.services(config.get("twilio.service_SID"))
            .verificationChecks
            .create({ to: `+${phone}`, code })
            .then(async message => {
                if (message.valid == true) {
                    resolve(true);
                } else {
                    reject("Code does not match the code sent to your phone")
                }
            })
            .catch(error => { reject(error) })

    })
}

exports.sendTwilosms = function (phon) {
    return new Promise(function (resolve, reject) {
        console.log(phon)
        twilio.verify.services(config.get("twilio.service_SID"))
            .verifications
            .create({ to: `+${phon}`, channel: 'sms' })
            .then(async message => {
                resolve(message.sid)
            })
            .catch(error => {
                console.log(error.message)
                reject(error)
            })

    })
}




