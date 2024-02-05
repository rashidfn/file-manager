import {createReadStream, createWriteStream} from "fs";
import {rename, rm, writeFile} from "fs/promises";

export const cat = (path) => {
    const stream = createReadStream(path);
    stream.on('readable', () => {
        const data = stream.read();
        if (data) {
            console.log(data.toString());
        }
    })
};
export const add = async (filename) => {
    await writeFile(filename, '', {
        flag: 'wx',
    });
};

export const rn = async (oldName, newName) => {
    await rename(oldName, newName);
};

export const cp = (src, dest) => {
    const readable = createReadStream(src, { encoding: 'utf8' });
    const writable = createWriteStream(dest);
    readable.pipe(writable);
};

export const remove = async (path) => {
    await rm(path);
};

export const mv = async (src, dest) => {
    cp(src, dest);
    await remove(src);
};


