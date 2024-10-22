const User = require('../models/userModel')

exports.createUser = async (req, res) => {
    const { name, email } = req.body;
    
    try {
      const userId = await User.create(name, email);
      res.status(201).json({ message: 'User added successfully', userId });
    } catch (error) {
      console.error('Error adding doctor:', error);
      res.status(500).json({ message: 'Error adding doctor' });
    }
  };

exports.getAllUsers = async (req,res) => {
  try {
    const users = await User.getAll();
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Error fetching users' });
  }
}