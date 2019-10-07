import React, { Component } from 'react';
import * as THREE from 'three';

export default class ThreeJS extends Component {

  // state = {
  //   cubeArr: []
  // };

  componentDidMount(){
    const width = this.mount.clientWidth;
    const height = this.mount.clientHeight;
    //ADD SCENE
    this.scene = new THREE.Scene();
    //ADD CAMERA
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.z = 4;
    //ADD RENDERER
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setClearColor('#000000');
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.mount.appendChild(this.renderer.domElement);
    //ADD CUBE
    const geometry = new THREE.BoxGeometry(1, 1, 1)
    const material = new THREE.MeshBasicMaterial({ color: '#433F81'     })
    this.cube = new THREE.Mesh(geometry, material)
    this.scene.add(this.cube)
    
    
    // for (let room in this.props.jsonFile) {
    //   this.setState({cubeArr: cubeArr.concat([(new THREE.Mesh(new THREE.BoxGeometry(room.x, room.y, room.z),material))])})
    // }
    // this.state.cubeArr.map(cube=>this.scene.add(cube))
    // this.scene.add(this.cube);
  
    // this.start();
    
  }
componentWillUnmount(){
    this.stop();
    this.mount.removeChild(this.renderer.domElement);
  }
// start = () => {
//     if (!this.frameId) {
//       this.frameId = requestAnimationFrame(this.animate);
//     }
//   }
// stop = () => {
//     cancelAnimationFrame(this.frameId)
//   }
//   animate = () => {
//   //   this.state.cubeArr.forEach(cube => {
//   //     cube.rotation.x += 0.01
//   //  cube.rotation.y += 0.01
//   //  this.renderScene()
//   //  this.frameId = window.requestAnimationFrame(this.animate)
//   // })
//    this.cube.rotation.x += 0.01
//    this.cube.rotation.y += 0.01
//    this.renderScene()
//    this.frameId = window.requestAnimationFrame(this.animate)
//  }
renderScene = () => {
  this.renderer.render(this.scene, this.camera);
}
  render() {
    console.log("state",this.state.cubeArr);
    return(
      <div
        style={{ width: '400px', height: '400px' }}
        ref={(mount) => { this.mount = mount; }}
      />
    );
  }
}