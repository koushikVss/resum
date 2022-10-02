import React, { useState } from 'react'
import api from './config'
import { useNavigate } from 'react-router-dom'
import { useReducer } from "react";
import reducer from './Reducers';
import { initialState } from './Reducers';
import AppContext from './ResumeData/appcontext';
import mail from "./images/mail.gif"
import "./Login.css"
import fgw from "./images/fgpw.png"
import bg from './images/bg.jpg'
import cover from './images/cover.jpeg'
import sendmail from "./images/sendmail.gif"


export default function EmailOtp() {
    const [caption, setcaption] = useState("Can't Remember... ")
    const [timage, settimage] = useState(fgw)
    const [show, setshow] = useState(true)
    const [email, setemail] = React.useState('')
    const [password, setpassword] = React.useState('')
    const { state, dispatch } = React.useContext(AppContext);
    const nav = useNavigate()
    const SendOtp = () => {
        fetch(`${api.auth}/forgotpassword`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({
                email: email
            })
        }).then(data => data.json()).then(data => {
            if (data.status === 200) {
                setshow(false)
                setcaption("Sending OTP...")
                settimage(sendmail)
                setTimeout(() => {
                    // settimage("https://th.bing.com/th/id/R.efe3a25d292b67f39cbc93bb10e0493e?rik=05sG%2f7XcuxOpUA&riu=http%3a%2f%2fwww.budgetsaresexy.com%2fimages%2fflying-email-gif.gif&ehk=X4CNKE0gjccQ4cgmkPKPR9%2byUU%2bvXTp3%2b9OawzfWlkg%3d&risl=&pid=ImgRaw&r=0")
                    settimage("https://cdn1.iconfinder.com/data/icons/e-mail-and-massage-outline/512/mail_email_envelope_interface_communucation_notification-512.png")
                    setcaption(`OTP sent!`)
                }, 2000)
                setTimeout(() => {
                    localStorage.setItem("femail",email)
                    nav("/verifyotp")
                }, 4000)
            }
            else {
                setcaption("Oops! Unregistered email...")
            }
        }
        )
    }
    const focusemail = (e) => {
        let em = document.getElementById(e.target.id)
        settimage(mail)
        setcaption("Enter Email")
        em.style.backgroundColor = "pink"
    }

    const bluremail = (e) => {
        setcaption("Can't Remember... ")
        settimage(fgw)
        let em = document.getElementById(e.target.id)
        em.style.backgroundColor = "white"
    }

    return (
        <div className='bg-dark main' style={{}}>
            <div className='container d-flex justify-content-center align-items-center' style={{ width: '100%' }}>
                <div className="login row d-flex justify-content-center align-items-center border rounded bg-light" style={{ height: "510px", marginTop: '180px' }}>
                    <div className="col-md-12 col-12 col-lg-12 d-flex justify-content-start mt-3" style={{ marginLeft: "30px" }}>

                        {
                            show ?
                                <h2 className='' style={{ fontFamily: '', marginTop: "-10px" }}>Forgot Password</h2>
                                :
                                null
                        }
                    </div>


                    <div className="col-md-12">
                        <div className=" d-flex justify-content-center" style={{ marginTop: '-50px' }}>
                            <img src={timage} alt="" width="130" height="130" className="d-flex align-items-center me-2 mt-3" />
                        </div>
                        <h2 className='d-flex justify-content-center mt-3 '>{caption}</h2>
                    </div>
                    <div className='' style={{ marginTop: '-40px' }}>
                        {
                            show ?
                                <form >
                                    <div className="col-md-12 col-12 col-lg-12 d-flex justify-content-center mt-3" >
                                        <input className='rounded' type="email" value={email} id="email" onFocus={focusemail} onBlur={bluremail} style={{ width: "250px", height: "50px", border: "3px solid gray", borderRadius: "5px" }} onChange={e => setemail(e.target.value)} placeholder='  Email' />
                                    </div>

                                    <div className="col-md-12 col-12 col-lg-12 d-flex justify-content-center mt-3 mb-3">
                                        <button id="log" className="btn" style={{ fontWeight: "bold" }} type="button" onClick={e => {
                                            setcaption("Checking...")
                                            SendOtp()
                                        }
                                        }>Send Otp</button>
                                    </div>
                                    <div className="col-md-12 col-12 col-lg-12 d-flex justify-content-center mt-4 mb-2">
                                        <h5>Got your password ? <a onClick={e => nav("/login")} style={{ color: 'blue' }}>Login Here</a></h5>
                                    </div>
                                </form>
                                : null
                        }
                    </div>
                </div>
            </div >
        </div >

    )
}
