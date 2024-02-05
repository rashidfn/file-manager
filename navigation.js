import {fileURLToPath} from "url";
import {dirname, join, resolve} from "path";
import {lstat, readdir} from "fs/promises";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const Navigation = {
    dir: __dirname,

    get currentDirectory() {
        return this.dir;
    },
    set currentDirectory(value) {
        this.dir = value;
    },
    showCurrentDirectory() {
        console.log(`You are currently in ${this.currentDirectory}`);
    }
};

export const up = () => {
    Navigation.currentDirectory = join(Navigation.currentDirectory, '../');
};

export const ls = async () => {
    const content = (await readdir(Navigation.currentDirectory)).sort((a, b) => a.localeCompare(b));
    const files = [];
    const dirs = [];
    for (const data of content) {
        const path = resolve(Navigation.currentDirectory, data);
        const isDir = (await lstat(path)).isDirectory();
        const value = {
            Name: data,
            Type: isDir ? 'directory' : 'file',
        }
        if (isDir) {
            dirs.push(value);
        } else {
            files.push(value);
        }
    }
    console.table([...dirs, ...files]);
};

export const cd = async (path) => {
    if (path.startsWith('/')) {
        Navigation.currentDirectory = path;
    } else {
        Navigation.currentDirectory  = join(Navigation.currentDirectory, path);
    }
};