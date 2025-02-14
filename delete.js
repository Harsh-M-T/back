const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/User'); 
const logger = require('./logger');
const app = express();

app.delete('/delete-user/:userId', async (req, res) => {
    try {
      const { userId } = req.params;
  
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: 'Invalid user ID' });
      }
  
      const deletedUser = await User.findByIdAndDelete(userId);
  
      if (!deletedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.status(200).json({ message: 'User deleted successfully', user: deletedUser });
    } catch (error) {
      logger.error('Error deleting user:', error);
      res.status(500).json({ message: 'Error deleting user', error: error.message });
    }
  });