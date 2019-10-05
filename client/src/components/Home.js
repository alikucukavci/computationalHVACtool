import React, { useState, useEffect} from 'react'
import Files from "react-files";
import axios from "axios"
const Home = () => {
    
    const [jsonFile, setFile] = useState({})

    
    useEffect(() => {
        axios
        .post("/projects", {
          file: jsonFile
        })
        .then(() => {
          console.log("MongoDB is working")
          })
        .catch(err => {
          console.log(err);
        });
        console.log(jsonFile)


    }, [jsonFile])

    let fileReader = new FileReader()
    fileReader.onload = event => {
        setFile(JSON.parse(event.target.result));
    };

    
    return (
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
    );
}
export default Home