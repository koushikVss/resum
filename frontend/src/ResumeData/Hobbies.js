import React from 'react'

export default function Hobbies(props) {
  return (
    <div>
          <h3 className='text-muted' style={{ marginBottom: "20px" }}><i class="fa-solid fa-person-skating me-2"></i>Hobbies</h3>
            <div className='row d-flex' style={{marginLeft:"10px",maxWidth:"500px"}}>
            {
                props.hobbies.split(",").map(item =>
                    <div className="border rounded d-flex align-items-center" style={{width:"auto",marginRight:'20px',marginBottom:"10px",padding:"10px 20px 10px 20px"}}>
                        <h4 className='text-dark'>{item}</h4>
                    </div>
                )
            }
            </div>
    </div>
  )
}
