var FCM = require('fcm-node');
var serverKey = 'AAAAWdTpUW0:APA91bEeb2CVGr514BTOQ_5AJ0EO1t7ghH5cT2_4r6SePWkEqzLRbD327wmcWky2zAylzh1WnG4Yls5WvY_adOGsOMqqvJWWY0x_01594Ov7oRHsfhPnmhEfMYaANt-9p_3xpah-46_A';
var fcm = new FCM(serverKey);

const clientMessage = (userId, title, body, payload) => {
    return {
        to: `/topics/bata_client${userId}`,
        //to: `/topics/RestaurantApp`, //for testing //bata_client124
        //collapse_key: 'your_collapse_key',
        notification: {
            title,
            body
        },
        data: payload
    }
}

const adminMessage = (userId, title, body, payload) => {
    return {
        to: `/topics/bata_admin${userId}`,
        //to: `/topics/RestaurantApp`, //for testing //bata_client124
        //collapse_key: 'your_collapse_key',
        notification: {
            title,
            body: body
        },
        data: payload
    }
}

const interpreterMessage = (userId, title, body, payload) => {
    return {
        to: `/topics/bata_interpreter${userId}`,
        //to: `/topics/RestaurantApp`, //for testing //bata_client124
        //collapse_key: 'your_collapse_key',
        notification: {
            title: title,
            body: body
        },
        data: payload
    }
}

exports.sendToClient = function (client, title, body, payload) {
    return new Promise(function (resolve, reject) {
        fcm.send(clientMessage(client, title, body, payload), (err, response) => {
            if (err) {
                console.log(err)
                reject(err)
            } else {
                resolve(response)
            }
        });

    })
}

exports.sendToAdmin = function (admin, body, payload) {
    return new Promise(function (resolve, reject) {
        fcm.send(adminMessage(admin, body, payload), (err, response) => {
            if (err) {
                console.log(err)
                reject(err)
            } else {
                resolve(response)
            }
        });

    })
}

// exports.sendToInterPreter = function (userId, body, payload) {
//     return new Promise(function (resolve, reject) {
//         fcm.send(message(userId, body, payload), (err, response) => {
//             if (err) {
//                 console.log(err)
//                 reject(err)
//             } else {
//                 resolve(response)
//             }
//         });

//     })
// }

exports.sendToInterpreter = function (interpreter, title, body, payload) {
    return new Promise(function (resolve, reject) {
        fcm.send(interpreterMessage(interpreter, title, body, payload), (err, response) => {
            if (err) {
                console.log(err)
                reject(err)
            } else {
                resolve(response)
            }
        });

    })
}