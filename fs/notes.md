
### 📄 **File Operations with `fs` Module**

#### 1️⃣ **Create (fs.writeFile)**  
- **Purpose**: Writes content to a file. If the file does not exist, it creates the file.
- **Usage**: Used to create new files or overwrite existing ones.

```javascript
const fs = require('fs');

const filePath = './example.txt';
const content = 'This is the initial content.';

// Write to the file
fs.writeFile(filePath, content, (err) => {
  if (err) throw err;
  console.log('File created and content written!');
});
```

---

#### 2️⃣ **Read (fs.readFile)**  
- **Purpose**: Reads the content of the file asynchronously.
- **Usage**: Commonly used to load file data for further processing.

```javascript
fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) throw err;
  console.log('File Content:', data);
});
```

---

#### 3️⃣ **Update (fs.appendFile)**  
- **Purpose**: Appends new content to the file without overwriting the existing content.
- **Usage**: Useful for adding logs or appending data to an existing file.

```javascript
const newContent = '\nThis is the appended content.';

// Append to the file
fs.appendFile(filePath, newContent, (err) => {
  if (err) throw err;
  console.log('Content appended to the file!');
});
```

---

#### 4️⃣ **Delete (fs.unlink)**  
- **Purpose**: Deletes the file completely.
- **Usage**: Used for removing unwanted or temporary files.

```javascript
fs.unlink(filePath, (err) => {
  if (err) throw err;
  console.log('File deleted successfully!');
});
```

---

### 🔄 **Full CRUD Workflow Example**

Here’s a complete example demonstrating all the operations together:

```javascript
const fs = require('fs');
const filePath = './example.txt';

// Step 1: Create a file
fs.writeFile(filePath, 'This is the initial content.', (err) => {
  if (err) throw err;
  console.log('File created.');

  // Step 2: Read the file
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) throw err;
    console.log('File Content:', data);

    // Step 3: Update the file
    fs.appendFile(filePath, '\nThis is the appended content.', (err) => {
      if (err) throw err;
      console.log('Content appended.');

      // Step 4: Delete the file
      fs.unlink(filePath, (err) => {
        if (err) throw err;
        console.log('File deleted.');
      });
    });
  });
});
```

---

### 🚀 **Summary**

1. **Create (`fs.writeFile`)**: Creates or overwrites a file.  
2. **Read (`fs.readFile`)**: Reads the content of a file.  
3. **Update (`fs.appendFile`)**: Adds content to an existing file without overwriting.  
4. **Delete (`fs.unlink`)**: Permanently removes a file.  

These methods are essential for file manipulation in Node.js, enabling you to implement robust file-based operations.