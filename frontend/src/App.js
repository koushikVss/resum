import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import EditDetails from "./EditDetails"
import Header from './Header'
import Login from './Login'
import Register from './Register'
import Resume from './Resume'
import AppContext from "./ResumeData/appcontext";
import reducer, { initialState } from "./Reducers";
import Home from './home'
import EmailOtp from './EmailOtp'
import VerifyOtp from './VerifyOtp'
import ResetPassword from './ResetPassword'
import Docs from './Docs'
export default function App() {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  return (
    <div>
      <BrowserRouter>
        <AppContext.Provider value={{ state, dispatch }}>
          {window.location.pathname !== "/login" && window.location.pathname !== "/register" ? (
            <Header />
          ) : null}
          <Routes>
            <Route path="/editdetails" element={<EditDetails />} />
            <Route path="/" element={<Resume />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path = "/home" element = {< Home />} />
            <Route path = "/forgotpassword" element = {< EmailOtp />} />
            <Route path = "/resetpassword" element = {< ResetPassword />} />
            <Route path = "/verifyotp" element = {< VerifyOtp />} />
            <Route path = "/docs" element = {< Docs />} />
          </Routes>
        </AppContext.Provider>
      </BrowserRouter>
    </div>
  )
}
