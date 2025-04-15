const express = require('express');
const bcrypt = require('bcrypt');
const User = require('./user');
const router = express.Router();

router.post('/add-users', async(req, res) => {
    const{ username, email, password } = req.body;
    if(!username || !email || !password)
        return res.status(400).json({ message: 'All fields are required!!'});

    try{
        const existing = await User.findOne({ email });
        if(existing)
            return res.status(409).json({ message: 'User already exists!!'});

        const hashed = await bcrypt.hash( password, 10);
        const user = new User({ username, email, password:hashed});
        await user.save();
        res.status(201).json({ message: 'User added'});
    }catch(error){
        res.status(500).json({ message: 'Error during registering'});
    }
});

router.get('/users', async(req, res) => {
    const users = await User.find();
    res.json(users);
});

router.put('/user/:id', async(req, res) => {
    const{ username, email } = req.body;
    try{
        const user = await User.findByIdAndUpdate(
            req.params.id,
            {username, email},
            {new: true, runValidators: true}
        );

        if(!user)
            return res.status(404).json({message:'User not found'});
        res.json({message:'User updated successfully', user});
    }catch(error){
        res.status(500).json({message: 'update failed', error: error.message});
    }
});

router.delete('user/:id', async(req, res) => {
    try{
        const deleted = await User.findByIdAndDelete(req.params.id);
        if(!delete)
            return res.status(404).json({message: 'User not found'})
        res.json({message: 'User deleted', user});
    }catch(err){
        res.status(500).json({message: 'delete failed'})
    }
});

module.exports = router;