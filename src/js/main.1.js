import * as THREE from 'three'
import VRController from './modules/vr-controller'
// import Game from './modules/game'
import WEBVR from './vendor/three/WebVR'
// // import './vendor/three/ViveController'
import MainMenu from './modules/main-menu'
// import pubsub from './modules/pubsub'
// // // import * as dat from 'dat.gui'
// // import orbitControls from './vendor/three/OrbitControls'
// // // import config from './config'
// import { find, random, round } from './util/zorro'
// // import Game from './modules/game'

// // Create audiocontext
// // window.audiocontext = new AudioContext()

// // gltfLoader(THREE)
// // orbitControls(THREE)

// // Basic Setup
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000)

// // Lighting
// const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
// const pointLight = new THREE.PointLight(0xffffff, 0.75, 0)
// // const directionalLight1 = new THREE.DirectionalLight(0xefefff, 0.8)
// // // const directionalLight2 = new THREE.DirectionalLight(0xefefff, 0.2)
// // // const light3 = new THREE.PointLight(0xefefff, 2, 20, 2)
const raycaster = new THREE.Raycaster()
// const helperPlane = new THREE.Mesh(new THREE.PlaneBufferGeometry(100, 100, 8, 8), new THREE.MeshBasicMaterial({
//   color: 0xff0000,
//   transparent: true,
//   opacity: 0
// }))
// const mouse = new THREE.Vector2()
// const worldVector = new THREE.Vector3()
// const offset = new THREE.Vector3()
const renderer = new THREE.WebGLRenderer({ antialias: true })
let tempMatrix = new THREE.Matrix4();
let group = new THREE.Group()
renderer.vr.enabled = true

// console.log(renderer)

// // // For Dev
// // // const helper = new THREE.CameraHelper(camera)
// // // const controls = new THREE.OrbitControls(camera)

// let soundblocks = []
// let currentSoundblock
// let foundObjects
let tmpIntersects
let controller1
let intersected = []

let lgeometry = new THREE.BufferGeometry().setFromPoints( [ new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 0, 0, - 1 ) ] );
let line = new THREE.Line( lgeometry );
line.name = 'line';
line.scale.z = 5;

// //   worldVector.unproject(camera)

// //   raycaster.set(camera.position, worldVector.sub(camera.position).normalize())

// //   // Get first found object
// //   foundObjects = raycaster.intersectObjects(soundblocks)

// //   if (foundObjects.length) {
// //     currentSoundblock = foundObjects[0].object

// //     // Get offset
// //     offset.copy(raycaster.intersectObject(helperPlane)[0].point).sub(helperPlane.position)
// //     document.addEventListener('pointerup', onPointerup)
// //   }
// // }

// // const onPointermove = (e) => {
// //   e.preventDefault()

// //   mouse.x = (e.clientX / window.innerWidth) * 2 - 1
// //   mouse.y = -(e.clientY / window.innerHeight) * 2 + 1
// //   worldVector.x = mouse.x
// //   worldVector.y = mouse.y
// //   worldVector.z = -1.25

// //   worldVector.unproject(camera)

// //   raycaster.set(camera.position, worldVector.sub(camera.position).normalize())

// //   if (currentSoundblock) {
// //     tmpIntersects = raycaster.intersectObject(helperPlane)

// //     currentSoundblock.position.x = tmpIntersects[0].point.x - offset.x
// //     currentSoundblock.position.y = tmpIntersects[0].point.y - offset.y
// //   } else {
// //     // Update position of the plane if need
// //     tmpIntersects = raycaster.intersectObjects(soundblocks)
// //     if (tmpIntersects.length > 0) {
// //       helperPlane.position.copy(tmpIntersects[0].object.position)
// //       helperPlane.lookAt(camera.position)
// //     }
// //   }
// // }

// // const onPointerup = () => {
// //   // Snap to grid
// //   currentSoundblock.position.x = round(currentSoundblock.position.x, 1)
// //   currentSoundblock.position.y = round(currentSoundblock.position.y, 1)

// //   // Clear reference
// //   currentSoundblock = null

// //   // Update position of the plane if need
// //   tmpIntersects = raycaster.intersectObjects(soundblocks)
// //   if (tmpIntersects.length > 0) {
// //     helperPlane.position.copy(tmpIntersects[0].object.position)
// //     helperPlane.lookAt(camera.position)
// //   }

// //   document.removeEventListener('pointerup', onPointerup)
// // }

const onResize = () => {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
}

// function onSelectStart( event ) {
//   let controller = event.target;
//   var intersections = getIntersections( controller );
//   if ( intersections.length > 0 ) {
//     var intersection = intersections[ 0 ];
//     tempMatrix.getInverse( controller.matrixWorld );
//     var object = intersection.object;
//     object.matrix.premultiply( tempMatrix );
//     object.matrix.decompose( object.position, object.quaternion, object.scale );
//     //object.material.emissive.b = 1;

//     console.log('onSelectStart!!!')
//     object.material.emissive.r = 0;
//     object.material.emissive.g = 1;
//     object.material.emissive.b = 1;
//     controller.add( object );
//     controller.userData.selected = object;
//   }
// }

// function onSelectEnd( event ) {
//   var controller = event.target;
//   if ( controller.userData.selected !== undefined ) {
//     var object = controller.userData.selected;
//     object.matrix.premultiply( controller.matrixWorld );
//     object.matrix.decompose( object.position, object.quaternion, object.scale );
//     object.material.emissive.r = 0;
//     object.material.emissive.g = 0;
//     object.material.emissive.b = 0;
//     object.position.x = round(object.position.x, 1)
//     object.position.y = round(object.position.y, 1)
//     object.position.z = -1.25
//     object.rotation.x = 0
//     object.rotation.y = 0
//     object.rotation.z = 0
//     group.add( object );
//     controller.userData.selected = undefined;
//   }
// }

// function getIntersections( controller ) {
//   tempMatrix.identity().extractRotation( controller.matrixWorld );
//   raycaster.ray.origin.setFromMatrixPosition( controller.matrixWorld );
//   raycaster.ray.direction.set( 0, 0, -1 ).applyMatrix4( tempMatrix );
//   return raycaster.intersectObjects( soundblocks );
// }

// function intersectObjects( controller ) {
//   // Do not highlight when already selected
//   if ( controller.userData.selected !== undefined ) return;

//   var line = controller.getObjectByName( 'line' );
//   var intersections = getIntersections( controller );
//   if ( intersections.length > 0 ) {
//     var intersection = intersections[ 0 ];
//     var object = intersection.object;
//     object.material.emissive.r = 1;
//     object.material.emissive.g = 0;
//     object.material.emissive.b = 1;
//     intersected.push( object );
//     line.scale.z = intersection.distance;
//   } else {
//     line.scale.z = 5;
//   }
// }

// function cleanIntersected() {
//   while ( intersected.length ) {
//     var object = intersected.pop();
//     object.material.emissive.r = 0;
//     object.material.emissive.g = 0;
//     object.material.emissive.b = 0;
//   }
// }

// // // Start game!!
// // // directionalLight1.position.set(1, 1, 1).normalize()
// // // directionalLight2.position.set(-1, -1, -1).normalize()

// // helperPlane.position.z = -1.25
// // // camera.position.z = 110
// // scene.background = new THREE.Color(0xFFF6D8)
// // scene.background = new THREE.Color(0xffffff)
scene.background = new THREE.Color(0xdddddd)
// scene.add(ambientLight)
// scene.add(pointLight)
// // scene.add(directionalLight1)
// // // scene.add(light3)
// // // scene.add(directionalLight2)
// // scene.add(helperPlane)
// // scene.add(group)


renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)
document.body.appendChild(WEBVR.createButton(renderer))

controller1 = renderer.vr.getController(0)
// controller1.addEventListener('selectstart', onSelectStart)
// controller1.addEventListener('selectend', onSelectEnd)
controller1.add( line.clone() );
scene.add(controller1)

// // // Bind events
// // // document.addEventListener('pointermove', onPointermove)
// // // document.addEventListener('pointerdown', onPointerdown)
window.addEventListener('resize', onResize, false)

const render = () => {
  // cleanIntersected();
  // intersectObjects( controller1 );

  renderer.render(scene, camera)
}

const animate = () => {
  renderer.setAnimationLoop(render)
}

animate()

// MainMenu.init(scene, camera)
// Game.init(scene, camera)

// // Subscriptions
// // pubsub.on('mainMenu.play', () => {
// //   Game.start()
// // })

// // for (let i = -10; i < 10; i++) {
// //   let material = new THREE.LineBasicMaterial({
// //     color: 0xeeeeee,
// //     transparent: false,
// //     opacity: 0.4
// //     // lights: true
// //   });

// //   let geometry = new THREE.Geometry();
// //   geometry.vertices.push(
// //     new THREE.Vector3( i * (2 * 0.075), -0.075, -1 ),
// //     new THREE.Vector3( i * (2 * 0.075), -0.075, -2000 )
// //   );

// //   let line = new THREE.Line( geometry, material );
// //   scene.add( line );
// // }

// // for (let i = -10; i < 10; i++) {
// //   let material = new THREE.LineBasicMaterial({
// //     color: 0xeeeeee,
// //     transparent: false,
// //     opacity: 0.4
// //     // lights: true
// //   });

// //   let geometry = new THREE.Geometry();
// //   geometry.vertices.push(
// //     new THREE.Vector3( i * (2 * 0.075), 0.075, -1 ),
// //     new THREE.Vector3( i * (2 * 0.075), 0.075, -2000 )
// //   );

// //   let line = new THREE.Line( geometry, material );
// //   scene.add( line );
// // }

// // for (let i = -10; i < 10; i++) {
// //   let material = new THREE.LineBasicMaterial({
// //     color: 0xeeeeee,
// //     transparent: false,
// //     opacity: 0.4
// //   });

// //   let geometry = new THREE.Geometry();
// //   geometry.vertices.push(
// //     new THREE.Vector3( i * (2 * 0.075), -10, -1.25 ),
// //     new THREE.Vector3( i * (2 * 0.075), 10, -1.25 )
// //   );

// //   let line = new THREE.Line( geometry, material );
// //   scene.add( line );
// // }

// // for (let i = -10; i < 10; i++) {
// //   let material = new THREE.LineBasicMaterial({
// //     color: 0xf5f5f5,
// //     transparent: false,
// //     opacity: 0.4
// //   });

// //   let geometry = new THREE.Geometry();
// //   geometry.vertices.push(
// //     new THREE.Vector3( i * (2 * 0.075), -10, -1.75 ),
// //     new THREE.Vector3( i * (2 * 0.075), 10, -1.75 )
// //   );

// //   let line = new THREE.Line( geometry, material );
// //   scene.add( line );
// // }

VRController.init()
