import React from 'react'

export default function Education(props) {
    // const { education } = props.education;
    return (
        <div>
            <h3 className='text-muted' style={{ marginBottom: "20px" }}><i class="fa-solid fa-user-graduate me-2" ></i>Education</h3>
            {
                props.education.map(item =>
                    <div style={{ marginBottom: "20px" }}>
                        <h4 style={{ textTransform: "uppercase" }}>{item.degree}</h4>
                        <h4 className='text-muted'>{item.college}</h4>
                        <h5 style={{ fontStyle: "italic" }}>{item.start.split("-").reverse().join("/")} - {item.end.split("-").reverse().join("/")}</h5>
                        <div className='d-flex justify-content-between'>
                            <h5>Course - {item.course}</h5>
                            {
                                item.percentage >= 11 ?
                                    <h5>Percentage - {item.percentage}</h5>
                                    :
                                    <h5>G.P.A - {item.percentage}</h5>

                            }
                            {/* <h5>Percent/C.G.P.A - {item.percentage}</h5> */}
                        </div>
                    </div>
                )
            }
        </div>
    )
}
