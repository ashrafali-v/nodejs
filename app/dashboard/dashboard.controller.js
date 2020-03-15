const dashServ = require('./dashboard.service');
const { registerValidation } = require('../../validation');
const User = require('../model/User');
const advocates = async (req,res) => {
    //res.send("hiiii");
    try {
        const users = await dashServ.advocatesList();
        return (res.status(200).send(users));
    } catch (err) {
        res.status(400).send(err);
    }
};
const advocate = async (req,res) => {
    //res.send("hiiii");
    try {
        const users = await dashServ.advocate(req);
        return (res.status(200).send(users));
    } catch (err) {
        res.status(400).send(err);
    }
};
const advocateUserDelete = async (req,res) => {
    //res.send(req.params.userId);
    try {
        const users = await dashServ.advocateDelete(req);
        return (res.status(200).send(users));
    } catch (err) {
        res.status(400).send(err);
    }
};
const addAdvocate = async (req,res) => {
    console.log(req.body);
    try {
        const user = await dashServ.addUser(req);
        return (res.status(200).send(user));
    } catch (err) {
        res.status(400).send(err);
    }
};
module.exports = {advocates,advocate,advocateUserDelete,addAdvocate};