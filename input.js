import {handleOsOperation as os} from "./os.js";
import {compress, decompress} from "./compress.js";
import {Navigation, up, ls, cd} from "./navigation.js";
import {cat, add, remove as rm, mv, cp, rn} from './files.js';
import {hash} from "./hash.js";
import {createInterface} from 'readline';

const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
});

const Operations = {
    up,
    ls,
    cd,
    cat,
    add,
    rm,
    mv,
    cp,
    rn,
    os,
    hash,
    compress,
    decompress,
}

export const readInput = () => {
    console.log(`You are currently in ${Navigation.currentDirectory}`);

    rl.question('Please print command\n', (data) => {
        const input = data.trim().split(' ');
        const [command, arg] = input;
        if (!Operations[command]) {
            console.error('Invalid input');
            readInput();
            return;
        }
        (async () => {
            try {
                process.stdin.pause();
                if (input.length === 1) {
                    await Operations[command]();
                }
                if (input.length === 2) {
                    await Operations[command](arg);
                }
                if (input.length === 3) {
                    await Operations[command](arg, input[2]);
                }
            } catch {
                console.error('Operation failed');
            }
            process.stdin.resume();
            readInput();
        })();
    });
}