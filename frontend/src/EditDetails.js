import FormInput from "./FormInput";
import React, { useState } from "react";
import api from "./config"
import "./App.css"
import "./EditDetails.css"

import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import FavoriteIcon from '@mui/icons-material/Favorite';
import NavigationIcon from '@mui/icons-material/Navigation';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';


function EditDetails() {
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const [open, setOpen] = React.useState(false);
  const [title, settitle] = useState("")
  //snackbar function
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  }

  const navigate = useNavigate()
  const [basicVals, setbasicVals] = useState({
    firstname: "",
    lastname: "",
    email: "",
    address: "",
    city: "",
    phone: "",
    pincode: "",
    about: ""
  })
  const [educationVals, seteducationVals] = useState([
    {
      degree: "",
      college: "",
      course: "",
      start: "",
      end: "",
      percentage: ""
    }])
  const [projectVals, setprojectVals] = useState([
    {
      title: "",
      technologies: "",
      desciption: ""
    }
  ])
  const [experienceVals, setexperienceVals] = useState([
    {
      company: "",
      role: "",
      task: "",
      start: "",
      end: "",
      jobtype: ""
    }
  ])
  const [skills, setskills] = useState("")
  const [hobbies, sethobbies] = useState("")
  const [languages, setlanguages] = useState([{
    language:""
  }])
  const [certificates, setcertificates] = useState([{
    certificate: ""
  }])
  const [achievements, setachievements] = useState([{
    achievement: ""
  }])

  const basic = [
    {
      id: 1,
      name: "firstname",
      type: 'text',
      placeholder: "What people call you",
      label: "First Name",
      itype: "input"

    },
    {
      id: 2,
      name: "lastname",
      type: 'text',
      placeholder: "Ancestral surname",
      label: "Last Name",
      itype: "input"
    },

    {
      id: 3,
      name: "email",
      type: 'email',
      placeholder: "Your Professional mail",
      label: "Email",
      itype: "input"
    },

    {
      id: 4,
      name: "city",
      type: 'text',
      placeholder: "where you live",
      label: "City",
      itype: "input"
    },
    {
      id: 5,
      name: "phone",
      type: 'number',
      placeholder: "to contact you...",
      label: "Phone",
      itype: "input"
    },
    {
      id: 6,
      name: "pincode",
      type: 'number',
      placeholder: "yor areas's postal code",
      label: "Pin Code",
      itype: "input"
    },
    {
      id: 7,
      name: "address",
      type: 'text',
      placeholder: "location of your home...",
      label: "Address",
      itype: "input"
    },
    {
      id: 8,
      name: "about",
      type: 'text',
      placeholder: "Give 2-4 short & effective sentences about your role, experience, yourself etc.....",
      label: "Professional Summary",
      itype: "textarea"
    }
  ]
  const onbasic = (e) => {
    console.log(e.target.value)
    setbasicVals({ ...basicVals, [e.target.name]: e.target.value })
  }

  const education = [
    {
      id: 1,
      name: "degree",
      type: "text",
      placeholder: "Qualification / Degree",
      label: "Degree/Qualification",
      itype: "input"

    },
    {
      id: 2,
      name: "college",
      type: "text",
      placeholder: "College/University",
      label: "College/University",
      itype: "input"

    },
    {
      id: 3,
      name: "course",
      type: "text",
      placeholder: "Course",
      label: "Course Details",
      itype: "input"

    },
    {
      id: 4,
      name: "start",
      type: "date",
      placeholder: "dd/mm/yy",
      label: "Date from",
      itype: "input"

    },
    {
      id: 5,
      name: "end",
      type: "date",
      placeholder: "dd/mm/yy",
      label: "Date To",
      itype: "input"

    },
    {
      id: 6,
      name: 'percentage',
      type: 'number',
      placeholder: 'Percentage',
      label: "Percentage",
      itype: "input"

    }
  ]
  const oneducation = (e, index) => {
    let newvals = educationVals[index]
    newvals = { ...newvals, [e.target.name]: e.target.value }
    let m = [...educationVals]
    m[index] = newvals
    seteducationVals(m)
  }
  // console.log(educationVals)

  const addeducation = (e) => {
    e.preventDefault()
    seteducationVals([...educationVals, {
      degree: "",
      college: "",
      start: "",
      end: "",
      percentage: ""
    }])
  }

  const deleteeducation = (e, index) => {
    e.preventDefault()
    let m = [...educationVals]
    m.splice(index, 1)
    seteducationVals(m)
  }

  const handleSubmit = async (e, action) => {
    e.preventDefault()
    console.log(basicVals)
    let data = {
      title:title,
      basic: basicVals,
      educations: educationVals,
      experiences: experienceVals,
      projects: projectVals,
      skills: skills,
      certificates: certificates,
      achievements: achievements,
      hobbies: hobbies,
      languages:languages
    }
    console.log(data)
    await fetch(`${api.profile}/addprofile/${localStorage.getItem("cid")}/${localStorage.getItem("email")}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }).then(data => data.json()).then(data => {
      if (action === "submit")
        navigate("/")
      else {
        setOpen(true)
      }
      console.log(experienceVals)
    })
  }

  React.useEffect(() => {
    fetch(`${api.profile}/profile/${localStorage.getItem("cid")}`).then(data => data.json()).then(data => {
      console.log("dat",data)
      if (data.status === 200) {
        data = data.user[0]
        settitle(data.title)
        setbasicVals(data.basic)
        seteducationVals(data.educations)
        setexperienceVals(data.experiences)
        setprojectVals(data.projects)
        setachievements(data.achievements)
        setskills(data.skills)
        sethobbies(data.hobbies)
        setcertificates(data.certificates)
        setlanguages(data.languages)
      }
    })
  }, [])
  const projects = [
    {
      id: 1,
      name: "title",
      type: "text",
      placeholder: "Title",
      label: "Title",
      itype: "input"

    },
    {
      id: 2,
      name: "technologies",
      type: "text",
      placeholder: "Technologies comma seperated",
      label: "Technologies used",
      itype: "input"
    },
    {
      id: 3,
      name: 'description',
      type: 'text',
      placeholder: "Description",
      label: "Description",
      itype: "input"

    }
  ]

  const onproject = (e, index) => {
    let newvals = projectVals[index]
    newvals = { ...newvals, [e.target.name]: e.target.value }
    let m = [...projectVals]
    m[index] = newvals
    setprojectVals(m)
  }
  // console.log(projectVals)

  const addproject = (e) => {
    e.preventDefault()
    setprojectVals([...projectVals, {
      title: "",
      desciption: "",
      technologies: ""
    }])
  }

  const deleteproject = (e, index) => {
    e.preventDefault()
    let m = [...projectVals]
    m.splice(index, 1)
    setprojectVals(m)
  }

  const experience = [
    {
      id: 1,
      name: "company",
      type: "text",
      label: "Company",
      placeholder: "Company",
      itype: "input"

    },
    {
      id: 2,
      name: "role",
      type: "text",
      label: "Role",
      placeholder: "Role",
      itype: "input"

    },
    {
      id: 3,
      name: "task",
      type: "text",
      label: "Tasks/Achievements",
      placeholder: "Give a brief of your work",
      itype: "input"

    },
    {
      id: 4,
      name: "start",
      type: "date",
      placeholder: "dd/mm/yy",
      label: "Date from",
      itype: "input"

    },
    {
      id: 5,
      name: "end",
      type: "date",
      placeholder: "dd/mm/yy",
      label: "Date To",
      itype: "input"
    },
    {
      id: 6,
      name: "jobtype",
      type: "text",
      placeholder: "JobType",
      label: "Job Type",
      options: ["None", "Part-time", "Fulltime", "Intern"],
      itype: "select"
    }
  ]

  const onexperience = (e, index) => {
    let newvals = experienceVals[index]
    // console.log("tar",e.target)
    newvals = { ...newvals, [e.target.name]: e.target.value }
    let m = [...experienceVals]
    m[index] = newvals
    setexperienceVals(m)
  }
  // console.log(experienceVals)

  const addexperience = (e) => {
    e.preventDefault()
    setexperienceVals([...experienceVals, {
      company: "",
      role: "",
      task: "",
      start: "",
      end: "",
      jobtype: ""
    }])
  }

  const deleteexperience = (e, index) => {
    e.preventDefault()
    let m = [...experienceVals]
    m.splice(index, 1)
    setexperienceVals(m)
  }

  const skill = {
    name: "skill",
    type: "text",
    // label: "Skills",
    placeholder: "skills comma seperated...",
    itype: "input"

  }

  const onSkills = (e) => {
    // console.log("skill",e.target.value)
    setskills(e.target.value)
  }
  const hobby = {
    name: "hobby",
    type: "text",
    // label: "Hobbies",
    placeholder: "Hobbies comma seperated...",
    itype: "input"

  }

  const onHobbies = (e) => {
    sethobbies(e.target.value)
  }
  


  const certificate = {
    name: "certificate",
    type: "text",
    // label: "Certification",
    placeholder: "add certificate name...",
    itype: "input"

  }
  const oncertificates = (e, index) => {
    let newvals = certificates[index]
    newvals = { ...newvals, [e.target.name]: e.target.value }
    let m = [...certificates]
    m[index] = newvals
    setcertificates(m)
  }

  const addcertificate = (e) => {
    e.preventDefault()
    setcertificates([...certificates, { certificate: "" }])
  }

  const deletecertificate = (e, index) => {
    e.preventDefault()
    let m = [...certificates]
    m.splice(index, 1)
    setcertificates(m)
  }

  //language
  const language = {
    name: "language",
    type: "text",
    // label: "Certification",
    placeholder: "language",
    itype: "input"

  }
  const onlanguages = (e, index) => {
    let newvals = languages[index]
    newvals = { ...newvals, [e.target.name]: e.target.value }
    let m = [...languages]
    m[index] = newvals
    setlanguages(m)
  }

  const addlanguage = (e) => {
    e.preventDefault()
    setlanguages([...languages, { language: "" }])
  }

  const deletelanguage = (e, index) => {
    e.preventDefault()
    let m = [...languages]
    m.splice(index, 1)
    setlanguages(m)
  }

  const achievement = {
    name: "achievement",
    type: "text",
    // label: "Achievement",
    placeholder: "Your Achievement ...",
    itype: "input"

  }
  const onachievements = (e, index) => {
    let newvals = achievements[index]
    newvals = { ...newvals, [e.target.name]: e.target.value }
    let m = [...achievements]
    m[index] = newvals
    setachievements(m)
  }

  const addachievement = (e) => {
    e.preventDefault()
    setachievements([...achievements, {
      achievement: ""
    }])
  }

  const deleteachievement = (e, index) => {
    e.preventDefault()
    let m = [...achievements]
    m.splice(index, 1)
    setachievements(m)
  }

  return (
    <div
    className="container-fluid w-100 d-flex justify-content-center" id="form">
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Box
          style={{
            margin: 0,
            top: '20',
            right: '30%',
            bottom: '90%',
            left: '30%',
            position: 'fixed',
          }}

        >

          <Alert onClose={handleClose} severity="success" className="bg-dark" >
            Saved
          </Alert>
        </Box>

      </Snackbar>






      <form 
    style={{marginTop:"130px"}}
      
      className="container bg-light" onSubmit={e => handleSubmit(e, "submit")}>
        <div className="row d-flex align-items-center border rounded" style={{ padding: '20px' }}>
          <div className="d-flex justify-content-start text-muted mb-3 mt-2">
            <h3>General Details</h3>
          </div>
          {
            basic.map(item =>
              <div className="py-2 col-12 col-sm-6 col-md-4 col-lg-4">
                <FormInput key={item.id} {...item} value={basicVals[item.name]} onchange={e => onbasic(e)} />
              </div>
            )
          }
        </div>
        <div className="row d-flex align-items-center rounded border" style={{ padding: '20px' }}>
          <div className="d-flex justify-content-start text-muted mt-3" style={{ marginBottom: '-15px' }}>
            <h3>Education Details</h3>
          </div>
          {
            educationVals.map((itm, index) =>
              <div className="row d-flex align-items-center" style={{ padding: '20px' }} key={index}>
                <div className="row d-flex ">
                  <h3 className="col-3 col-sm-3 d-flex" style={{ marginBottom: '-20px', width: "40px" }}>{itm["degree"]}</h3>
                  <i style={{ background: "white", width: 70, marginLeft: "100%" }} onClick={e => deleteeducation(e, index)} className="fa-solid fa-delete-left fa-2x"></i>
                </div>
                {
                  education.map(item =>
                    <div className="py-2 col-12 col-sm-6 col-md-4 col-lg-4">
                      <FormInput key={item.id} {...item} value={itm[item.name]} onchange={e => oneducation(e, index)} />
                    </div>
                  )
                }
              </div>
            )

          }
          <div className="row d-flex align-items-center rounded" style={{ padding: '20px' }}>
            <button style={{ width: 150, background: "gray", border: "1px solid pink", color: "white", fontWeight: "bold", borderRadius: 5, padding: "7px 0px", marginLeft: "20px" }} onClick={addeducation}>Add Education</button>
          </div>
        </div>
        <div className="row d-flex align-items-center rounded border" style={{ padding: '20px' }}>
          <div className="d-flex justify-content-start text-muted mt-3" style={{ marginBottom: '-15px' }}>
            <h3 >Projects</h3>
          </div>
          {
            projectVals.map((itm, index) =>
              <div className="row d-flex align-items-center" style={{ padding: '20px' }} key={index}>
                <div className="row flex ">
                  <h3 className="col-3 col-sm-3 d-flex" style={{ marginBottom: '-20px', width: "40px" }}>{itm["title"]}</h3>
                  <i style={{ background: "white", width: 70, marginLeft: "100%" }} onClick={e => deleteproject(e, index)} className="fa-solid fa-delete-left fa-2x"></i>
                </div>
                <div className="row flex" key={index}>
                  {
                    projects.map(item =>
                      <div className="py-2 col-12 col-sm-6 col-md-4 col-lg-4">
                        <FormInput key={item.id} {...item} value={itm[item.name]} onchange={e => onproject(e, index)} />
                      </div>
                    )
                  }
                </div>
              </div>
            )
          }
          <div className="row d-flex align-items-center rounded" style={{ padding: '20px' }}>
            <button style={{ width: 150, background: "gray", color: "white", fontWeight: "bold", border: "1px solid pink", borderRadius: 5, padding: "7px 0px", marginLeft: "20px" }} onClick={addproject}>Add Project</button>
          </div>
        </div>

        <div className="row d-flex align-items-center rounded border" style={{ padding: '20px' }}>
          <div className="d-flex justify-content-start text-muted mt-3" style={{ marginBottom: '-15px' }}>
            <h3>Experience</h3>
          </div>
          {
            experienceVals.map((itm, index) =>
              <div className="row d-flex align-items-center" style={{ padding: '20px' }} key={index}>
                <div className="row flex ">
                  <h3 className="col-3 col-sm-3 d-flex" style={{ marginBottom: '-20px', width: "40px" }}>{itm["company"]}</h3>
                  <i style={{ background: "white", width: 70, marginLeft: "100%" }} onClick={e => deleteexperience(e, index)} className="fa-solid fa-delete-left fa-2x"></i>
                </div>
                <div className="row flex" key={index}>
                  {
                    experience.map(item =>
                      <div className="py-2 col-12 col-sm-6 col-md-4 col-lg-4">
                        <FormInput key={item.id} {...item} value={itm[item.name]} onchange={e => onexperience(e, index)} />
                      </div>
                    )
                  }
                </div>
              </div>

            )
          }
          <div className="row d-flex align-items-center rounded" style={{ padding: '20px' }}>
            <button style={{ width: 150, background: "gray", color: "white", fontWeight: "bold", border: "1px solid pink", borderRadius: 5, padding: "7px 0px", marginLeft: "20px" }} onClick={addexperience}>Add Experience</button>
          </div>
        </div>
        <div className="row d-flex align-items-center rounded border" style={{ padding: '20px' }}>
          <div className="d-flex justify-content-start text-muted mb-3 mt-3">
            <h3>Skills</h3>
          </div>
          <FormInput {...skill} value={skills} onchange={e => onSkills(e)} />
        </div>
        <div className="row d-flex align-items-center rounded border" style={{ padding: '20px' }}>
          <div className="d-flex justify-content-start text-muted  mt-3">
            <h3>Certificates</h3>
          </div>
          {
            certificates.map((itm, index) =>
              <div className="row d-flex align-items-center" style={{ padding: '20px' }} key={index}>
                <div className="row flex ">
                  <i style={{ background: "white", width: 70, marginLeft: "100%" }} onClick={e => deletecertificate(e, index)} className="fa-solid fa-delete-left fa-2x"></i>
                </div>
                <div key={index}>{
                  <FormInput key={index} {...certificate} value={itm["certificate"]} onchange={e => oncertificates(e, index)} />
                }
                </div>
              </div>
            )
          }
          <div className="row d-flex align-items-center rounded" style={{ padding: '20px' }}>
            <button style={{ width: 150, background: "gray", color: "white", fontWeight: "bold", border: "1px solid pink", borderRadius: 5, padding: "7px 0px", marginLeft: "20px" }} onClick={addcertificate}>Add Certificate</button>
          </div>
        </div>

        <div className="row d-flex align-items-center rounded border" style={{ padding: '20px' }}>
          <div className="d-flex justify-content-start text-muted  mt-3">
            <h3>Achievements</h3>
          </div>
          {
            achievements.map((itm, index) =>
              <div className="row d-flex align-items-center" style={{ padding: '20px' }} key={index}>
                <div className="row flex ">
                  <i style={{ background: "white", width: 70, marginLeft: "100%" }} onClick={e => deleteachievement(e, index)} className="fa-solid fa-delete-left fa-2x"></i>
                </div>
                <div key={index}>{
                  <FormInput key={index} {...achievement} value={itm["achievement"]} onchange={e => onachievements(e, index)} />
                }
                </div>
              </div>
            )
          }
          <div className="row d-flex align-items-center rounded" style={{ padding: '20px' }}>
            <button style={{ width: 150, background: "gray", color: "white", fontWeight: "bold", border: "1px solid pink", borderRadius: 5, padding: "7px 0px", marginLeft: "20px" }} onClick={addachievement}>Add Achievement</button>
          </div>
        </div>
        

        <div className="row d-flex align-items-center rounded border" style={{ padding: '20px' }}>
          <div className="d-flex justify-content-start text-muted  mt-3">
            <h3>Languages</h3>
          </div>
          {
            languages.map((itm, index) =>
              <div className="row d-flex align-items-center" style={{ padding: '20px' }} key={index}>
                <div className="row flex ">
                  <i style={{ background: "white", width: 70, marginLeft: "100%" }} onClick={e => deletelanguage(e, index)} className="fa-solid fa-delete-left fa-2x"></i>
                </div>
                <div key={index}>{
                  <FormInput key={index} {...language} value={itm["language"]} onchange={e => onlanguages(e, index)} />
                }
                </div>
              </div>
            )
          }
          <div className="row d-flex align-items-center rounded" style={{ padding: '20px' }}>
            <button style={{ width: 150, background: "gray", color: "white", fontWeight: "bold", border: "1px solid pink", borderRadius: 5, padding: "7px 0px", marginLeft: "20px" }} onClick={addlanguage}>Add Language</button>
          </div>
        </div>





        <div className="row d-flex align-items-center rounded border" style={{ padding: '20px' }}>
          <div className="d-flex justify-content-start text-muted mb-3 mt-3">
            <h3>Hobbies</h3>
          </div>
          <FormInput {...hobby} value={hobbies} onchange={e =>
            onHobbies(e)} />
        </div>
        <div className="col-12 col-md-12 col-lg-12 d-flex justify-content-center py-5 mb-5">
          <button className="bg-light" style={{ border: "1px solid blue", padding: '10px 20px', borderRadius: 6, fontWeight: "bold", boxShadow: "2px 2px 3px gray" }}>Submit</button>
        </div>
      </form>
      <Box
        className="d-block"
        style={{

          margin: 0,
          top: 'auto',
          right: 20,
          bottom: 83,
          left: 'auto',
          position: 'fixed',
          marginBottom: "20px"

        }}

      >
        <Fab onClick={e => handleSubmit(e, "save")} variant="circular" className="d-block bg-dark text-light " style={{ border: "1px solid blue", fontWeight: "bold" }}>
          <i className=" fa-solid fa-floppy-disk fa-2x"></i>
        </Fab>

      </Box>
      <Box
        className="d-block"
        style={{

          margin: 0,
          top: 'auto',
          right: 20,
          bottom: 20,
          left: 'auto',
          position: 'fixed',
          marginBottom: "20px"

        }}

      >

        <Fab onClick={e => navigate("/")} variant="circular" className="d-block bg-dark text-light " style={{ border: "1px solid blue", fontWeight: "bold" }}>

          <i className=" fa-solid fa-id-card-clip fa-2x"></i>
        </Fab>
      </Box>

    </div>
  )
}

export default EditDetails;
