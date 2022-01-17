// 'use strict';
const sql = require("../../startUp/connection");
const { concateWhereString, seprateKeysValues, concateUpdateString, concateInsertKeysString, concateInsertValuesString } = require("../../utils")
// const moment = require('moment');
const select = 'id, user_id, translation_address, additional_info, start_date, end_date, lat, longe, status, primary_language, occasion, note_to_translator'
const table = "booking_interpreter"

exports.create = function (req) {
    const [fieldkeys, fieldValues] = seprateKeysValues(req.body);
    const strKeys = concateInsertKeysString(fieldkeys);
    const strValues = concateInsertValuesString(fieldkeys);
    return new Promise((resolve, reject) => {
        try {
            sql.query(`INSERT INTO ${table} (${strKeys}) VALUES (${strValues})`, [...fieldValues],
                (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                })
        } catch (error) {
            reject(err)
        }
    });
}

exports.findAcceptBooking = function (data) {
    let id = parseInt(data)
    return new Promise(function (resolve, reject) {
        try {
            sql.query(`SELECT ${select} FROM ${table} where id=? AND status='accept'`, [id],
                (err, data) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(data);
                    }
                })
        } catch (error) {
            reject(err)
        }

    })
}

// exports.findCompletedBooking = function (data) {
//     let id = parseInt(data)
//     return new Promise(function (resolve, reject) {
//         try {
//             console.log(`SELECT ${select} FROM ${table} where (id=${id} AND status='accept')`)
//             sql.query(`SELECT ${select} FROM ${table} where id=? AND status='completed'`, [id],
//                 (err, [data]) => {
//                     if (err) {
//                         reject(err);
//                     } else {
//                         resolve(data);
//                     }
//                 })
//         } catch (error) {
//             reject(err)
//         }

//     })
// }

const findByBookingId = function (data) {
    let id = parseInt(data)
    return new Promise(function (resolve, reject) {
        try {
            // console.log(`SELECT ${select} FROM ${table} where (id=${id} AND status='completed')`)
            sql.query(`SELECT ${select} FROM ${table} where id=? AND status='completed'`, [id],
                (err, data) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(data);
                    }
                })
        } catch (error) {
            reject(err)
        }

    })
}

exports.findByBookingId = findByBookingId;

exports.findByArrayId = function (array) {
    return new Promise(function (resolve, reject) {
        try {
            let modify = [];
            array.map(async (item, index, arr) => {
                const [RowDataPacket] = await findByBookingId(item.booking)
                modify.push(RowDataPacket)
                if (index == arr.length - 1) {
                    resolve(modify);
                }
            })
        } catch (error) {
            reject(err)
        }

    })
}

exports.findByBookingId = function (booking) {
    let id = parseInt(booking)
    return new Promise(function (resolve, reject) {
        try {
            sql.query(`SELECT ${select} FROM ${table} where id=${id} AND status='accept'`,
                (err, [data]) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(data);
                    }
                })
        } catch (error) {
            reject(err)
        }

    })
}

exports.findUserId = function (data) {
    let id = parseInt(data)
    return new Promise(function (resolve, reject) {
        try {
            sql.query(`SELECT ${select} FROM ${table} where user_id=?`, [id],
                (err, [data]) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(data);
                    }
                })
        } catch (error) {
            reject(error)
        }

    })
}

// exports.findByName = function (name) {
//     return new Promise(function (resolve, reject) {
//         try {
//             sql.query(`SELECT ${select} FROM ${table} where role_name = ?`, [name],
//                 (err, result) => {
//                     if (err) {
//                         reject(err);
//                     } else {
//                         resolve(result);
//                     }
//                 })
//         } catch (error) {
//             reject(err)
//         }

//     })
// }

exports.find = function () {
    return new Promise(function (resolve, reject) {
        try {
            sql.query(`SELECT ${select} FROM ${table}`, [],
                (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                })
        } catch (error) {
            reject(err)
        }

    })
}

exports.findCurrentBookingByUserId = function (userId) {
    return new Promise(function (resolve, reject) {
        try {
            sql.query(`SELECT ${select} FROM ${table} where (user_id=${userId} AND status='pending') OR (user_id=${userId} AND status='accept')`,
                (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                })
        } catch (error) {
            reject(err)
        }

    })
}

exports.findCurrentBookingByInterpreterId = function (userId) {
    return new Promise(function (resolve, reject) {
        try {
            sql.query(`SELECT ${select} FROM ${table} where (user_id=${userId} AND status='pending') OR (user_id=${userId} AND status='accept')`,
                (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                })
        } catch (error) {
            reject(err)
        }

    })
}

exports.findCheckedBookingInterpreter = function (userId) {
    return new Promise(function (resolve, reject) {
        try {
            sql.query(`SELECT ${select} FROM ${table} where user_id=${userId} AND status='accept'`,
                (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                })
        } catch (error) {
            reject(err)
        }

    })
}

exports.findByUserId = function (userId) {
    return new Promise(function (resolve, reject) {
        try {
            sql.query(`SELECT ${select} FROM ${table} where user_id=${userId}`,
                (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                })
        } catch (error) {
            reject(err)
        }

    })
}

exports.updateStatus = function (id, data) {
    return new Promise(function (resolve, reject) {
        const [fieldkeys, fieldValues] = seprateKeysValues(data);
        const checkvalues = fieldValues ? fieldValues : null;
        const setString = fieldkeys ? concateUpdateString(fieldkeys) : "";
        try {
            sql.query(`UPDATE ${table} SET ${setString} WHERE id=${id}`,
                [...checkvalues],
                (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                })
        } catch (error) {
            reject(error)
        }

    })
}

exports.updateStatusCompleted = function (id, data) {
    return new Promise(function (resolve, reject) {
        const [fieldkeys, fieldValues] = seprateKeysValues(data);
        const checkvalues = fieldValues ? fieldValues : null;
        const setString = fieldkeys ? concateUpdateString(fieldkeys) : "";
        try {
            sql.query(`UPDATE ${table} SET ${setString} WHERE id=${id} AND status='accept'`,
                [...checkvalues],
                (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        console.log(result)
                        resolve(result);
                    }
                })
        } catch (error) {
            reject(error)
        }

    })
}

exports.findById = function (id) {
    return new Promise(function (resolve, reject) {
        try {
            sql.query(`SELECT ${select} FROM ${table} where  id=?`, [id],
                (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                })
        } catch (error) {
            reject(err)
        }

    })
}

// exports.delete = (id) => {
//     return new Promise((resolve, reject) => {
//         try {
//             sql.query(`DELETE FROM ${table} WHERE id=${id}`,
//                 (err, result) => {
//                     if (err) {
//                         reject(err);
//                     } else {
//                         resolve(result)
//                     }
//                 })
//         } catch (error) {
//             reject(error)
//         }

//     })
// }