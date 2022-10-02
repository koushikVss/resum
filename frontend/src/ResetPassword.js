import React, { useState } from 'react'
import api from './config'
import { useNavigate } from 'react-router-dom'
import { useReducer } from "react";
import reducer from './Reducers';
import { initialState } from './Reducers';
import AppContext from './ResumeData/appcontext';
import mail from "./images/mail.gif"
import think from "./images/think.png"
import "./Login.css"
import ok from "./images/ok.gif"
import bg from './images/bg.jpg'
import cover from './images/cover.jpeg'

export default function ResetPassword() {
    const nav = useNavigate()
    if (localStorage.getItem("femail") === null) {
        nav('/login')
    }
    const [caption, setcaption] = useState('Hard to know easy to remember')
    const [timage, settimage] = useState(think)
    const [newpassword, setnewpassword] = React.useState('')
    const [show, setshow] = useState(true)
    const [confirmpassword, setconfirmpassword] = React.useState('')
    const { state, dispatch } = React.useContext(AppContext);
    const Reset = () => {

        fetch(`${api.auth}/resetpassword`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({
                email: localStorage.getItem("femail"),
                newpassword: newpassword,
                confirmpassword: confirmpassword
            })
        }).then(data => data.json()).then(data => {
            if (data.status === 200) {
                setshow(false)
                setcaption("")
                settimage(ok)
                setTimeout(() => {
                    localStorage.clear()
                    nav("/login")
                }, 1100)
            }
            else {
                setcaption("Passwords don't match!")

            }
        }
        )
        // }
    }
    const focusnew = (e) => {
        let em = document.getElementById(e.target.id)
        // settimage(think)
        setcaption("New Password")
        em.style.backgroundColor = "pink"
    }

    const blurnew = (e) => {
        setcaption("Hard to know easy to remember")
        // settimage(think)
        let em = document.getElementById(e.target.id)
        em.style.backgroundColor = "white"
    }
    const focusconfirm = (e) => {
        // settimage(think)
        let em = document.getElementById(e.target.id)
        setcaption("Confirm Password")
        em.style.backgroundColor = "pink"
    }

    const blurconfirm = (e) => {
        setcaption("Hard to know easy to remember")
        // settimage(think)
        let em = document.getElementById(e.target.id)
        em.style.backgroundColor = "white"
    }
    return (
        <div className='bg-dark main' style={{}}>
            <div className='container d-flex justify-content-center align-items-center' style={{ width: '100%' }}>
                <div className="login row d-flex justify-content-center align-items-center border rounded bg-light" style={{ height: "530px", marginTop: '180px' }}>
                    <div className="col-md-12 col-12 col-lg-12 d-flex justify-content-start mt-3" style={{ marginLeft: "50px" }}>
                        {show ?
                            <h2 className='' style={{ fontFamily: '', marginTop: "-4px", marginBottom: "10px" }}>Reset Password</h2>

                            : null}
                    </div>
                    <div className="col-md-12">
                        <div className=" d-flex justify-content-center" style={{ marginTop: '-30px' }}>
                            {
                                show ?
                                    <img src={timage} alt="" width="150" height="150" className="d-flex align-items-center me-2 mt-3" />
                                    :
                                    <img src={timage} alt="" width="200" height="150" className="d-flex align-items-center me-2 mt-3" />

                            }
                        </div>
                        <h4 className='d-flex justify-content-center mt-3 '>{caption}</h4>
                    </div>
                    <div className='' style={{ marginTop: '-40px' }}>
                        {
                            show ?
                                <form >
                                    <div className="col-md-12 col-12 col-lg-12 d-flex justify-content-center mt-4" >
                                        <input className='rounded' type="password" value={newpassword} id="newpassword" onFocus={focusnew} onBlur={blurnew} style={{ width: "250px", height: "50px", border: "3px solid gray", borderRadius: "5px" }} onChange={e => setnewpassword(e.target.value)} placeholder='  New Password' />
                                    </div>
                                    <div className="col-md-12 col-12 col-lg-12 d-flex justify-content-center mt-4">
                                        <input className='rounded' type="password" value={confirmpassword} id="confirmpassword" onFocus={focusconfirm} onBlur={blurconfirm} style={{ width: "250px", height: "45px", border: "3px solid gray ", borderRadius: "5px" }} onChange={e => setconfirmpassword(e.target.value)} placeholder='  Confirm Password' />
                                    </div >

                                    <div className="col-md-12 col-12 col-lg-12 d-flex justify-content-center mt-4 mb-4">
                                        <button id="log" className="btn" style={{ fontWeight: "bold" }} type="button" onClick={Reset}>Reset</button>
                                    </div>


                                    {/* <div className="col-md-12 col-12 col-lg-12 d-flex justify-content-center mt-1 mb-4">
                                <h5> <a onClick={e => nav("/forgotpassword")} style={{ color: 'blue' }}>Forgot password</a></h5>
                            </div> */}
                                </form>
                                : null
                        }
                        {
                            show ?
                                null
                                :
                                <div className="col-md-12 col-12 col-lg-12 d-flex justify-content-center mt-4 mb-2" style={{ marginTop: "-40px" }}>
                                    <h5 className="text-success">Password Reset Successfully</h5>
                                </div>
                        }

                    </div>
                </div>
            </div >
        </div >

    )
}
