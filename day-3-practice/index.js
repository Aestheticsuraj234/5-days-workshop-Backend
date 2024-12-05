const express = require("express");
const  morgan = require('morgan');
const bodyParser = require("body-parser")
const app = express();

app.use(morgan("dev"));
app.use(bodyParser.json())

const PORT = 8080;

const items = [
    {id:1 , name:"item-1" , description:"this is item-1"},
    {id:2 , name:"item-2" , description:"this is item-2"}
]

app.get("/" , (request , response)=>{
    response.send("Welcome to our Express.js Basics")
})

app.get("/item" , (req , res)=>{
    res.json(items)
})

app.get("/item/:id"  ,(req , res)=>{
    const {id} = req.params
    const item = items.find((i)=>i.id ===parseInt(id))

    if(item){
        res.status(200).json(item)
    }
    else{
        res.status(404).json({message:"Item not found"})
    }
} )


app.post("/items" , (req , res)=>{
    const {name , description} = req.body;
    const newItem = {
        id:items.length +1,
        name,
        description
    }
    items.push(newItem);
    res.status(201).json({
        success:true,
        data:items
    })
})

app.put('/items/:id', (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;
    const item = items.find(i => i.id === parseInt(id));
    if (item) {
        item.name = name || item.name;
        item.description = description || item.description;
        res.json({
            success:true,
            data:items
        });
    } else {
        res.status(404).json({ message: 'Item not found' });
    }
});


app.listen(PORT , ()=>{
    console.log(`Server is running at ${PORT}`)
})