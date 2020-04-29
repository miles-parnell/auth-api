const router = require('express').Router();
const User = require('../model/User');
const { registerValidation, loginValidation } = require('../model/Validation');
const crypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//########################################################################################
// this route is for sending user information to the DB
// it will also send a "savedUser" object
//########################################################################################

router.post('/register', async (req, res) => {
    // checking to see if info made it through the auth function
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //checking DB to see if user already is in the DB
    const userExists = await User.findOne({ email: req.body.email });
    if (userExists) return res.status(400).send('User already exists');

    // time to hash that password so no mean people can steal it :)
    //salt is like the seed to use to hash the password
    const salt = await crypt.genSalt(10);
    const hashedPassword = await crypt.hash(req.body.password, salt);

    //making a new user
    const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword
    });

    try {
        // try to send the user info from above to db,
        // if it works it will send the user _id
        // if there is an error it will send the error
        const savedUser = await user.save();
        res.send({ user: user._id });
    } catch (err) {
        res.status(400).send(err)
    }
});

router.post('/login', async (req, res) => {
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const userExists = await User.findOne({ email: req.body.email });
    if (!userExists) return res.status(400).send('email does not exist');

    const validPassword = await crypt.compare(req.body.password, userExists.password);
    if (!validPassword) return res.status(400).send('wrong password');

    // sends a token  
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN);
    res.header('auth-token', token).send(token);
});

module.exports = router;