// 'use strict';
const sql = require("../../startUp/connection");
const { concateWhereString, seprateKeysValues, concateUpdateString, concateInsertKeysString, concateInsertValuesString } = require("../../utils")
// const moment = require('moment');
const select = 'id, user_id, plan_id, payment_method, subscription_id, price'
const table = 'orders'
exports.create = function (req) {
    const [fieldkeys, fieldValues] = seprateKeysValues(req.body);
    const strKeys = concateInsertKeysString(fieldkeys);
    const strValues = concateInsertValuesString(fieldkeys);
    return new Promise((resolve, reject) => {
        console.log(`INSERT INTO ${table} (${strKeys}) VALUES (${strValues})`)
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