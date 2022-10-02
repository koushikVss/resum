import React from 'react'

export default function Certifications(props) {
    return (
        <div>
            <h3 className='text-muted' style={{ marginBottom: "20px" }}><i class="fa-solid fa-award me-2"></i>Certifications</h3>
            {
                props.certificates.map(item =>
                    <div style={{ marginBottom: "7px" }}>
                        <div className="d-flex">
                            <h4 className='me-2 d-flex align-items-center'>
                            <i class="fa-solid fa-minus"></i>
                            </h4>
                            <h4 style={{ border: "1px solid pink", borderRadius: "10px", padding: "10px 20px" }}>
                                {item.certificate}
                            </h4>
                        </div>

                        {/*} <h4 className='text-dark' style={{ fontStyle: "italic", fontSize: "22px" }}>{item.description}</h4>
                        <h5 style={{ fontWeight: "bold" }}>Technologies :  {item.technologies.split(",").join(" - ")}</h5>
                     */}
                    </div>
                )
            }
        </div>
    )
}
