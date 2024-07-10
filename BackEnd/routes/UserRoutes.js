const express=require('express');
const {test,updateUser,deleteUser,signOut,getUsers,getUser}=require('../controllers/UserController.js')
const route=express.Router();
const verifyToken=require('../utils/verifyUser');

route.get('/test',test);
route.put('/update/:userId',verifyToken,updateUser);
route.delete('/delete/:userId',verifyToken,deleteUser);
route.post('/signout',signOut);
route.get('/getUsers',verifyToken,getUsers);
route.get('/:userId',getUser)

module.exports=route;