import React from 'react'
import { useState, useEffect } from 'react';
import "./Docs.css"
import api from "./config"

import { useNavigate } from 'react-router-dom';
export default function Docs() {
    const [butact, setbutact] = useState('fa-sharp fa-solid fa-plus fa-5x')
    const [docs, setdocs] = useState([])
    const [title, settitle] = useState("")
    const nav = useNavigate()
    const addResume = () => {
        let id = "none"
        fetch(`${api.profile}/addprofile/${id}/${localStorage.getItem('email')}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            // credentials: 'include',
            body: JSON.stringify({
                title:title,
                basic: {
                    firstname: "",
                    lastname: "",
                    email: "",
                    address: "",
                    city: "",
                    phone: "",
                    pincode: "",
                    about: ""
                },
                educations: [{
                    degree: "",
                    college: "",
                    course: "",
                    start: "",
                    end: "",
                    percentage: ""
                }],
                experiences: [{
                    company: "",
                    role: "",
                    task: "",
                    start: "",
                    end: "",
                    jobtype: ""
                }],
                projects: [{
                    title: "",
                    technologies: "",
                    desciption: ""
                }],
                skills: "",
                certificates: [{
                    certificate: ""
                }],
                achievements: [{
                    achievement: ""
                }],
                hobbies: "",
                languages: [{
                    language: ""
                }]
            })
        }).then(data => data.json()).then(data => {
            if (data.status === 200) {
                getdocs()
                console.log("added")
            }
            else {
                console.log("error")
            }
        })
    }
    const getdocs = () => {
        fetch(`${api.profile}/profiles/${localStorage.getItem("email")}`).then(data => data.json()).then(data => {
            console.log("fdata",data)
            setdocs(data.user)
        })
    }
    const deldoc = (id) => {
        fetch(`${api.profile}/deleteprofile/${id}`, {
            method: "DELETE"
        }).then(data => data.json()).then(data => {
            getdocs()
            console.log("deleted")
        })
    }
    useEffect(getdocs, [])
    console.log(docs);



    return (
        <div className="bg-dark">
            <div className='' style={{ width: "100%", height: "100px" }}>
            </div>
            <div className='' style={{ width: '100%', height: "100%" }}>
                <div className='container-fluid cont rounded' style={{ backgroundColor: 'rgb(0,0,0,0.3)' }}>
                    <div className="d-flex align-items-center row">
                        {
                            docs.map(item =>
                                <div className="doc col-lg-3 border rounded bg-light" style={{}}>
                                    <div className="d-flex justify-content-between">
                                        <div className='mt-3'><h4>{item.title}</h4></div>
                                        <i onClick={e => deldoc(item._id)} className="fa-regular fa-trash-can fa-2x mt-3 me-1"></i>
                                    </div>
                                    <div>
                                        {item._id}
                                    </div>
                                    <div>
                                        <button
                                            onClick={e => {
                                                localStorage.setItem("cid", item._id)
                                                nav(`/editdetails`)
                                            }}
                                            className="btn btn-secondary">edit</button>
                                    </div>
                                </div>
                            )
                        }


                        <div id="add" className="doc  col-lg-3 d-flex justify-content-center align-items-center rounded" style={{ backgroundColor: "rgb(0,0,0,0.9)" }}>
                            <i
                                data-bs-toggle="modal" data-bs-target="#exampleModal"
                                className={butact}
                                onClick={e => {
                                    let b = document.getElementById("add");
                                    setbutact('fa-sharp fa-solid fa-plus fa-4x')
                                    setTimeout(() => {
                                        setbutact('fa-sharp fa-solid fa-plus fa-3x')
                                    }, 110)
                                    setTimeout(() => {
                                        setbutact('fa-sharp fa-solid fa-plus fa-2x')
                                    }, 110)
                                    setTimeout(() => {
                                        setbutact('fa-sharp fa-solid fa-plus fa-1x')
                                    }, 110)
                                    setTimeout(() => {
                                        setbutact('fa-sharp fa-solid fa-plus fa-2x')
                                    }, 110)
                                    setTimeout(() => {
                                        setbutact('fa-sharp fa-solid fa-plus fa-3x')
                                    }, 110)
                                    setTimeout(() => {
                                        setbutact('fa-sharp fa-solid fa-plus fa-4x')
                                    }, 110)
                                    setTimeout(() => {
                                        setbutact('fa-sharp fa-solid fa-plus fa-5x')
                                    }, 110)
                                }}
                            ></i>
                        </div>
                       

                        <div class="modal fade " style={{backdropFilter:"blur(5px)",backgroundColor:"rgb(0,0,0,0.1"}} id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog bg-dark">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="exampleModalLabel">Enter Doc Name</h5>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">
                                        <input style={{width:"100%"}} type="text" className="form-control-sm border rounded" value={title} onChange={e=>settitle(e.target.value)} placeholder="Doc Name" />
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                        <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onClick={e => {
                                            addResume()
                                        }}>Create</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}





