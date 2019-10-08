import React, { Component } from 'react'
import * as THREE from 'three';
import OrbitControls from "three-orbitcontrols"
import { Interaction } from "three.interaction"




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
    
    
    //Magic
    const cubeArr = []
    for (let i=0; i <this.props.jsonFile.rooms.length; i++){
      //ADD GEOMETRY
      let geometry = new THREE.BoxGeometry(this.props.jsonFile.rooms[i].size.x, this.props.jsonFile.rooms[i].size.y, this.props.jsonFile.rooms[i].size.z);
      //ADD MATERIAL
      let material = new THREE.MeshLambertMaterial({ color: 'red' });
      //ADD ARRAY OF MESHES
      cubeArr.push(new THREE.Mesh(geometry, material)) 
      
     }

    for (let i = 0; i < cubeArr.length; i++){
      
      //ADD POSITION 
      cubeArr[i].position.set(this.props.jsonFile.rooms[i].position.x, this.props.jsonFile.rooms[i].position.y, this.props.jsonFile.rooms[i].position.z);

      //ADD PROPERTIES
      cubeArr[i].AHU = 0;
      cubeArr[i].Name = this.props.jsonFile.rooms[i].roomName;
      cubeArr[i].Number = this.props.jsonFile.rooms[i].roomNumber;  
      cubeArr[i].Volume = this.props.jsonFile.rooms[i].roomVolume; 
      cubeArr[i].Area = this.props.jsonFile.rooms[i].roomArea;  
      cubeArr[i].AHU = 0;  
      cubeArr[i].Airflow = 0;  

      //ADD POINTER
      cubeArr[i].cursor = 'pointer';


      //ADD EVENT
      cubeArr[i].on('click', (ev) => {
      this.setState({
        popup: !this.state.popup,
        id: ev.target.uuid,
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

      console.log(cubeArr[i])
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
  
  
  render() {
  return (
      <div>
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
                <div> <div> AHU-VE {this.state.roomAHU}</div> <input type="number" name="roomAHU" value={this.state.roomAHU===0?"":this.state.roomAHU} onChange={this.handleChange} /> </div>
                <div><div>Airflow {this.state.roomAirflow} </div> <input type="number" name="roomAirflow" value={this.state.roomAirflow===0?"":this.state.roomAirflow} onChange={this.handleChange}/> </div>

        </div>
        <div className="modal-footer">
        <button type="button" className="btn btn-primary">Save changes</button>
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
    
      
      </div>
    )
  }
}