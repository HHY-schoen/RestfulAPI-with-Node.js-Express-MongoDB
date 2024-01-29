const express = require('express')
const mongoose = require('mongoose')
const Product = require('./models/productModel')
const app = express()

//specify json middleware
app.use(express.json())


//routes
app.get('/', function (req, res) {
  res.send('Hello World!!')
})

app.get('/products', async(req, res) => {
    try{
        const products = await Product.find()
        res.status(200).json(products)
    } catch(error) {
        console.log(error.message)
        res.status(500).json({message: error.message})
    }
})

app.get('/products/:id', async(req, res) => {
    try{
        const {id} = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
    } catch(error) {
        console.log(error.message)
        res.status(500).json({message: error.message})
    }
})

app.post('/products', async(req, res) => {
    try{
        const product = await Product.create(req.body)
        res.status(200).json(product)
    } catch(error) {
        console.log(error.message)
        res.status(500).json({message: error.message})
    }
})

//update product
app.put('/products/:id', async(req, res) => {
    try{
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
        //if can't find product in database
        if(!product) {
            return res.status(404).json({message:'product id ${id} does not exist'})
        }
        const updatedProduct = await Product.findById(id)
        res.status(200).json(updatedProduct);
    } catch(error) {
        console.log(error.message)
        res.status(500).json({message: error.message})
    }
})

app.delete('/products/:id', async(req, res) => {
    try{
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id);
        //if can't find product in database
        if(!product) {
            return res.status(404).json({message:'product id ${id} does not exist'})
        }
    } catch(error) {
        console.log(error.message)
        res.status(500).json({message: error.message})
    }
})


mongoose
.connect('mongodb+srv://bear:abc123456@cluster0.xrswxck.mongodb.net/Node-API?retryWrites=true&w=majority')
.then(() => {
    console.log('connected to mongodb')
    app.listen(3000, () => {
        console.log('node api app in running on port 3000')
    });    
}).catch((error) => {
    console.log(error)
}) 
