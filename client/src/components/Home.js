import React, { Component } from 'react'
import * as THREE from 'three';
import OrbitControls from "three-orbitcontrols"
import { Interaction } from "three.interaction"


const data = {
	"rooms": [{
			"roomName": "Class room",
			"roomNumber": "3",
			"roomVolume": "50",
			"roomArea": "25",
			"size": {
				"x": "3",
				"y": "3",
				"z": "3"
			},
			"position": {
				"x": "0",
				"y": "0",
				"z": "0"
			}
		},
		{
			"roomName": "Auditorium",
			"roomNumber": "1",
			"roomVolume": "250",
			"roomArea": "100",
			"size": {
				"x": "7",
				"y": "3",
				"z": "7"
			},
			"position": {
				"x": "5",
				"y": "0",
				"z": "-2"
			}
		},

	]
}

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
    
    const geometry = new THREE.BoxGeometry(3, 3, 3)
    
    // //ADD material  
    const material = new THREE.MeshLambertMaterial({ color: '#0xF3FFE2'})
    const line = new THREE.LineSegments(new THREE.EdgesGeometry( geometry ), new THREE.LineBasicMaterial({ color: "#000000" }));
    
    // //ADD geometry and material to a mesh
    const cube = new THREE.Mesh(geometry, material)
    this.scene.add( cube );
    this.scene.add(line)
    
    cube.position.set(3, 3, 3)
    line.position.set(3,3,3)



//     var geometry = new THREE.BoxGeometry( 100, 100, 100 );
// var edges = new THREE.EdgesGeometry( geometry );
// var line = new THREE.LineSegments( edges, new THREE.LineBasicMaterial( { color: 0xffffff } ) );
// this.scene.add( line );

    
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