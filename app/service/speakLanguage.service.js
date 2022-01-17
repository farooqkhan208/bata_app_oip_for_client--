// 'use strict';
const sql = require("../../startUp/connection");
const { seprateKeysValues, concateUpdateString, concateInsertKeysString, concateInsertValuesString } = require("../../utils")
const select = 'id, user, language';
const table = "speak_language";

const create = function (req) {
    const [fieldkeys, fieldValues] = seprateKeysValues(req);
    const strKeys = concateInsertKeysString(fieldkeys);
    const strValues = concateInsertValuesString(fieldkeys);
    return new Promise((resolve, reject) => {
        console.log(...fieldValues)
        try {
            sql.query(`INSERT INTO ${table} (${strKeys}) VALUES (${strValues})`, [...fieldValues],
                (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(true);
                    }
                })
        } catch (error) {
            reject(err)
        }
    });
}

exports.createArray = function (id, array) {
    return new Promise(function (resolve, reject) {
        try {
            if (array.length > 0) {
                array.map(async (item, index, arr) => {
                    try {
                        await create({ user: id, language: item });
                        if (index == arr.length - 1) {
                            resolve(true);
                        }
                    } catch (error) {
                        reject(error)
                    }
                })
            } else {
                resolve(true)
            }
        } catch (error) {
            reject(error)
        }
    })
}

exports.createOrIgnore = function (user, languages) {
    return new Promise((resolve, reject) => {
        try {
            sql.query(`INSERT IGNORE INTO speak_language (user, language) VALUES ?`, [languages.map(item => [user, item])],
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
    });
}

exports.findByUserId = function (userId) {
    return new Promise(function (resolve, reject) {
        try {
            sql.query(`SELECT ${select} FROM ${table} where user=?`, [userId],
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
            sql.query(`SELECT ${select} FROM ${table} where id=?`, [id],
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

// exports.findByIdAndLanguage = function (user, language) {
//     return new Promise(function (resolve, reject) {
//         try {
//             sql.query(`SELECT ${select} FROM ${table} where user=? AND language=?`, [user, language],
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
            console.log(`DELETE FROM ${table} WHERE id=${id}`)
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

const deleteByLanguage = (language) => {
    return new Promise((resolve, reject) => {
        try {
            sql.query(`DELETE FROM ${table} WHERE language=${language}`,
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

exports.deleteArray = (array) => {
    return new Promise((resolve, reject) => {
        try {
            sql.query(`DELETE FROM ${table} WHERE id IN (?)`, [array],
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
exports.deleteArray = function (array) {
    return new Promise(function (resolve, reject) {
        try {
            if (array.length > 0) {
                array.map(async (item, index, arr) => {
                    try {
                        await deleteByLanguage(item.language);
                        if (index == arr.length - 1) {
                            resolve(true);
                        }
                    } catch (error) {
                        reject(error)
                    }
                })
            } else {
                resolve(true)
            }
        } catch (error) {
            reject(err)
        }
    })
}

// exports.delete = deleted;
exports.create = create;