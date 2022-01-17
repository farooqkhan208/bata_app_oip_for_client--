const fs = require("fs");
const appRoot = require('app-root-path')
const path = require("path");

exports.createFolder = function (dest, name) {
    return new Promise(function (resolve, reject) {
        try {
            const rootPath = path.join(appRoot.path, (`${dest}/${name}`).trim())
            if (!fs.existsSync(rootPath)) {
                fs.mkdir(rootPath, (err) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(true)
                    }
                })
            } else {
                resolve(true)
            }
        } catch (err) {
            reject(err)
        }
    })
}

exports.readFolder = function (path, name) {
    return new Promise(function (resolve, reject) {
        try {
            const rootPath = path.join(appRoot.path, (`${path}/${name}`).trim())
            fs.mkdir(rootPath, (err, data) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(data)
                }
            })
        } catch (err) {
            reject(err)
        }
    })
}

exports.readFolderGetFullPathFiles = function (path, name) {
    return new Promise(function (resolve, reject) {
        try {
            const rootPath = path.join(appRoot.path, (`${path}/${name}`).trim())
            fs.readdir(rootPath, (err, data) => {
                if (err) {
                    reject(err)
                } else {
                    const result = data.map(fileName => {
                        return path.join(appRoot.path, (`${path}/${fileName}`).trim())
                    })
                    resolve(result)
                }
            })
        } catch (err) {
            reject(err)
        }
    })
}

exports.filterFileInFolder = function (path) {
    return new Promise(function (resolve, reject) {
        try {
            const rootPath = path.join(appRoot.path, `upload/${path}`.trim())
            fs.readdir(rootPath, (err, files) => {
                if (err) {
                    reject(err)
                } else if (files.length == 0) {
                    console.log("Empty Folder")
                } else {
                    const result = files.map(fileName => {
                        return path.join(appRoot.path, `upload/${path}/${fileName}`.trim())
                    }).filter(file => {
                        return fs.lstatSync(file).isFile()
                    })
                    resolve(result)
                }
            })
        } catch (err) {
            reject(err)
        }
    })
}

exports.renameFolder = function (currentName, upadatedName) {
    return new Promise(function (resolve, reject) {
        try {
            const rootPath = path.join(appRoot.path, `upload`.trim())
            fs.rename(`${rootPath}/${currentName}`, `${rootPath}/${upadatedName}`, (err, files) => {
                fs.rename('/Users/joe', '/Users/roger', err => {
                    if (err) {
                        console.error(err)
                        return
                    }
                    //done
                })
            })
        } catch (err) {
            reject(err)
        }
    })
}

exports.renameFolder = function (dir) {
    return new Promise(function (resolve, reject) {
        try {
            const rootPath = path.join(appRoot.path, `upload/${dir}`.trim())
            fs.rm(curPath, (err) => {
                if (err) {
                    reject(err);
                }
                resolve(true)
            });
        } catch (err) {
            reject(err)
        }
    })
}

///************************** FILE SECTION ************************************ */
exports.deleteImage = function (image) {
    return new Promise(function (resolve, reject) {
        try {
            console.log(path.join(appRoot.path, `/public/profileImage/${image}`.trim()))
            const rootPath = path.join(appRoot.path, `/public/profileImage/${image}`.trim())
            fs.unlink(rootPath, (err) => {
                if (err) {
                    reject(err);
                }
                resolve(true)
            });
        } catch (err) {
            reject(err)
        }
    })
}
///************************** EXTRA UTIL FUNCTION ************************************ */
