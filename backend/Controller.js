const repo = require("./repo")
const jwt = require("jsonwebtoken")
const model = require("./model")
const nodemailer = require("nodemailer");

var globalOTP = 0
function generateOTP() {
    var minm = 100000;
    var maxm = 999999;
    return Math.floor(Math
        .random() * (maxm - minm + 1)) + minm;
}
const ChangePassword = (req, res) => {
    repo.ChangePassword(req.body).then(data => {
        res.send(data)
    })
}

//NODEMAILER
async function SendMail(email, message) {
    console.log(email, message)
    // configure transporter
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,//587,
        secure: false,  //for port 465 secure must be true
        requireTLS: true,
        auth: {
            user: "wakeuparnie7654321@gmail.com",
            pass: "kjowhquuqbgwzhkc"
        }
    })
    // configure mail message
    let maildata = {
        from: 'wakeuparnie7654321@gmail.com',
        to: email,
        subject: "Resume Builder",
        html: `
        <!DOCTYPE html>
        <html lang="en">
        
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <!-- CSS only -->
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/css/bootstrap.min.css" rel="stylesheet"
                integrity="sha384-iYQeCzEYFbKjA/T2uDLTpkwGzCiq6soy8tYaI1GyVh/UjpbCx/TYkiZhlZB6+fzT" crossorigin="anonymous">
            <title>OTP</title>
        </head>
        
        <body class="bg-light">
            <div style="height: 100%;width: 100%;">
                <div style="margin-top: 50px;">
                    <div style="display:flex;justify-content:start;margin-top:4px;margin-left:20px;">
        
                        <h1 style="font-family:Candara;font-weight:bold;color:rgb(103, 105, 109);font-size: 30px;margin-left: -10px;"
                            class="mt-2">
                            <img class="" class="display:flex;"
                                src="https://cdn1.iconfinder.com/data/icons/corporate-and-business/64/24-Employee-512.png"
                                height="50" />
                            Resume Builder
                        </h1>
                    </div>
                    <div style="display:flex;margin-left: 38%;">
                    </div>
                    <div style="display:flex;margin-left: 17%;" class="mt-3">
                        <h2 style="color:rgb(36, 71, 117);font-weight: bold;font-size: 40px;">Hi, your OTP</h2>
                    </div>
                    <div style="display:block;margin-left: 37%;" class="mt-4">
                        <h2 id="otp">${message}</h2>
                    </div>
                </div>
            </div>
        </body>
        
        </html>
        `
    };
    //send mail
    let msg = await transporter.sendMail(maildata);
    console.log(`Message Sent : ${msg.messageId}`)
    console.log(`Preview url : ${nodemailer.getTestMessageUrl(msg)}`)
}

const checkMail = (userdata) => {
    console.log(userdata);
    return new Promise((resolve, reject) => {
        model.findOne({ email: userdata }, (err, user) => {
            if (!user) {
                resolve({ status: 409, message: 'User with specified email doesnt exist! You can register first' });
            } else if (user) {
                resolve({ status: 200, message: "User Found", data: userdata })
            }
            else {
                throw err
            }
        });
    });
}
const OtpVerification = (req, res) => {
    if (req.body.otp.toString() != globalOTP) {
        res.send({ status: "400", message: "Invalid OTP" })
    }
    else {
        globalOTP = generateOTP()
        res.send({ status: 200, msg: "otp verified" })
    }
}

const ResetPassword = (req, res) => {
    console.log("logging in")
   
    repo.ResetPassword(req.body).then(data => {
        if (data.status === 400) {
            res.send({ status: 400, msg: "Passowords dont match" })
        }
        else if (data.status === 200) {
            res.send({ status: 200, msg: "Password reset succesffuly" })
        }
    })
    console.log("password reset")
   

}

const ForgotPassword = (req, res) => {
    var otp = generateOTP().toString();
    globalOTP = otp
    let result = checkMail(req.body.email)
    result.then(data => {
        if (data.status === 200) {
            SendMail(req.body.email, otp)
            res.send({ status: 200, msg: "otp sent" });

        }
        else if (data.status === 409) {
            console.log("No User exists")
            res.send({ status: 409, msg: "No user with that mail is registered" });
        }
        else {
            throw err
        }
    })
}



const Login = (req, res) => {
    let token = jwt.sign(req.body, 'secret', { expiresIn: '3hr' })
    res.send({ status: 200, token: token, message: "Logged In...", session: req.session.passport.user.id , fname: req.user.firstname,lname:req.user.lastname})
}

const Authenticate = (req, res) => {
    let result = jwt.verify(req.headers.authorization, 'secret', (err, decode) => {
        if (decode !== undefined)
            return decode
        else
            return err
    })
    if (result instanceof Error)
        res.send({ status: 401, isAuthenticated: false })
    else {
        if (req.isAuthenticated())
            res.send({ status: 200, isAuthenticated: true })
        else
            res.send({ status: 401, isAuthenticated: false })
    }

}

const Home = (req, res) => {
    res.send("Hello")
}

const SignUp = (req, res) => {
    repo.SignUp(req.body).then(data => res.send(data))
}

const Logout = (req, res) => {
    req.logout((err) => {
        if(req.session)
        req.session.destroy()
        if (!err) {
            res.send({ msg: 'loggedout', status: 200 })
        }
    })
}

module.exports = { Login, Home, SignUp, Authenticate, ChangePassword, ResetPassword, ForgotPassword, OtpVerification, Logout }

