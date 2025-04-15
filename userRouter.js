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

module.exports = router;