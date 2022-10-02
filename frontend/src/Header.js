import React from 'react'
import "./Navbar.css"
import Avatar from '@mui/material/Avatar';
import { Navigate, useNavigate } from 'react-router-dom'
import AppContext from './ResumeData/appcontext'
import api from './config'
export default function Header() {

  const navigate = useNavigate()
  const { state, dispatch } = React.useContext(AppContext);
  const [header, setheader] = React.useState(false)
  
  React.useEffect(() => {
    fetch(`${api.auth}/authenticate`, {
      method: "POST",
      headers: {
        'Content-Type': "application/json",
        'Authorization': localStorage.getItem('token')
      },
      credentials: 'include'
    }).then(res => res.json()).then(data => {
      console.log(data)
      if (data.status === 200)
        dispatch({ type: 'LOGIN' })
      else if (data.status === 401) {
        // console.log("unauth")
        dispatch({ type: 'LOGOUT' })
        // navigate("/login")
      }
    })
  }, [])
  return (
    <nav className=" navi navbar navbar-dark"
      style={{
        // margin: 0,
        // top: '0',
        // right: 0,
        // bottom: "94%",
        // left: '0',
        // position: 'fixed',
        // marginBottom: "20px",
        // backdropFilter:"blur(5px)",
        // backgroundColor:"rgba(29, 27, 27, 0.4)"
      }}
    >
      <div className="container-fluid">
        <a className="navbar-brand" style={{ marginTop: "-10px" }} href="#">
          <img src="https://cdn1.iconfinder.com/data/icons/corporate-and-business/64/24-Employee-512.png" alt="" width="55" height="45" className="d-inline-block align-items-center me-2" />
          Resume Builder
        </a>

        <li style={{ marginRight: "20px" }} className="err nav-item dropdown d-flex align-items-center">

        </li>

        {
          state ?
            <li style={{ marginRight: "20px" }} className="err nav-item dropdown d-flex align-items-center">
              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" data-bs-display="static" aria-expanded="false">

              <Avatar style={{ marginTop: "10px", boxShadow: "1px 1px 7px 1px gray",fontSize:"15px",fontWeight:'bold' }} className="bg-dark text-light" sx={{ width: 40, height: 40 }}>{localStorage.getItem("fname")[0].toUpperCase()}{localStorage.getItem("lname")[0].toUpperCase()}</Avatar>
              </a>
              <ul className="navitems dropdown-menu dropdown-menu-end dropdown-menu-lg-end" style={{ backdropFilter: "blur(3px)", backgroundColor: "rgba(29, 27, 27, 0.9)", backdropFilter: "blur(3px)" }}>
                {/* <li><a className="dropdown-item text-light" href="#">Action</a></li> */}
                {/* <li><a className="dropdown-item text-light" href="#">Another action</a></li> */}
                {/* <li><hr className="dropdown-divider " style={{ color: "white", backgroundColor: "white" }} /></li> */}
                <li><a className="dropdown-item text-light" onClick={e => {
                  fetch(`${api.auth}/logout`, { method: "POST" }).then(data => data.json()).then(data => {
                    if (data.status === 200) {
                      dispatch({ type: 'LOGOUT' });
                      localStorage.clear()
                      navigate("/login")
                    }
                  }
                  )
                }

                }>Logout</a></li>
              </ul>
            </li>
            :
            <li style={{ marginRight: "20px" }} className="err nav-item dropdown d-flex align-items-center">
              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" data-bs-display="static" aria-expanded="false">
            
              <Avatar style={{ marginTop: "10px", boxShadow: "1px 1px 7px 1px gray" }} className="bg-dark text-light" sx={{ width: 40, height: 40 }}><i class="fa-solid fa-user"></i></Avatar>
                {/* <Avatar style={{ marginTop: "10px", boxShadow: "1px 1px 7px 1px gray" }} className="bg-dark text-light" sx={{ width: 40, height: 40 }}>{localStorage.getItem("fname")[0]}{localStorage.getItem("lname")[0]}</Avatar> */}
              </a>
              <ul className="navitems dropdown-menu dropdown-menu-end dropdown-menu-lg-end" style={{ backdropFilter: "blur(3px)", backgroundColor: "rgba(29, 27, 27, 0.9)", backdropFilter: "blur(3px)" }}>
                <li><a className="dropdown-item text-light" onClick={e => navigate("/login")}>Login</a></li>
                <li><a className="dropdown-item text-light" onClick={e => navigate("/register")}>Register</a></li>
                {/* <li><hr className="dropdown-divider " style={{ color: "white", backgroundColor: "white" }} /></li> */}
                {/* <li><a className="dropdown-item text-light" href="#">Something else here</a></li> */}
              </ul>
            </li>
        }




      </div>
    </nav>
  )
}
