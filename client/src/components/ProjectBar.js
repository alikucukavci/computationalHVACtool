import React from 'react'

const ProjectBar = (props) => {



    return (
        <div className="col-2 projectBar">
            <h5>Projects</h5>

            {props.projects.map(x => {
                return (
                    <div onClick={() => {
                        console.log(x)
                        props.setOneProject(x)
                        props.setDisplay("oneProject")
                    }}>{x.title}</div>
                )
            })}
  
            <button onClick={()=>props.setDisplay("Form")}  className="btn btn-dark">New</button>
        </div>
    )
}

export default ProjectBar
