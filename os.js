import os from "os";

export const handleOsOperation = (arg) => {
    if (!arg?.startsWith('--')) {
        console.error('Invalid input');
        return;
    }
    const value = arg.slice(2);
    switch (value) {
        case 'EOL':
            console.log(JSON.stringify(os.EOL));
            break;
        case 'cpus':
            const cpus = os
                .cpus()
                .map(({model, speed }) => ({model, speed}));
            console.log(`Overall amount of CPUS: ${cpus.length}`);
            console.table(cpus);
            break;
        case 'homedir':
            console.log(os.homedir());
            break;
        case 'username':
            console.log(os.userInfo().username);
            break;
        case 'architecture':
            console.log(os.arch());
            break;
        default:
            console.error('Invalid input');
    }
}