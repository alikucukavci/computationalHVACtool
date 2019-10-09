import React, {useState, useEffect} from 'react'
import ProjectBar from "./ProjectBar"
import axios from "axios"
import CreateProject from "./CreateProject"
import UploadFile from "./UploadFile"
import ThreeJS from "./ThreeJS"


const Projects = () => {
    const [display, setDisplay] = useState("None")
    const  [oneProject, setOneProject] = useState({})
    const [projects, setProjects] = useState([])
    const [createNewProject, setcreateNewProject] = useState({
        title: "",
        description: "",
    })

    const [jsonFile, setFile] = useState({})

      useEffect(() => {
          axios.get("/projects").then(projects => {
              setProjects(projects.data)

              console.log(projects.data)
          })
          setDisplay("None")
      }, [])
    
    
    console.log("Projects component render")
    
//       useEffect(() => {
//         axios.get("/projects").then(projects => {
//             setProjects(projects.data)

//             console.log(projects.data)
//         })
//         setDisplay("ThreeJS")
// }, [jsonFile])

    if (display === "None") {
        return (
            <div>
                <div className="row">
                    <ProjectBar projects={projects} setDisplay={setDisplay} setOneProject={setOneProject}/>
                    <div className="col-10 projectScreen">
                    </div>
                </div>
            </div>
        )
        
    } else if (display==="Form") {
        return (
            <div>
                <div className="row">
                    <ProjectBar projects={projects} setDisplay={setDisplay} setOneProject={setOneProject} />
                    <div className="col-10 projectScreen">

                    <CreateProject setDisplay={setDisplay} createNewProject={createNewProject} setcreateNewProject={setcreateNewProject} setDisplay={setDisplay} setProjects={setProjects} projects={projects} jsonFile={jsonFile} setFile={setFile} />
                    </div>
                    </div>

            </div>
        )
    } else if (display === "oneProject") {
        return ( 
            <div>
            <div className="row">
            <ProjectBar projects={projects} setDisplay={setDisplay} setOneProject={setOneProject}/>
                <div className="col-10 projectScreen">
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
            <div className="col-10 projectScreen">
            <UploadFile project={projects[projects.length - 1]} jsonFile={jsonFile} setFile={setFile} setDisplay={setDisplay}/>
                        
                        {/*<p>NewProjectShown</p>
                        <p>{createNewProject.title}</p>
                        <p>{createNewProject.description}</p>
                        <p>{JSON.stringify(jsonFile)} whaaat{console.log(createNewProject, jsonFile)}</p>*/}
                </div>
            </div>
        </div>
        )
    } else if (display === "ThreeJS") {
        console.log(projects[projects.length - 1])
        return ( 
            <div>
            <div className="row">
            <ProjectBar projects={projects} setDisplay={setDisplay} setOneProject={setOneProject}/>
                <div className="col-10 projectScreen">
                        <ThreeJS project={oneProject} jsonFile={oneProject.file ? oneProject.file : jsonFile} setProjects={setProjects}/>
                        
                        {/*<p>NewProjectShown</p>
                        <p>{createNewProject.title}</p>
                        <p>{createNewProject.description}</p>
                        <p>{JSON.stringify(jsonFile)} whaaat{console.log(createNewProject, jsonFile)}</p>*/}
                </div>
            </div>
        </div>
        )
    }
    
   
}

export default Projects
