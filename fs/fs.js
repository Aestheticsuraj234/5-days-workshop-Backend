const fs = require("fs");

const filePath = "fs/example.txt"
const content = "This is the initial Content."


// fs.writeFile(filePath , content , (err)=>{
//         if(err) throw err;

//         console.log("File created and content written!")
// })


// fs.readFile(filePath, 'utf-8', (err, data) => {
//     if (err) throw err;
//     console.log('File Content:', data);
//   });

//   const newContent = '\nThis is the appended content.';

// // Append to the file
// fs.appendFile(filePath, newContent, (err) => {
//   if (err) throw err;
//   console.log('Content appended to the file!');
// });

fs.unlink(filePath, (err) => {
    if (err) throw err;
    console.log('File deleted successfully!');
  });