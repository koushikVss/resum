import React from 'react'

export default function Projects(props) {
    return (
        <div>
            <h3 className='text-muted' style={{ marginBottom: "20px" }}><i class="fa-sharp fa-solid fa-diagram-project me-2"></i>Projects</h3>
            {
                props.projects.map(item =>
                    <div style={{ marginBottom: "20px" }}>
                        <h4 style={{ textTransform: "uppercase" }}><i class="fa-solid fa-grip-lines me-2"></i>{item.title}</h4>
                        <h4 className='text-dark' style={{ fontStyle: "italic", fontSize: "22px" }}>{item.description}</h4>
                        <h5 style={{ fontWeight: "bold" }}>Technologies :  {item.technologies.split(",").join(" - ")}</h5>
                    </div>
                )
            }
        </div>
    )
}
