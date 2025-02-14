const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const User = require('./models/User');
const logger = require('./logger'); 

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8080;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://gtc:gtc@clusterfirst.s6chp.mongodb.net/?retryWrites=true&w=majority&appName=ClusterFirst';

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // Parse JSON data
app.set('view engine', 'ejs'); // Use EJS for templating (optional)

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

function validateUpdates(updates) {
  const allowedUpdates = ['firstName', 'lastName', 'profilePic']; // Fields that can be updated
  const isValid = Object.keys(updates).every((key) => allowedUpdates.includes(key));
  if (!isValid) {
    throw new Error('Invalid updates! Only firstName, lastName, and profilePic can be updated.');
  }
}

async function updateUser(userId, updates) {
  try {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      throw new Error('Invalid user ID');
    }

    validateUpdates(updates);

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      updates,
      { new: true, runValidators: true } // Return the updated document and run schema validators
    );

    if (!updatedUser) {
      logger.warn(`User with ID ${userId} not found`);
      return null;
    }

    logger.info('User updated successfully:', updatedUser);
    return updatedUser;
  } catch (error) {
    logger.error('Error updating user:', error);
    throw error; 
  }
}


app.get('/update-user', (req, res) => {
  res.render('update-user'); // Render an EJS template (or serve static HTML)
});

// Handle form submission
app.post('/update-user', async (req, res) => {
  try {
    const { userId, firstName, lastName, profilePic } = req.body;

    const updates = {
      firstName,
      lastName,
      profilePic,
    };

    const result = await updateUser(userId, updates);
    if (result) {
      res.status(200).json({ message: 'User updated successfully', user: result });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Error updating user', error: error.message });
  }
});

async function startServer() {
  await connectDB(); 
  app.listen(PORT, () => {
    logger.info(`Server is running on http://localhost:${PORT}`);
  });
}

startServer();