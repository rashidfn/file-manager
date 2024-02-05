import {readInput} from "./input.js";

const args = process.argv.slice(2);

if (args.length !== 1 || !args[0].startsWith('--username=')) {
    throw Error('Invalid input');
}
const username = args[0].slice(args[0].indexOf('=') + 1);

console.log(`Welcome to the File Manager, ${username}!`);

readInput();




