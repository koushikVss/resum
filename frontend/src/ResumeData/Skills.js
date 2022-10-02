import React from 'react'

export default function Skills(props) {
    return (
        <div className=''>
            <h3 className='text-muted' style={{ marginBottom: "20px" }}><i class="fa-brands fa-superpowers me-2"></i>Skills</h3>
            <div className='row d-flex' style={{marginLeft:"10px",maxWidth:"500px"}}>
            {
                props.skills.split(",").map(item =>
                    <div className="border rounded d-flex align-items-center" style={{width:"auto",marginRight:'20px',marginBottom:"10px",padding:"10px 20px 10px 20px"}}>
                        <h4 className='text-dark'>{item}</h4>
                    </div>
                )
            }
            </div>
        </div>
    )
}
