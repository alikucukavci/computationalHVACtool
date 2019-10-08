import React, {useState, useEffect } from 'react'
import axios from "axios"
import { Form, Button } from "react-bootstrap";
import Files from "react-files";


const CreateProject = (props) => {

  let fileReader = new FileReader()
  fileReader.onload = event => {
      props.setFile(JSON.parse(event.target.result));
  };    

const handleChange = event => {
    const { name, value } = event.target;

    props.setcreateNewProject({
      ...props.createNewProject, [name]: value
    });
  };

    const handleSubmit = event => {
        event.preventDefault();
    
        axios
          .post("/projects", {
            title: props.createNewProject.title,
            description: props.createNewProject.description,

          })
          .then((response) => {
            console.log(response.data)
            props.setDisplay("newProject")
            })
          .catch(err => {
            console.log(err);
          });
      
          axios.get("/projects").then(projects => {
              props.setProjects(projects.data)
              console.log(projects.data)
          })
      
      };
    

    
    return (
        <div>
        <h2>Add task: </h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Title:</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={props.createNewProject.title}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Description:</Form.Label>
            <Form.Control
              type="text"
              name="description"
              value={props.description}
              onChange={handleChange}
            />
          </Form.Group>

          {/*<Form.Group>
          <Form.Label>Upload file:</Form.Label>
          <div className="files">
        <Files
          className="files-dropzone btn-danger"
          onChange={file => {
            fileReader.readAsText(file[0]);
          }}
          onError={err => console.log(err)}
          accepts={[".json"]}
          multiple
          maxFiles={3}
          maxFileSize={10000000}
          minFileSize={0}
          clickable
        >
          Drop files here or click to upload
        </Files>
      </div>
        </Form.Group>*/}
        <Button type="submit" >Add</Button>
        </Form>
            
            
            
            
            
            
    {/*<button onClick={()=>props.setDisplay("newProject")} type="submit">Add new Project</button>*/}
</div>
    )
}

export default CreateProject
