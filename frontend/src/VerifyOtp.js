import React, { useState } from 'react'
import api from './config'
import { useNavigate } from 'react-router-dom'
import { useReducer } from "react";
import reducer from './Reducers';
import { initialState } from './Reducers';
import AppContext from './ResumeData/appcontext';
import mail from "./images/mail.gif"
import otpimage from "./images/otp.webp"
import "./Login.css"
import ok from "./images/ok.gif"
import bg from './images/bg.jpg'
import cover from './images/cover.jpeg'


export default function VerifyOtp() {
    const nav = useNavigate()
    if (localStorage.getItem("femail") === null) {
        nav('/login')
    }
    const [caption, setcaption] = useState('Enter OTP')
    const [smail, setsmail] = useState(false)
    const [show, setshow] = useState(true)
    const [timage, settimage] = useState("https://img.freepik.com/free-vector/business-team-finding-solution-together-group-with-key-unlocking-lock_74855-16052.jpg?w=996&t=st=1664509546~exp=1664510146~hmac=2fb246c28a93a7d28f50c4fc21d2f33fcb856d167a1fa31697055b3451b4918f")
    const [otp, setotp] = React.useState('')
    const { state, dispatch } = React.useContext(AppContext);
    const Verify = () => {
        fetch(`${api.auth}/otpverify`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({
                otp: otp
            })
        }).then(data => data.json()).then(data => {
            if (data.status === 200) {
                setshow(false)
                setcaption("Success")
                settimage(ok)
                setTimeout(() => {
                    nav("/resetpassword")
                }, 600)

            }
            else {
                settimage(otpimage)
                setcaption("Invalid OTP !")
            }
        }
        )
    }
    const focusotp = (e) => {
        let em = document.getElementById(e.target.id)
        // settimage(mail)
        setcaption("Enter OTP")
        em.style.backgroundColor = "pink"
    }

    const blurotp = (e) => {
        // setcaption("Resume Builder")
        // settimage("https://img.freepik.com/free-vector/business-team-finding-solution-together-group-with-key-unlocking-lock_74855-16052.jpg?w=996&t=st=1664509546~exp=1664510146~hmac=2fb246c28a93a7d28f50c4fc21d2f33fcb856d167a1fa31697055b3451b4918f")
        setcaption("Enter OTP")
        let em = document.getElementById(e.target.id)
        em.style.backgroundColor = "white"
    }
    const resend = () => {
        fetch(`${api.auth}/forgotpassword`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({
                email: localStorage.getItem("femail")
            })
        }).then(data => data.json()).then(data => {
            settimage("https://img.freepik.com/free-vector/business-team-finding-solution-together-group-with-key-unlocking-lock_74855-16052.jpg?w=996&t=st=1664509546~exp=1664510146~hmac=2fb246c28a93a7d28f50c4fc21d2f33fcb856d167a1fa31697055b3451b4918f")
            setcaption("Otp Sent!")
            setsmail(true)
        })
    }
    return (
        <div className='bg-dark main' style={{}}>
            <div className='container d-flex justify-content-center align-items-center' style={{ width: '100%' }}>
                <div className="login row d-flex justify-content-center align-items-center border rounded bg-light" style={{ height: "570px", marginTop: '180px' }}>
                    <div className="col-md-12 col-12 col-lg-12 d-flex justify-content-center mt-3" style={{ marginLeft: "0px" }}>
                        <h2 className='' style={{ fontFamily: '', marginTop: "-4px", marginBottom: "-10px" }}>OTP verification</h2>
                    </div>
                    <div className="col-md-12">
                        <div className=" d-flex justify-content-center" style={{ marginTop: '-50px' }}>
                            <img src={timage} alt="" width="200" height="130" className="d-flex align-items-center me-2 mt-3" />
                        </div>
                        <h2 className='d-flex justify-content-center mt-3 '>{caption}</h2>
                    </div>
                    <div className='' style={{ marginTop: '-60px' }}>
                        {
                            show ?


                                <form >

                                    <div className="col-md-12 col-12 col-lg-12 d-flex justify-content-center mt-1" >
                                        <input className='rounded' type="number" value={otp} id="otp" onFocus={focusotp} onBlur={blurotp} style={{ width: "250px", height: "50px", border: "3px solid gray", borderRadius: "5px" }} onChange={e => setotp(e.target.value)} placeholder='  OTP' />
                                    </div>


                                    <div className="col-md-12 col-12 col-lg-12 d-flex justify-content-center mt-4 mb-3">
                                        <button id="log" className="btn" style={{ fontWeight: "bold" }} type="button" onClick={Verify}>Verify</button>
                                    </div>
                                    <div className="col-md-12 col-12 col-lg-12 d-flex justify-content-center mt-4 mb-2">
                                        <h5>Not received ? <a onClick={e => resend()} style={{ color: 'blue' }}>Send new OTP</a></h5>
                                    </div>
                                    {
                                        smail ?
                                            <div className="col-md-12 col-12 col-lg-12 d-flex justify-content-center mt-1 mb-4">
                                                <h5 style={{ color: "rgb(196, 80, 80)" }}> New Otp sent to {localStorage.getItem("femail")} </h5>
                                            </div>
                                            : null
                                    }

                                </form>
                                : null
                        }
                    </div>
                </div>
            </div >
        </div>

    )
}
