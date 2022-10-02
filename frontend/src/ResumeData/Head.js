import React from 'react'

export default function Head(props) {
  return (
    <div
    className=''
    style={{
        // width:"1200px",
        // height:"1600px",
        // border:"1px solid black"
    }}
    >
        <h1 style={{marginTop:"35px",marginLeft:'35px'}} >{props.basic.firstname} {props.basic.lastname}</h1>
        <p className="text-secondary" style={{fontWeight:"bold",marginLeft:'35px',fontSize:"30px"}}>{props.basic.about}</p>
    </div> 
  )
}
