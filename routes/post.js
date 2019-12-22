const router = require('express').Router();
//const { registerValidation } = require('../validation');

router.post('/', async (req, res) => {
    //const { error } = registerValidation(req.body);
    //if (error) return res.status(400).send(error.details[0].message);
    // try {
    //     const users = await User.find();
    //     res.send(users);
    // } catch (err) {
    //     res.status(400).send(err);
    // }
    console.log(req.body);
    res.json(req.body);
});

module.exports = router;