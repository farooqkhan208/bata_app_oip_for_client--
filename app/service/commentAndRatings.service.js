// 'use strict';
const sql = require("../../startUp/connection");
const { concateWhereString, seprateKeysValues, concateUpdateString, concateInsertKeysString, concateInsertValuesString } = require("../../utils")
const select = 'id, rate, client, interpreter, comment, booking, created_at'
const cuntomSelect = 'id, name, price, stripe_p_id, created_date'
const table = "review_on_bocking"

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

exports.findAndUniqeCheck = function (booking, client, interpreter) {
    return new Promise(function (resolve, reject) {
        try {
            sql.query(`SELECT ${select} FROM ${table} where  booking=${booking} AND client=${client} AND interpreter=${interpreter}`,
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

exports.findById = function (id) {
    return new Promise(function (resolve, reject) {
        try {
            sql.query(`SELECT ${select} FROM ${table} where id=${id}`,
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

exports.findByInterpreter = function (id) {
    return new Promise(function (resolve, reject) {
        try {
            sql.query(`SELECT ${select} FROM ${table} where interpreter=?`, [id],
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


const findByBooking = function (id) {
    return new Promise(function (resolve, reject) {
        try {
            sql.query(`SELECT ${select} FROM ${table} where booking=?`, [id],
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

exports.findByBooking = findByBooking;

exports.findByBookingArray = function (array) {
    return new Promise(function (resolve, reject) {
        try {
            let modify = [];
            array.map(async (item, index, arr) => {
                const [RowDataPacket] = await findByBooking(item.booking)
                modify.push(RowDataPacket)
                if (index == arr.length - 1) {
                    resolve(modify);
                }
            })
            // sql.query(`SELECT ${select} FROM ${table} where booking=?`, [id],
            //     (err, result) => {
            //         if (err) {
            //             reject(err);
            //         } else {
            //             resolve(result);
            //         }
            //     })
        } catch (error) {
            reject(err)
        }

    })
}

exports.findByName = function (name) {
    return new Promise(function (resolve, reject) {
        try {
            sql.query(`SELECT ${select} FROM ${table} where name = ?`, [name],
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
            sql.query(`SELECT ${select} FROM ${table} where created_by = 99`,
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

exports.adminFind = function () {
    return new Promise(function (resolve, reject) {
        try {
            sql.query(`SELECT ${select} FROM ${table}`,
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