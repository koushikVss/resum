import React from 'react'
import File from './File'
import api from './config'
import "./Resume.css"
import { useNavigate } from 'react-router-dom'
import Pdf from "react-to-pdf";



import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import FavoriteIcon from '@mui/icons-material/Favorite';
import NavigationIcon from '@mui/icons-material/Navigation';
import { useReactToPrint } from 'react-to-print'

import ReactToPrint from 'react-to-print';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf'

export default function Resume() {
    const download = (root,fname)=>{
        const input = document.getElementById(root)
        html2canvas(input).then((canvas)=>{
            const imgdata = canvas.toDataURL("pdf")
            const pdf = new jsPDF("a","pt","a4")
            pdf.addImage(imgdata,"PDF",0,0)
            pdf.save(`${fname}`)
        })
    }
    const [resume, setresume] = React.useState(null)
    const [nid, setnid] = React.useState("htmlContent")
    const ref = React.createRef()
    const navigate = useNavigate()
    if(localStorage.getItem("cid")===null)
    navigate("/docs")
    React.useEffect(() => {
        setresume("")
        fetch(`${api.profile}/profile/${localStorage.getItem("cid")}`).then(data => data.json()).then(data => {
            if (data.status === 200) {
                data = data.user[0]
                setresume(
                    {
                        title:data.title,
                        basic: data.basic,
                        education: data.educations,
                        experience: data.experiences,
                        projects: data.projects,
                        skills: data.skills,
                        achievements: data.achievements,
                        certificates: data.certificates,
                        hobbies: data.hobbies,
                        languages: data.languages
                    }
                )
            }
            else {
                setresume("")
            }
        })
    }, [])
    console.log(resume)
    return (
        <>
            {
                resume === "" ?
                    <div>
                        Loading
                    </div> :
                    resume === null ?
                        <div>
                            fill profile first
                        </div> :
                        <div>
                            <div className=" resume d-flex justify-content-center bg-dark"
                            // style={{width:"2000px",height:"3500px"}}
                            // style={{width:"100%",height:"100%"}}
                            // style={{marginLeft:"10%",marginRight:"10%"}}
                            // style={{marginTop:"100px"}}
                            >
                                <div id="htmlContent" >
                                    <File nref ={ref} nid={nid} data={resume} />
                                </div>
                                {/* <Pdf targetRef={ref} filename="code-example.pdf">
                                    {({ toPdf }) => <button onClick={toPdf}>Generate Pdf</button>}
                                </Pdf> */}
                                <Box style={{
                                    margin: 0,
                                    top: 'auto',
                                    right: 20,
                                    bottom: 80,
                                    left: 'auto',
                                    position: 'fixed',
                                    marginBottom: "20px"
                                }}
                                >
                                    <Fab onClick={e => navigate("/editdetails")} variant="extended" className="bg-dark text-light " style={{ border: "1px solid blue", fontWeight: "bold" }}>
                                        Edit details
                                    </Fab>
                                </Box>
                                <Box style={{
                                    margin: 0,
                                    top: 'auto',
                                    right: 20,
                                    bottom: 20,
                                    left: 'auto',
                                    position: 'fixed',
                                    marginBottom: "20px"
                                }}
                                >
                                    <Fab  onClick={e => download("resum", "test")} variant="extended" className="bg-dark text-light " style={{ border: "1px solid blue", fontWeight: "bold" }}>
                                    {/* <Fab id="generatePDF"  variant="extended" className="bg-dark text-light " style={{ border: "1px solid blue", fontWeight: "bold" }}> */}
                                        Download PDF
                                    </Fab>
                                </Box>
                                <div id="editor"></div>
                            </div>
                        </div>
            }
        </>
    )
}
