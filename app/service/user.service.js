// 'use strict';
const sql = require("../../startUp/connection");
const { concateWhereString, seprateKeysValues, concateUpdateString, concateInsertKeysString, concateInsertValuesString } = require("../../utils")
// const moment = require('moment');
const select = 'id, first_name, last_name, email,password, phone, language, service_type, online_status, verify, blocked, longe, lat,profile_image, current_package, previous_package, role_id, stripe_c_id';
const customSelect = 'id, first_name, last_name, email, phone, online_status, language, profile_image';
const interpreterSelect = 'id, first_name, last_name, email, phone, online_status, language, profile_image, status, blocked, role_id';
const commentSelect = 'id, first_name, profile_image';
const bookingUserSelect = 'id, first_name, profile_image, phone';
const table = "user"

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

exports.findActiveInterpreter = function () {
    return new Promise(function (resolve, reject) {
        try {
            sql.query(`SELECT ${interpreterSelect} FROM ${table} where role_id=3 AND online_status=1 AND status='active'`,
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

exports.findCurrentBookingUser = function (id) {
    return new Promise(function (resolve, reject) {
        try {
            sql.query(`SELECT ${bookingUserSelect} FROM ${table} where id=${id} `,
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

exports.findVerifyEmail = function (email) {
    return new Promise(function (resolve, reject) {
        try {
            sql.query(`SELECT ${select} FROM ${table} where email = ? And verify=1`, [email],
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

exports.findVerifyEmail1 = function (email) {
    return new Promise(function (resolve, reject) {
        try {
            sql.query(`SELECT ${select} FROM ${table} where email = ?`, [email],
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

exports.findAllUsersWithPagination = function (email) {
    return new Promise(function (resolve, reject) {
        try {
            sql.query(`SELECT ${select} FROM ${table} where (role_id = 2 And verify=1) OR (role_id = 3)`,
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

exports.findByEmail = function (email) {
    return new Promise(function (resolve, reject) {
        try {
            sql.query(`SELECT ${select} FROM ${table} where email = ?`, [email],
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

exports.findByPhone = function (phone) {
    return new Promise(function (resolve, reject) {
        try {
            sql.query(`SELECT ${select} FROM ${table} where phone = ?`, [phone],
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

exports.findVerifyPhone1 = function (phone) {
    return new Promise(function (resolve, reject) {
        try {
            sql.query(`SELECT ${select} FROM ${table} where phone = ?`, [phone],
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

exports.findVerifyPhone = function (phone) {
    return new Promise(function (resolve, reject) {
        try {
            sql.query(`SELECT ${select} FROM ${table} where phone = ? And verify=1`, [phone],
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

exports.verifyPhoneAndEmail = function (phone, email) {
    return new Promise(function (resolve, reject) {
        try {
            sql.query(`SELECT ${select} FROM ${table} where phone = ? And email=?`, [phone, email],
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

exports.checkedUserVerification = function (phone, email) {
    return new Promise(function (resolve, reject) {
        try {
            sql.query(`SELECT ${select} FROM ${table} where phone = ? And email=? And verify=1`, [phone, email],
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

exports.checkedUserVerification1 = function (phone, email) {
    return new Promise(function (resolve, reject) {
        try {
            sql.query(`SELECT ${select} FROM ${table} where phone = ? And email=?`, [phone, email],
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

const findById = function (id) {
    return new Promise(function (resolve, reject) {
        try {
            sql.query(`SELECT ${select} FROM ${table} where id = ?`, [id],
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

exports.findByIdForComment = function (id) {
    return new Promise(function (resolve, reject) {
        try {
            sql.query(`SELECT ${commentSelect} FROM ${table} where id = ?`, [id],
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

const findByIdInterpreter = function (id) {
    return new Promise(function (resolve, reject) {
        try {
            sql.query(`SELECT ${interpreterSelect} FROM ${table} where id = ?`, [id],
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

exports.findUserArrayId = function (array) {
    return new Promise(function (resolve, reject) {
        try {
            if (array.length > 0) {
                let modify = [];
                array.map(async (item, index, arr) => {
                    try {
                        const [RowDataPacket] = await findByIdInterpreter(item.interpreter)
                        modify.push(RowDataPacket)
                        if (index == arr.length - 1) {
                            resolve(modify);
                        }
                    } catch (error) {
                        reject(error)
                    }
                })
            } else {
                resolve([])
            }
        } catch (error) {
            reject(err)
        }
    })
}

exports.findById1 = function (id) {
    return new Promise(function (resolve, reject) {
        try {
            sql.query(`SELECT ${customSelect} FROM ${table} where id = ?`, [id],
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

exports.findByIdWithPass = function (id) {
    return new Promise(function (resolve, reject) {
        try {
            sql.query(`SELECT ${select},password FROM ${table} where id = ?`, [id],
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

exports.update = function (id, data) {
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

exports.updateByUserId = function (id, data) {
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

exports.updateByInterPreterId = function (id, data) {
    return new Promise(function (resolve, reject) {
        const [fieldkeys, fieldValues] = seprateKeysValues(data);
        const checkvalues = fieldValues ? fieldValues : null;
        const setString = fieldkeys ? concateUpdateString(fieldkeys) : "";
        try {
            sql.query(`UPDATE ${table} SET ${setString} WHERE interpreter_id=${id}`,
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

exports.delete = (id) => {
    return new Promise((resolve, reject) => {
        try {
            sql.query(`DELETE FROM ${table} WHERE id=${id}`,
                (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result)
                    }
                })
        } catch (error) {
            reject(error)
        }

    })
}

exports.uploadProfileImage = (id, data) => {
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

exports.findById = findById;
exports.findByIdInterpreter = findByIdInterpreter;
//******************************************** TEST****************************** */
exports.deletePhone = (id) => {
    return new Promise((resolve, reject) => {
        try {
            sql.query(`DELETE FROM ${table} WHERE phone=${id}`,
                (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result)
                    }
                })
        } catch (error) {
            reject(error)
        }

    })
}