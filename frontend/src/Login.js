import React, { useState } from 'react'
import api from './config'
import { useNavigate } from 'react-router-dom'
import { useReducer } from "react";
import reducer from './Reducers';
import { initialState } from './Reducers';
import AppContext from './ResumeData/appcontext';
import mail from "./images/mail.gif"
import "./Login.css"

import bg from './images/bg.jpg'
import cover from './images/cover.jpeg'


export default function Login() {
    const [caption, setcaption] = useState('Resume builder')
    const [timage, settimage] = useState("https://cdn1.iconfinder.com/data/icons/corporate-and-business/64/24-Employee-512.png")
    const [email, setemail] = React.useState('')
    const [password, setpassword] = React.useState('')
    const { state, dispatch } = React.useContext(AppContext);
    const nav = useNavigate()
    const Login = () => {
        fetch(`${api.auth}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({
                email: email,
                password: password
            })
        }).then(data => data.json()).then(data => {
            if (data.status === 200) {
                dispatch({ type: 'LOGIN' })
                localStorage.setItem("token", data.token)
                localStorage.setItem("email", email)
                localStorage.setItem("fname", data.fname)
                localStorage.setItem("lname", data.lname)
                localStorage.setItem("session", data.session)
                nav("/")
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
        setcaption("Resume Builder")
        settimage("https://cdn1.iconfinder.com/data/icons/corporate-and-business/64/24-Employee-512.png")
        let em = document.getElementById(e.target.id)
        em.style.backgroundColor = "white"
    }
    const focuspass = (e) => {
        settimage("https://th.bing.com/th/id/R.675a2f6b79ebcb748cca95bd35241a69?rik=lNmwlo19augckw&riu=http%3a%2f%2f78.media.tumblr.com%2f54a2fbcd5762eff8212e29001fa69aa1%2ftumblr_ngdvhpKbrD1qea4hso1_400.gif&ehk=eaZou3W6cq5ekfOW7FhpV3Y%2btDH7ik7DVVgJ88EsOjk%3d&risl=&pid=ImgRaw&r=0")
        let em = document.getElementById(e.target.id)
        setcaption("Enter Psswrd")
        em.style.backgroundColor = "pink"
    }

    const blurpass = (e) => {
        setcaption("Resume Builder")
        settimage("https://cdn1.iconfinder.com/data/icons/corporate-and-business/64/24-Employee-512.png")
        let em = document.getElementById(e.target.id)
        em.style.backgroundColor = "white"
    }
    return (
        <div className='bg-dark main' style={{}}>
            <div className='container d-flex justify-content-center align-items-center' style={{ width: '100%' }}>
                <div className="login row d-flex justify-content-center align-items-center border rounded bg-light" style={{ height: "590px", marginTop: '180px' }}>
                    <div className="col-md-12 col-12 col-lg-12 d-flex justify-content-start mt-3" style={{ marginLeft: "50px" }}>
                        <h2 className='' style={{ fontFamily: '',marginTop:"-4px",marginBottom:"40px" }}>LOGIN</h2>
                    </div>
                    <div className="col-md-12">
                        <div className=" d-flex justify-content-center" style={{ marginTop: '-50px' }}>
                            <img src={timage} alt="" width="130" height="130" className="d-flex align-items-center me-2 mt-3" />
                        </div>
                        <h2 className='d-flex justify-content-center mt-3 '>{caption}</h2>
                    </div>
                    <div className='' style={{ marginTop: '-40px' }}>
                        <form >

                            <div className="col-md-12 col-12 col-lg-12 d-flex justify-content-center mt-4" >
                                <input className='rounded' type="email" value={email} id="email" onFocus={focusemail} onBlur={bluremail} style={{ width: "250px", height: "50px", border: "3px solid gray", borderRadius: "5px" }} onChange={e => setemail(e.target.value)} placeholder='  Email' />
                            </div>
                            <div className="col-md-12 col-12 col-lg-12 d-flex justify-content-center mt-4">
                                <input className='rounded' type="password" value={password} id="password" onFocus={focuspass} onBlur={blurpass} style={{ width: "250px", height: "45px", border: "3px solid gray ", borderRadius: "5px" }} onChange={e => setpassword(e.target.value)} placeholder='  ********' />
                            </div >

                            <div className="col-md-12 col-12 col-lg-12 d-flex justify-content-center mt-4 mb-3">
                                <button id="log" className="btn" style={{ fontWeight: "bold" }} type="button" onClick={Login}>Login</button>
                            </div>
                            <div className="col-md-12 col-12 col-lg-12 d-flex justify-content-center mt-4 mb-2">
                                <h5>New User ? <a onClick={e => nav("/register")} style={{ color: 'blue' }}>Register Here</a></h5>
                            </div>
                            <div className="col-md-12 col-12 col-lg-12 d-flex justify-content-center mt-1 mb-4">
                                <h5> <a onClick={e => nav("/forgotpassword")} style={{ color: 'blue' }}>Forgot password</a></h5>
                            </div>
                        </form>
                    </div>
                </div>
            </div >
        </div>

    )
}
