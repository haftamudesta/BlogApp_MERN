const express=require('express');
const route=express.Router();
const {signUp,signIn,signInWithGoogle}=require('../controllers/AuthoController.js')

route.route('/signup').post(signUp);//option one
route.post('/signin',signIn);//option two
route.post('/google',signInWithGoogle);

module.exports=route;