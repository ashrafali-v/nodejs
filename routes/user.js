const router = require('express').Router();
const User = require('../model/User');
const { registerValidation } = require('../validation');

router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(400).send(err);
    }
});
router.post('/register', async (req, res) => {
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //if the user already there
    const emailExist = await User.findOne({email:req.body.email});
    if(emailExist) return res.status(400).send("User already exist");

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });
    try {
        const savedUser = await user.save();
        res.json(savedUser);
    } catch (err) {
        res.json({Message:err});
    }
});
module.exports = router;