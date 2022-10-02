const express = require('express');
const router =express.Router();
const {GetProfiles,AddProfile, UpdateProfile, GetProfile, DeleteProfile} = require('../controller/profilecontroller');

// router.get('/profile',GetProfiles);
router.get('/profile/:id',GetProfile);
router.delete('/deleteprofile/:id',DeleteProfile);
router.get('/profiles/:mail',GetProfiles);
router.post('/addprofile/:id/:email',AddProfile);
router.put('/editprofile/:email',UpdateProfile )


module.exports = router; 