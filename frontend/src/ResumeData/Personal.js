import React from 'react'

export default function Personal(props) {
    return (
        <div className="d-flex justify-content-around align-items-center bg-dark "

            style={{
                // width: "100%",
                // marginTop: "40px",
                // verticalAlign: "center"
            }}
        >
            <div  className='text-light mt-3 '>
                <p style={{ fontWeight: "bold", fontSize: '20px' }} ><i className="fa-solid fa-envelope me-3"></i>{props.basic.email}</p>

            </div>
            <div className='text-light mt-3 ' >
                <p style={{ fontWeight: "bold", fontSize: '20px' }} ><i className="fa-solid fa-mobile-button me-3"></i>{props.basic.phone}</p>

            </div>
            <div  className='text-light mt-3 '>

                <p style={{ fontWeight: "bold", fontSize: '20px' }}><i className="fa-sharp fa-solid fa-location-dot me-3"></i>{props.basic.address} {props.basic.city} {props.basic.pincode}</p>
            </div>

        </div>
    )
}
