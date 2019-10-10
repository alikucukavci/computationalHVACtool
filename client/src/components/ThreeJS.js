import React, { Component } from 'react'
import * as THREE from 'three';
import OrbitControls from "three-orbitcontrols"
import { Interaction } from "three.interaction"
import axios from "axios"



export default class ThreeJS extends Component {
  state = {
    popup: false,
    id: "",
    roomName: "",
    roomNumber: 0,
    roomVolume: 0,
    roomArea: 0,
    roomAHU: 0,
    roomAirflow: 0,
    roomID: "",

  }

  perc2color=(perc)=> {
   
    var r, g, b = 0;
    if(perc < 50) {
        r = 255;
        g = Math.round(5.1 * perc);
    }
    else {
        g = 255;
        r = Math.round(510 - 5.10 * perc);
    }
    let h = r * 0x10000 + g * 0x100 + b * 0x1;
    return  "#"+(("000000" + h.toString(16)).slice(-6));

   
      // let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(rgb);
      //   console.log( {
      //     r: parseInt(result[1], 16),
      //     g: parseInt(result[2], 16),
      //     b: parseInt(result[3], 16)
      //   } )
      // return result ? {
      //   r: parseInt(result[1], 16),
      //   g: parseInt(result[2], 16),
      //   b: parseInt(result[3], 16)
      // } : null;
    
      
      
      
}

  componentDidUpdate() {

    let colorArr = [{r:25, g:229, b:0},{r:255, g:0, b:0},{r:173, g:70, b:0},{r:0, g:255, b:0}]
    
    this.props.jsonFile.rooms.forEach((room,i) => {
      //Updating all rooms with the new value
      const mesh = this.scene.children.find(x => x.roomID === room.id)
      mesh.AHU = room.roomAHU;
      mesh.Airflow = room.roomAirflow;
      let color = new THREE.Color(this.perc2color(mesh.Airflow))

       mesh.material.color = color
      // mesh.material.color.setHex(this.perc2color(mesh.Airflow) )
     
    })
  }

  componentDidMount(){
    // const width = this.mount.clientWidth
    // const height = this.mount.clientHeight
    //ADD SCENE
    this.scene = new THREE.Scene()
    //ADD CAMERA
    this.camera = new THREE.PerspectiveCamera(
      20,
      window.innerWidth / window.innerHeight,
      20,
      1000
    );
    
    this.camera.position.z = 100
    //ADD RENDERER
    this.renderer = new THREE.WebGLRenderer({ antialias: true })
    this.renderer.setClearColor('#000000')
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.mount.appendChild(this.renderer.domElement)
    //ADD Control to the renderer
    this.controls = new OrbitControls(this.camera, this.renderer.domElement)

    // ADD interaction
    this.interaction = new Interaction(this.renderer, this.scene, this.camera);
    
    
    //Create cubes and lines
    const cubeArr = []
    const lineArr = []



    for (let i=0; i <this.props.jsonFile.rooms.length; i++){
      //ADD GEOMETRY
      console.log("iiiii",this.props.jsonFile.rooms[i])
      let geometry = new THREE.BoxGeometry(this.props.jsonFile.rooms[i].size.x, this.props.jsonFile.rooms[i].size.y, this.props.jsonFile.rooms[i].size.z);
      //ADD MATERIAL
   
      let color = new THREE.Color(this.perc2color(this.props.jsonFile.rooms[i].roomAirflow))

       
      let material = new THREE.MeshLambertMaterial({ color });
      //ADD EDGES AND LINE
      let line = new THREE.LineSegments(new THREE.EdgesGeometry(geometry), new THREE.LineBasicMaterial({
        color: "#000000"}));
    

      //ADD ARRAY OF MESHES
      cubeArr.push(new THREE.Mesh(geometry, material)) 
      lineArr.push(line)
     }

    for (let i = 0; i < cubeArr.length; i++){
      
      //ADD POSITION 
      cubeArr[i].position.set(this.props.jsonFile.rooms[i].position.x, this.props.jsonFile.rooms[i].position.y, this.props.jsonFile.rooms[i].position.z);
      lineArr[i].position.set(this.props.jsonFile.rooms[i].position.x, this.props.jsonFile.rooms[i].position.y, this.props.jsonFile.rooms[i].position.z);

      //ADD PROPERTIES
      cubeArr[i].Name = this.props.jsonFile.rooms[i].roomName;
      cubeArr[i].Number = this.props.jsonFile.rooms[i].roomNumber;  
      cubeArr[i].Volume = this.props.jsonFile.rooms[i].roomVolume; 
      cubeArr[i].Area = this.props.jsonFile.rooms[i].roomArea;  
      cubeArr[i].AHU = this.props.jsonFile.rooms[i].roomAHU;
      cubeArr[i].Airflow = this.props.jsonFile.rooms[i].roomAirflow;
      cubeArr[i].roomID = this.props.jsonFile.rooms[i].id;

      //ADD POINTER
      cubeArr[i].cursor = 'pointer';


      //ADD EVENT
      cubeArr[i].on('click', (ev) => {
      this.setState({
        popup: !this.state.popup,
        id: ev.target.uuid,
        roomID: ev.target.roomID,
        roomName: ev.target.Name,
        roomNumber: ev.target.Number,
        roomVolume: ev.target.Volume,
        roomArea: ev.target.Area,
        roomAHU: ev.target.AHU,
        roomAirflow: ev.target.Airflow
      },()=>console.log("state update:",this.state))
    });


      //ADD CUBE TO SCENE
      this.scene.add(cubeArr[i]);
      this.scene.add(lineArr[i]);
    console.log(this.scene)
    }
    
    //ADD POPUP REFERENCE
    this.popup = false
    

     //Add AMBIENT LIGHT
     this.lightAmbient = new THREE.AmbientLight(0xffffff, 0.5);
    this.scene.add(this.lightAmbient)


     //ADD SUNLIGHT
     this.sunLight = new THREE.DirectionalLight(0xffffff, 2.0, 1000);
    this.scene.add(this.sunLight)

    //SHOW CUBES IN SCENE
    this.start()
  }

  closePopup = (ev) => {
    this.setState({
        popup: !this.state.popup,
      })
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  
componentWillUnmount(){
    this.stop()
    this.mount.removeChild(this.renderer.domElement)
  }
start = () => {
    if (!this.frameId) {
      this.frameId = requestAnimationFrame(this.animate)
    }
  }
stop = () => {
    cancelAnimationFrame(this.frameId)
  }
animate = () => {
  //  this.cube.rotation.x += 0.01
  // this.cube.rotation.y += 0
  // this.cube1.rotation.x -= 0.01
  //  this.cube1.rotation.y += 0
   this.renderScene()
   this.frameId = window.requestAnimationFrame(this.animate)
 }
renderScene = () => {
  this.renderer.render(this.scene, this.camera)
  }
  
  handleSubmit = event => {
    event.preventDefault();

    const {roomAHU, roomAirflow, roomID} = this.state
    console.log(this.props.project);
    axios.put(`/api/projects/${this.props.project._id}`, {
      roomAHU, roomAirflow, roomID
    }).then(response => {
      this.props.setOneProject(response.data)
    let updatedProjects =  this.props.projects.map(project => {
        if (project._id === response.data._id) {
          return response.data
        }else return project
      })
      this.props.setProjects(updatedProjects)
      // axios.get("/api/projects").then(projects => {
      //   this.props.setProjects(projects.data)
      // })
    })
    // props.setDisplay("ThreeJS")
  }



  render() {
  return (
    <div>
      <form className="form-roomSubmit" onSubmit={this.handleSubmit}>
      {this.state.popup && 
        <>
        <div className="popup" id="exampleModalScrollable" tabIndex="-1" role="dialog" aria-labelledby="exampleModalScrollableTitle" aria-hidden="true">
        
        <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
        <div className="modal-header">
                <h5 className="modal-title" id="exampleModalCenterTitle">{this.state.roomName} {this.state.roomNumber}</h5>
        <button type="button" onClick={()=>this.closePopup()} className="close" data-dismiss="modal" aria-label="Close">
        <span aria-hidden="true">&times;</span>
        </button>
        </div>
        <div className="modal-body">
                <div>Volume: {this.state.roomVolume} m3</div>
                <div>Area: {this.state.roomArea} m3</div>
                
                <div className="popup-input">
                  <div className="popup-changeableInput"> AHU-VE {this.state.roomAHU}</div>
                  <input type="number" name="roomAHU" value={this.state.roomAHU === 0 ? "" : this.state.roomAHU} onChange={this.handleChange} />
                </div>
                
                <div className="popup-input">
                  <div className="popup-changeableInput">Airflow {this.state.roomAirflow} m3/h </div> <input type="number" name="roomAirflow" value={this.state.roomAirflow === 0 ? "" : this.state.roomAirflow}  onChange={this.handleChange} />
                </div>

        </div>
        <div className="modal-footer">
        <button type="submit" className="btn btn-primary">Save changes</button>
        </div>
        </div>
        </div>
        </div>
        <div className="transparent-background">
        </div>
        </>
      } 
      
      <div
     
        style={{ width: '400px', height: '400px' }}
          ref={(mount) => { this.mount = mount }}
          
        
      >
</div>
    
</form>
      </div>
    )
  }
}