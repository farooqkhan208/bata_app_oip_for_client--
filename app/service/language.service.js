// 'use strict';
const sql = require("../../startUp/connection");
const { concateWhereString, seprateKeysValues, concateUpdateString, concateInsertKeysString, concateInsertValuesString } = require("../../utils")
const select = 'id, language_name, status'
const table = "languages"

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

const findById = function (id) {
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
            reject(err)
        }

    })
}

exports.findLanguageArrayId = function (array) {
    return new Promise(function (resolve, reject) {
        try {
            if (array.length > 0) {
                let modify = [];
                array.map(async (item, index, arr) => {
                    try {
                        const [RowDataPacket] = await findById(item.language);
                        delete item.id;
                        delete item.language;
                        delete item.booking;
                        item.name = RowDataPacket.language_name;
                        modify.push(item)
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

exports.findLanguageArrayIdForInterpreter = function (array) {
    return new Promise(function (resolve, reject) {
        try {
            if (array.length > 0) {
                let modify = [];
                array.map(async (item, index, arr) => {
                    try {
                        const [RowDataPacket] = await findById(item.language);
                        // item.name = RowDataPacket.language_name;
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

exports.findByArray = function (array) {
    return new Promise(function (resolve, reject) {
        try {
            sql.query(`SELECT ${select} FROM ${table} where id IN (?)`, [array],
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

exports.findByName = function (name) {
    return new Promise(function (resolve, reject) {
        try {
            sql.query(`SELECT ${select} FROM ${table} where language_name = ?`, [name],
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
exports.findById = findById;