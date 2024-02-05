import {readFile} from "fs/promises";
import {createHash} from "crypto";

export const hash = async (path) => {
    const fileData = await readFile(path, { encoding: 'utf8' });
    const hash = createHash('sha256');
    hash.update(fileData, 'utf8');
    console.log(`${hash.digest('hex')}`);
};