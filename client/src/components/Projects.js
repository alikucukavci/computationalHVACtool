import React, {useState, useEffect} from 'react'
import ProjectBar from "./ProjectBar"
import axios from "axios"
import CreateProject from "./CreateProject"

const Projects = () => {
    const [display, setDisplay] = useState("None")
    const  [oneProject, setOneProject] = useState({})
    const [projects, setProjects] = useState([])
    const [createNewProject, setcreateNewProject] = useState({
        title: "",
        description: "",
    })
    const [file, setFile] = useState("")

      useEffect(() => {
          axios.get("/projects").then(projects => {
              setProjects(projects.data)
              console.log(projects.data)
          })
          setDisplay("None")
  }, [])

    if (display === "None") {
        return (
            <div>
                <div className="row">
                    <ProjectBar projects={projects} setDisplay={setDisplay} setOneProject={setOneProject}/>
                    <div className="col-9 projectScreen">
                    </div>
                </div>
            </div>
        )
        
    } else if (display==="Form") {
        return (
            <div>
                <div className="row">
                <ProjectBar projects={projects} setDisplay={setDisplay} setOneProject={setOneProject}/>
                    <CreateProject setDisplay={setDisplay} createNewProject={createNewProject} setcreateNewProject={setcreateNewProject} setDisplay={setDisplay} setProjects={setProjects} projects={projects} file={file} setFile={setFile} />
                </div>
            </div>
        )
    } else if (display === "oneProject") {
        return ( 
            <div>
            <div className="row">
            <ProjectBar projects={projects} setDisplay={setDisplay} setOneProject={setOneProject}/>
                <div className="col-9 projectScreen">
                        <div> <h1> {oneProject.title}</h1></div>
                </div>
            </div>
        </div>
        )
    } else if (display === "newProject") {
        return ( 
            <div>
            <div className="row">
            <ProjectBar projects={projects} setDisplay={setDisplay} setOneProject={setOneProject}/>
                <div className="col-9 projectScreen">
                        <p>NewProjectShown</p>
                        <p>{createNewProject.title}</p>
                        <p>{createNewProject.description}</p>
                </div>
            </div>
        </div>
        )
    }
    
   
}

export default Projects
