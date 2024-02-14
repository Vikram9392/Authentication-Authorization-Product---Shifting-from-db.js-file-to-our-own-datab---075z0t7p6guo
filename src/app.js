const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const app = express();
const secretKey = 'newtonSchool';

app.use(bodyParser.json());

// Mock user data (Replace with actual user authentication logic)
const users = [
  { id: 1, username: 'user1', password: 'password1' },
  { id: 2, username: 'user2', password: 'password2' },
  // Define user objects here
];

// Mock product data (Replace with actual product retrieval logic)
const products = [
  { id: 1, name: 'Product A', price: 10 },
  { id: 2, name: 'Product B', price: 20 },
  // Define product objects here
];

// Authentication endpoint (Students should implement this)
app.post('/login', (req, res) => {
  const{username,password}=req.body;
  const user=users.find(entry=>entry.username===username&&entry.password===password)
  if(!user){
    res.status(401).json({message:"Authentication failed."})
  }
  // Implement user authentication logic here
  // If authentication is successful, generate a JWT token and send it in the response
  // Example token generation:
  const token = jwt.sign({ userId: user.id, username: user.username }, secretKey);
  res.status(201).json({ token });
});

// Product route (Students should implement this)
app.get('/product', (req, res) => {
  const token=req.headers.authorization.split(" ")[1]
  if(!token){
    res.status(401).json({message:"Authorization required."})
  }
  // Middleware to check for a valid JWT token
  // Implement JWT token verification logic here
  jwt.verify(token,secretKey,(err,decode)=>{
    if(err){
      res.status(401).json({message:"Invalid token",error:err.message})
    }
  })
  // If the token is valid, students can access product data and send it in the response
  // Example response:
  res.status(200).json({ message: 'Product data', products});
});

module.exports = app;
