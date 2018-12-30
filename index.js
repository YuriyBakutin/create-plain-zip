/**
 * create-plain-zip
 *
 * Copyright (c) 2015 Yuriy Bakutin.
 * Licensed under the MIT license.
 * https://github.com/
 */

'use strict'

const fs = require('fs');
const path = require('path');
const zipStream = require('zip-stream');

/**
 * Create plain zip-archive that does not contain internal folders
 * using async-await syntax.
 *
 * @param {string} archivePath The path to created zip-archive.
 * @param {Array} filePaths The array of strings with paths of archived files.
 * @returns {Promise} Returns the Promise for using async-await JS design.
 */
module.exports = (archivePath, filePaths) => {
    return new Promise(async (resolve, reject) => {
        const archive = new zipStream();

        const archiveFile = fs.createWriteStream(archivePath);

        archiveFile.on('error', err => {
            reject(err);
        });

        archiveFile.on('finish', () => {
            resolve();
        });

        archive.pipe(archiveFile);

        for (const filePath of filePaths) {
            const fileName = path.basename(filePath);
            await addToArchive(archive, filePath, fileName);
        }

        archive.finish();

    });
}

const addToArchive = (archive, path, name) => {
    return new Promise(async (resolve, reject) => {
        const content = await readFile(path);
        archive.entry(
            content,
            { name },
            err => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            }
        );
    });
}

const readFile = (path) => {
    return new Promise((resolve, reject) => {
        fs.readFile(path, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            };
        });
    });
}
