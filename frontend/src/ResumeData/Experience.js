import React from 'react'

export default function Experience(props) {
  console.log(props.experience)
  return (
    <div>
      <h3 className='text-muted' style={{ marginBottom: "20px" }}><i class="fa-solid fa-users-rectangle me-2"></i>Experience</h3>
      {
        props.experience.map(item =>
          <div style={{ marginBottom: "20px" }}>
            <div className='d-flex justify-content-between' style={{ height: "auto" }}>
              <h4 style={{ textTransform: "uppercase" }}>{item.company}</h4>
              <h5 style={{ fontStyle: "italic" }} className='text-muted'>{item.jobtype}</h5>
            </div>
            <h4 className='text-muted'>{item.role}</h4>
            <h5 style={{ fontStyle: "italic" }}>{item.start.split("-").reverse().join("/")} - {item.end.split("-").reverse().join("/")}</h5>

            <h5>Task - {item.task}</h5>
          </div>
        )
      }
    </div>
  )
}
