import {createReadStream, createWriteStream} from "fs";
import {createGzip, createGunzip} from 'zlib';
import {pipeline} from 'stream';
import {checkFileExists} from "./files.js";


const makeZip = async (src, dest, zip) => {
    await checkFileExists(src);
    const readStream = createReadStream(src);
    const writeStream = createWriteStream(dest);

    return new Promise((resolve, reject) => {
        pipeline(readStream, zip, writeStream, (err) => {
            if (!err) {
                resolve();
            }
            reject();
        })
    })
}

export const compress = async (src, dest) => {
    const zip = createGzip();
    return await makeZip(src, dest, zip);
}

export const decompress = async (src, dest) => {
    const zip = createGunzip();
    return await makeZip(src, dest, zip);
}