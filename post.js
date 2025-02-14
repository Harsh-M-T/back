const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const User = require('./models/User'); 
const logger = require('./logger');
 
require('dotenv').config();

const app=express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const PORT = process.env.PORT || 8080;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://gtc:gtc@clusterfirst.s6chp.mongodb.net/?retryWrites=true&w=majority&appName=ClusterFirst';

async function connectDB() {
    try {
      await mongoose.connect(MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      logger.info('Connected to MongoDB');
    } catch (error) {
      logger.error('Error connecting to MongoDB:', error);
      process.exit(1);
    }
  }

app.post('/create-user', async (req, res) => {
    try {
      const { username, email, firstName, lastName, profilePic } = req.body;
  
      if (!username || !email) {
        return res.status(400).json({ message: 'Username and email are required' });
      }
  
      const newUser = new User({
        username,
        email,
        firstName,
        lastName,
        profilePic,
      });
  
      const savedUser = await newUser.save();
  
      res.status(201).json({ message: 'User created successfully', user: savedUser });
    } catch (error) {
      logger.error('Error creating user:', error);
      res.status(500).json({ message: 'Error creating user', error: error.message });
    }
  });