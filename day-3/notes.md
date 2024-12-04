### **Notes on Express.js**

---

#### **What is Express.js?**
- **Express.js** is a lightweight, fast, and flexible **web application framework** for **Node.js**.
- It provides a set of tools and features to build web applications and APIs.
- Acts as a layer built on top of Node.js to simplify server-side programming.

---

#### **Why Express.js?**

1. **Simplifies Server Setup**:
   - Without Express, writing a server in Node.js can be verbose and repetitive.
   - Express makes it easier with built-in methods for handling routing, middleware, and HTTP requests.

2. **Middleware Support**:
   - Easily add functionality like logging, request parsing, authentication, etc.

3. **Routing**:
   - Cleanly organize different paths (`/home`, `/about`) and their functionality.

4. **Flexibility**:
   - Build anything from simple apps to full-scale RESTful APIs.

5. **Large Ecosystem**:
   - Tons of pre-built middleware and plugins are available in the npm ecosystem.

---

#### **Setting Up Express**

1. **Initialize a Project**:
   ```bash
   mkdir my-express-app
   cd my-express-app
   npm init -y
   npm install express
   ```

2. **Create `server.js`**:
   - This file is where your Express server logic will live.

---

#### **Routing in Express.js**

Routing is how your app responds to HTTP requests (like `GET`, `POST`) on specific URLs.

1. **Basic Routing Example**:
   ```javascript
   const express = require('express');
   const app = express();

   app.get('/', (req, res) => {
       res.send('Welcome to Express.js!');
   });

   app.get('/about', (req, res) => {
       res.send('This is the About page.');
   });

   app.listen(3000, () => {
       console.log('Server is running on http://localhost:3000');
   });
   ```

2. **Key Components**:
   - `app.get()` handles `GET` requests for a specific route.
   - `req` (request) contains information sent by the client.
   - `res` (response) is used to send data back to the client.

---

#### **Handling Requests (req) and Responses (res)**

1. **Request (`req`)**:
   - Contains data sent by the client (like query parameters, request body).
   - Examples:
     ```javascript
     app.get('/greet', (req, res) => {
         const name = req.query.name || 'Guest'; // Query param: ?name=John
         res.send(`Hello, ${name}!`);
     });
     ```

2. **Response (`res`)**:
   - Sends data back to the client.
   - Common methods:
     - `res.send()` – Sends plain text or HTML.
     - `res.json()` – Sends JSON data.
     - `res.status()` – Sets the HTTP status code.

   Example:
   ```javascript
   app.post('/data', (req, res) => {
       res.status(201).json({ message: 'Data created successfully!' });
   });
   ```

---

#### **Middleware in Routing**

Middleware is used to add additional functionality between the request and the response.

Example:
```javascript
const express = require('express');
const app = express();

app.use((req, res, next) => {
    console.log(`${req.method} request for ${req.url}`);
    next(); // Move to the next middleware/route
});

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});
```

---

#### **Final Full Example**
```javascript
const express = require('express');
const app = express();

// Middleware
app.use(express.json()); // Parses JSON requests

// Routes
app.get('/', (req, res) => {
    res.send('Welcome to Express.js Basics!');
});

app.get('/users', (req, res) => {
    res.json([{ id: 1, name: 'John' }, { id: 2, name: 'Doe' }]);
});

app.post('/users', (req, res) => {
    const newUser = req.body;
    res.status(201).json({ message: 'User created', user: newUser });
});

// Start server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
```

---

#### **Conclusion**
- **Express.js** simplifies building servers and APIs with Node.js.
- It provides powerful tools for routing, handling requests/responses, and adding middleware.
- With its flexibility and ease of use, it's a go-to framework for backend development.


### **Middleware in Express.js**

Middleware is a **function** that executes between the **request** and the **response**. It can:
- Modify the request or response objects.
- End the request-response cycle.
- Call the next middleware function in the stack.

---

### **Why Use Middleware?**

1. Add functionality to your application (e.g., logging, authentication).
2. Centralize repetitive tasks (e.g., parsing JSON, handling errors).
3. Enhance code organization and readability.

---

### **Types of Middleware**

1. **Built-in Middleware**: Provided by Express.
   - `express.json()`: Parses JSON data.
   - `express.urlencoded()`: Parses URL-encoded data.
2. **Third-party Middleware**: Installed via npm.
   - Example: `morgan` for logging.
3. **Custom Middleware**: Middleware you define yourself.

---

### **Creating and Using Middleware**

Here’s how middleware works in Express.js:

1. **Basic Middleware Example**:
   ```javascript
   const express = require('express');
   const app = express();

   // Custom Middleware
   const logger = (req, res, next) => {
       console.log(`${req.method} request to ${req.url}`);
       next(); // Pass control to the next middleware/route handler
   };

   // Use the middleware
   app.use(logger);

   app.get('/', (req, res) => {
       res.send('Home Page');
   });

   app.listen(3000, () => {
       console.log('Server is running on http://localhost:3000');
   });
   ```
   **Output** (on visiting `/`):
   ```
   GET request to /
   ```

---

### **Request Logging Middleware**

Use the third-party middleware `morgan` for detailed request logging.

1. Install `morgan`:
   ```bash
   npm install morgan
   ```

2. Use it in your app:
   ```javascript
   const morgan = require('morgan');

   // Use Morgan for logging
   app.use(morgan('dev')); // Logs method, URL, status code, and response time
   ```

   **Example Log**:
   ```
   GET / 200 7.043 ms
   ```

---

### **Parsing Middleware**

Express provides built-in middleware for parsing incoming data.

1. **Parse JSON**:
   ```javascript
   app.use(express.json());
   ```

   Example:
   ```javascript
   app.post('/data', (req, res) => {
       console.log(req.body); // Logs parsed JSON data
       res.json({ message: 'Data received', data: req.body });
   });
   ```

   **Request**:
   ```
   POST /data
   Content-Type: application/json

   {
       "name": "John",
       "age": 30
   }
   ```

   **Response**:
   ```json
   {
       "message": "Data received",
       "data": { "name": "John", "age": 30 }
   }
   ```

2. **Parse URL-encoded Data**:
   ```javascript
   app.use(express.urlencoded({ extended: true }));
   ```

   Example:
   ```javascript
   app.post('/form', (req, res) => {
       console.log(req.body); // Logs parsed URL-encoded form data
       res.send('Form data received');
   });
   ```

---

### **Chaining Multiple Middleware**

Middleware functions can be chained together:
```javascript
app.use((req, res, next) => {
    console.log('Middleware 1');
    next();
});

app.use((req, res, next) => {
    console.log('Middleware 2');
    next();
});

app.get('/', (req, res) => {
    res.send('Middleware chaining example');
});
```

**Output** (on visiting `/`):
```
Middleware 1
Middleware 2
```

---

### **Complete Example with Logging and Parsing**

```javascript
const express = require('express');
const morgan = require('morgan');

const app = express();
const PORT = 3000;

// Middleware: Logging
app.use(morgan('dev'));

// Middleware: Parsing JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware: Custom Logger
app.use((req, res, next) => {
    console.log(`Custom Logger: ${req.method} ${req.url}`);
    next();
});

// Route: GET
app.get('/', (req, res) => {
    res.send('Welcome to the middleware example!');
});

// Route: POST
app.post('/data', (req, res) => {
    console.log('Request Body:', req.body);
    res.json({ message: 'Data received', data: req.body });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
```

---

### **Summary**
1. Middleware functions handle and modify requests/responses.
2. Use **built-in** (e.g., `express.json()`), **third-party** (e.g., `morgan`), or **custom** middleware.
3. Middleware improves code reusability and scalability.
4. `next()` is essential to pass control to the next middleware or route.

You’ve now learned how to create and use middleware effectively! 🎉



### **Explanation: Basic API Development with CRUD Endpoints**

---

#### **What’s Happening in the Code?**

1. **Modules and Middleware**:
   - **`express`**: Framework for building APIs.
   - **`body-parser`**: Middleware to parse JSON in request bodies.
   - **`morgan`**: Logs details about incoming requests.

2. **Sample Data**:
   - `items` is an array of objects representing items for CRUD operations. Each object has `id`, `name`, and `description`.

3. **Routes**:
   - Routes define the paths and operations of your API:
     - `GET`: Fetch data.
     - `POST`: Create new data.
     - `PUT`: Update existing data.
     - `DELETE`: Remove data.

---

### **CRUD Routes**

#### **1. Home Route**
```javascript
app.get('/', (req, res) => {
    res.send('Welcome to Express.js Basics!');
});
```
- **Purpose**: Provides a landing message for the API.

---

#### **2. GET All Items**
```javascript
app.get('/items', (req, res) => {
    res.json(items);
});
```
- **Purpose**: Returns the list of all items in JSON format.

---

#### **3. GET Item by ID**
```javascript
app.get('/items/:id', (req, res) => {
    const { id } = req.params;
    const item = items.find(i => i.id === parseInt(id));
    if (item) {
        res.json(item);
    } else {
        res.status(404).json({ message: 'Item not found' });
    }
});
```
- **Purpose**: Fetches a single item using its `id` from the URL.
- **Error Handling**: Responds with a `404` status if the item is not found.

---

#### **4. POST - Create a New Item**
```javascript
app.post('/items', (req, res) => {
    const { name, description } = req.body;
    const newItem = {
        id: items.length + 1,
        name,
        description,
    };
    items.push(newItem);
    res.status(201).json(newItem);
});
```
- **Purpose**: Adds a new item to the `items` array.
- **Body**: Requires `name` and `description` fields in the request body.
- **Response**: Sends back the newly created item with a `201` status.

---

#### **5. PUT - Update an Existing Item**
```javascript
app.put('/items/:id', (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;
    const item = items.find(i => i.id === parseInt(id));
    if (item) {
        item.name = name || item.name;
        item.description = description || item.description;
        res.json(item);
    } else {
        res.status(404).json({ message: 'Item not found' });
    }
});
```
- **Purpose**: Updates the `name` and/or `description` of an item using its `id`.
- **Error Handling**: Responds with a `404` status if the item does not exist.

---

#### **6. DELETE - Remove an Item**
```javascript
app.delete('/items/:id', (req, res) => {
    const { id } = req.params;
    const index = items.findIndex(i => i.id === parseInt(id));
    if (index !== -1) {
        items.splice(index, 1);
        res.json({ message: 'Item deleted successfully' });
    } else {
        res.status(404).json({ message: 'Item not found' });
    }
});
```
- **Purpose**: Removes an item from the `items` array using its `id`.
- **Error Handling**: Responds with a `404` status if the item does not exist.

---

### **Project Structure**
Here’s how you might structure this project for larger applications:

```
express-app/
├── server.js            # Main entry point
├── routes/
│   └── items.js         # Item routes (GET, POST, PUT, DELETE)
├── middleware/
│   └── logger.js        # Custom middleware (e.g., request logging)
├── models/
│   └── item.js          # Item data model (if using a database)
└── package.json         # Project dependencies and scripts
```

---

### **Testing the API**
You can test the API using:
1. **Postman**: GUI tool to test HTTP requests.
2. **curl**: Command-line tool for HTTP requests.
   - Example:
     ```bash
     curl -X GET http://localhost:3000/items
     curl -X POST http://localhost:3000/items -H "Content-Type: application/json" -d '{"name":"New Item", "description":"A new item"}'
     ```

---

### **Summary**
- **Express.js** simplifies CRUD API development.
- **Middleware** like `body-parser` and `morgan` enhance functionality.
- Proper routing and error handling improve usability and reliability.
- Extend this foundation for more complex applications using modular project structures.