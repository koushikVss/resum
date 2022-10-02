import React, { useEffect, useState } from 'react'
import api from './config';
import { Navigate, useNavigate } from 'react-router-dom';
import { useReducer } from "react";
// import reducer, { initialState } from "../Components/Reducers";

export default function AuthHoc(Component) {
    function NewComponent() {
        const nav = useNavigate()
        // const [state, dispatch] = useReducer(reducer, initialState);
        useEffect(() => {
            fetch(`${api.auth}/authenticate`, {
                method: "POST",
                headers: {
                    'Content-Type': "application/json",
                    'Authorization': localStorage.getItem('token')
                },
                credentials:'include'
            }).then(res => res.json()).then(data => {
                if (data.status === 200) {
                    // localStorage.setItem("verification", true)
                    return (<Component />)
                }
                else {
                        //  localStorage.setItem("verification", false)
                        // dispatch({ type: 'LOGOUT' })
                        // localStorage.clear()
                        nav("/login")
                }
            })
        }, []);
        return <Component />;
    }
    return NewComponent;
}


