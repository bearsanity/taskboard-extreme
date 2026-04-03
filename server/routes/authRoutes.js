const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = require('express').Router()

//============================= Controllers ============================= 
const signUp = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = new User({ name, email, password });
       
        await user.save();
        //after creating the user we now have the id
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
       //without the token, the user wont be able to verify/perform any actions
        res.status(201).json({ message: 'Sign up succesful', token });
    } catch (error) {
        console.error('Sign up failed', error.message);
        res.status(400).json('Sign up unsuccesful');
    }
};

const login = async (req, res) => {
    try {
        const { email, password} = req.body;
        const user = await User.findOne({ email: email });

        if (!user) {
            return res.status(404).json({ message: 'No user found with that email'});
        };
        if (!(await user.isValidPassword(password))) {
            return res.status(401).json({ message: 'Password was incorrect' })
        }
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
        res.status(201).json({ message: 'Login succesful', token });
        
    } catch (err) {
        res.status(500).json({message: "Failed to login", error: err.message});
    }
};


//============================= Routes ============================= 
router.post('/signup', signUp);
router.post('/login', login);

module.exports = router