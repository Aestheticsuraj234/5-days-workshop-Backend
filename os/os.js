const os = require("os");


const platform = os.platform();
console.log(`Operating System: ${platform}`);
// Output: 'win32' (Windows), 'linux' (Linux), 'darwin' (macOS)


const arch = os.arch();
console.log(`CPU Architecture: ${arch}`);
// Output: 'x64'(intel and amd), 'arm'(smart phone , router , ), etc.


const freeMemory = os.freemem();
console.log(`Free Memory: ${freeMemory / 1024 / 1024} MB`);
// Converts bytes to MB


const totalMemory = os.totalmem();
console.log(`Total Memory: ${totalMemory / 1024 / 1024} MB`);
// Converts bytes to MB


const hostname = os.hostname();
console.log(`Hostname: ${hostname}`);
// Output: 'my-computer'


const cpus = os.cpus();
console.log(`Number of CPUs: ${cpus.length}`);
console.log('CPU Details:', cpus);
// Output: Details of each CPU/core (model, speed, etc.)


const tempDirectory = os.tmpdir();
console.log(`Temporary Directory: ${tempDirectory}`);
// Output: '/tmp' (Linux/Mac), 'C:\\Users\\User\\AppData\\Local\\Temp' (Windows)