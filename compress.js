import {createReadStream, createWriteStream} from "fs";
import {createGzip, createGunzip} from 'zlib';
import {pipeline} from 'stream';
import {Navigation} from "./navigation.js";


const makeZip = (src, dest, zip) => {
    const readStream = createReadStream(src);
    const writeStream = createWriteStream(dest);

    return new Promise((resolve, reject) => {
        pipeline(readStream, zip, writeStream, (err) => {
            if (!err) {
                resolve();
            }
            reject();
            Navigation.showCurrentDirectory();
        })
    })
}

export const compress = async (src, dest) => {
    const zip = createGzip();
    return makeZip(src, dest, zip);
}

export const decompress = async (src, dest) => {
    const zip = createGunzip();
    return makeZip(src, dest, zip);
}