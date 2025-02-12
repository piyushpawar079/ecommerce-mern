import mongoose from 'mongoose'
import { User } from '../models/user.models.js'


const registerUser = async (req, res) => {

    const { username, email, password, role } = req.body

    if (!username || !email || !password || !role) {
        throw console.error('send valid data');
         
    }

    const existingUser = await User.findOne({
        $or: [{ username }, { email }]
    })

    if (existingUser) {
        throw console.error('user already exists');
         
    }

    const user = {
        username: username.toLowerCase(),
        email: email.toLowerCase(), 
        password: password.toLowerCase(),
        role: role.toLowerCase()
    }

    const result = await User.create(user)

    const createdUser = await User.findById(result._id).select(
        "-password"
    )

    if (!createdUser) {
        throw console.error('User not created');
         
    }

    return res.status(200).json({
        msg: 'user creted successfully',
        data: createdUser
    })

}


const login = async (req, res) => {

    const { email, password, role } = req.body

    if (!email || !password || !role) {
        throw new console.error('Invalid data provided');
        
    }

    const user = await User.findOne({
        email: email,
        $expr: {
            $eq: ["$role", role]
        }
      });

    if (!user) {
        throw new console.error(`${role} does not exist`);
 
    }

    return res.status(201).json({
        msg: `${role} logged in Successfully`,
        data: user
    })
}


const getUser = async (req, res) => {
    try {
      const { Id } = req.body;
  
      if (!Id) {
        return res.status(400).json({ msg: 'User ID is required' });
      }
  
      const user = await User.findOne({ _id: Id });
  
      if (!user) {
        return res.status(404).json({ msg: `User with ID ${Id} not found` });
      }
  
      res.status(200).json({ msg: user });
    } catch (error) {
      console.error(`Error while fetching user: ${error.message}`);
      res.status(500).json({ msg: 'Internal server error' });
    }
  };
  

export {
    registerUser,
    login,
    getUser
}
