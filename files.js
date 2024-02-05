import {createReadStream, createWriteStream} from "fs";
import {rename, rm, writeFile, access, constants} from "fs/promises";

export const checkFileExists = async (path) => {
    try {
        await access(path, constants.R_OK);
    } catch {
        return Promise.reject();
    }
    return Promise.resolve();
}

export const cat = async (path) => {
    await checkFileExists(path);
    const stream = createReadStream(path);
    return new Promise((resolve) => {
        stream.on('readable', () => {
            const data = stream.read();
            if (data) {
                console.log(data.toString());
                resolve();
            }
        })
    });
};
export const add = async (filename) => {
    await writeFile(filename, '', {
        flag: 'wx',
    });
};

export const rn = async (oldName, newName) => {
    await rename(oldName, newName);
};

export const cp = async (src, dest) => {
    await checkFileExists(src);
    const readable = createReadStream(src, { encoding: 'utf8' });
    const filename = src.slice(src.lastIndexOf('/') + 1);
    const writable = createWriteStream(`${dest}/${filename}`);
    readable.pipe(writable);
};

export const remove = async (path) => {
    await rm(path);
};

export const mv = async (src, dest) => {
    await cp(src, dest);
    await remove(src);
};


