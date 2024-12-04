const path = require("path");

console.log("DIR_NAME👉",__dirname)

console.log("FILE_NAME👉",__filename)



// *1. path.parse()

const filePath = '/home/user/docs/file.txt';
const parsedPath = path.parse(filePath);
console.log(parsedPath);

// *2 path.join();
const joinedPath = path.join('home', 'user', 'docs', 'file.txt');
console.log(joinedPath);
// Output (on Linux/macOS): 'home/user/docs/file.txt'
// Output (on Windows): 'home\\user\\docs\\file.txt'

// window ====> \
// linux / mac ===> /


// *3. path.resolve()

const absolutePath = path.resolve('docs', 'file.txt');
console.log(absolutePath);


const extension = path.extname('/home/user/docs/file.js');
console.log(extension);
// Output: '.txt'


const baseName = path.basename('/home/user/docs/file.txt');
console.log(baseName);
// Output: 'file.txt'


const dirName = path.dirname('/home/user/docs/file.txt');
console.log(dirName);
// Output: '/home/user/docs'


// path.sep ----> assignment