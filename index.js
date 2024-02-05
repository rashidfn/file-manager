import {readInput} from "./input.js";

const args = process.argv.slice(2);

if (args.length !== 1 || !args[0].startsWith('--username=')) {
    console.error('Invalid input');
    process.exit(1);
}
const username = args[0].slice(args[0].indexOf('=') + 1);

process.on('exit', () => {
    console.log(`Thank you for using File Manager, ${username}, goodbye!`);
});

process.on('SIGINT', () => {
    console.log(`Thank you for using File Manager, ${username}, goodbye!`);
})

console.log(`Welcome to the File Manager, ${username}!`);

readInput();




