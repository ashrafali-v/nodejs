const express = require('express');
const jwt = require('jsonwebtoken');
const dashboardController = require('./dashboard.controller');

const router = express.Router();

router.get('/api/user', dashboardController.advocates);
//router.post('/api/user/add',dashboardController.addAdvocate);
router.get('/api/user/:userId',dashboardController.advocate);
router.delete('/api/user/:userId',dashboardController.advocateUserDelete);


// function authenticateToken(req,res,next){
//     const authHeader = req.headers['authorization']
//     const token = authHeader && authHeader.split(' ')[1]
//     if(token == null) return res.sendStatus(403)
//     jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user)=>{
//         if(err) return res.sendStatus(403);
//         req.user = user.name;
//         next()
//     })
// }
module.exports = router;