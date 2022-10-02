import React from 'react'
import "./File.css"
import Achievements from './ResumeData/Achievements'
import Certifications from './ResumeData/Certifications'
import Education from './ResumeData/Education'
import Experience from './ResumeData/Experience'
import Head from './ResumeData/Head'
import Hobbies from './ResumeData/Hobbies'
import Languages from './ResumeData/Languages'
import Personal from './ResumeData/Personal'
import Projects from './ResumeData/Projects'
import Skills from './ResumeData/Skills'
export default function File(props) {
  const { basic, education, experience, projects, skills, hobbies, achievements, certificates, languages } = props.data
  return (
    <div ref = {props.nref} id={props.nid} className='a4 bg-light'>
      <Head basic={basic} className="head" />
      <Personal basic={basic} />
      <div className='d-flex justify-content-center' style={{ marginTop: "30px" }}>
        <div className="row" style={{ width: "600px", marginLeft: '40px', marginRight: '25px' }} >
          <div className="col-6 col-lg-6 col-md-6" style={{ width: "550px" }} >
            <Education education={education} />
          </div>
          <div className="d-block col-6 col-lg-6 col-md-6" style={{ width: "550px" }} >
            <Projects projects={projects} />
          </div>
          <div className="d-block col-6 col-lg-6 col-md-6" style={{ width: "550px", marginTop: "5px" }} >
            <Certifications certificates={certificates} />
          </div>
        </div>
        <div className="row d-block" style={{ width: "600px", marginLeft: '0px', marginRight: '25px' }} >
          <div className="d-block col-6 col-sm-6 col-lg-6 col-md-6" style={{ width: "550px", height: "auto" }} >
            <Skills className="" style={{}} skills={skills} />
          </div>
          <div className="d-block col-6 col-lg-6 col-md-6 mt-4" style={{ width: "550px", marginTop: "10px" }} >
            <Experience experience={experience} />
          </div>
          <div className="d-block col-6 col-lg-6 col-md-6 mt-5" style={{ width: "550px", marginTop: "10px" }} >
            <Achievements achievements={achievements} />
          </div>
          <div className="d-block col-6 col-lg-6 col-md-6 mt-5" style={{ width: "550px", marginTop: "10px" }} >
            <Languages languages={languages} />
          </div>
          <div className="d-block col-6 col-lg-6 col-md-6 mt-5" style={{ width: "550px", marginTop: "10px" }} >
            <Hobbies hobbies={hobbies} />
          </div>
          <div className='mb-5 py-5' marginTop="50" >
            {/* blanck */}
          </div>
        </div>
      </div>
    </div>
  )
}
