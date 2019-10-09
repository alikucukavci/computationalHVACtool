import React, {useState, useEffect} from 'react'
import Files from "react-files";
import { Form, Button } from "react-bootstrap";
import axios from "axios"

const UploadFile = (props) => {
  
  let fileReader = new FileReader()
  fileReader.onload = event => {
    let newFile = JSON.parse(event.target.result)

    //ADD uniq ID FOR EVERY ROOM
    newFile.rooms = newFile.rooms.map((x,i) => {
      x.id = i; 
      return x;
    })

    props.setFile(newFile);
    axios.put(`/api/projects/${props.project._id}`, {
      file: newFile
    }).then(response => {
      props.setOneProject(response.data)
      props.setDisplay("ThreeJS")
    })
}

  
  return (
    <div className="upload-page">
    <Form.Group>
          <div className="files">
        <Files
          className="files-dropzone"
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
        </Form.Group>    </div>
  )
}

export default UploadFile
