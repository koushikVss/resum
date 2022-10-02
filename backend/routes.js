const passport = require("passport")
const { Login,Home,SignUp,Authenticate,ChangePassword,OtpVerification, ResetPassword, ForgotPassword,Logout } = require("./Controller")

const router = require("express").Router()

router.post('/register', SignUp);
router.post('/login',passport.authenticate('local'),Login)
router.post('/authenticate',Authenticate)
router.post('/logout',Logout)
router.post("/forgotpassword", ForgotPassword)
router.post("/otpverify", OtpVerification)
router.post("/resetpassword", ResetPassword)
router.post("/changepassword", ChangePassword);

module.exports = router

