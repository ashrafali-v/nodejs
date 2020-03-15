const User = require('../model/User');
const { registerValidation } = require('../../validation');
const advocatesList = async () => {
    //res.send("hiiii");   
      const users = await User.find();
      return users;
  
};

const advocate = async (req) => {
    //res.send("hiiii");   
      const users = await User.findById(req.params.userId);
      return users;
  
};
const advocateDelete = async (req) => {
    //res.send("hiiii");   
    const user = await User.deleteOne({_id:req.params.userId});
    return user;
  
};
const addUser = async (req,res) => {
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
    const savedUser = await user.save();
   
    return savedUser;
};
module.exports = {advocatesList,advocate,advocateDelete,addUser};