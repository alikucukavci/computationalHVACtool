import React from 'react'
import axios from "axios"
import { Form, Button } from "react-bootstrap";


const CreateProject = (props) => {
    
console.log(props)

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
            file: props.file
          })
          .then(() => {
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
        <div className="col-9 projectScreen">
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

          <Form.Group>
          <Form.Label>Upload file:</Form.Label>
          <Form.Control
            type="file"
            name="fileUpload"
            value={props.description}
            onChange={handleChange}
          />
        </Form.Group>
          
          <Button type="submit" >Add</Button>
        </Form>
            
            
            
            
            
            
    {/*<button onClick={()=>props.setDisplay("newProject")} type="submit">Add new Project</button>*/}
</div>
    )
}

export default CreateProject
