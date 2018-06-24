import * as THREE from 'three'
import MainMenu from './modules/main-menu'
// // import * as dat from 'dat.gui'
// import gltfLoader from './vendor/three/GLTFLoader'
// import orbitControls from './vendor/three/OrbitControls'
// // import config from './config'
// import { find, random, round } from './util/zorro'
// import Game from './modules/game'

// Create audiocontext
window.audiocontext = new AudioContext()

// gltfLoader(THREE)
// orbitControls(THREE)
// const loader = new THREE.GLTFLoader()

// Basic Setup
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000)

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
const pointLight = new THREE.PointLight(0xffffff, 0.75, 0)
// const directionalLight1 = new THREE.DirectionalLight(0xefefff, 0.8)
// // const directionalLight2 = new THREE.DirectionalLight(0xefefff, 0.2)
// // const light3 = new THREE.PointLight(0xefefff, 2, 20, 2)
// const raycaster = new THREE.Raycaster()
// const helperPlane = new THREE.Mesh(new THREE.PlaneBufferGeometry(100, 100, 8, 8), new THREE.MeshBasicMaterial({
//   color: 0xff0000,
//   transparent: true,
//   opacity: 0
// }))
// const mouse = new THREE.Vector2()
// const worldVector = new THREE.Vector3()
// const offset = new THREE.Vector3()
const renderer = new THREE.WebGLRenderer({antialias: true})

// // For Dev
// // const helper = new THREE.CameraHelper(camera)
// // const controls = new THREE.OrbitControls(camera)

// let soundblocks = []
// let currentSoundblock
// let foundObjects
// let tmpIntersects

// const onPointerdown = (e) => {
//   mouse.x = (e.clientX / window.innerWidth) * 2 - 1
//   mouse.y = -(e.clientY / window.innerHeight) * 2 + 1
//   worldVector.x = mouse.x
//   worldVector.y = mouse.y
//   worldVector.z = -1.25

//   worldVector.unproject(camera)

//   raycaster.set(camera.position, worldVector.sub(camera.position).normalize())

//   // Get first found object
//   foundObjects = raycaster.intersectObjects(soundblocks)

//   if (foundObjects.length) {
//     currentSoundblock = foundObjects[0].object

//     // Get offset
//     offset.copy(raycaster.intersectObject(helperPlane)[0].point).sub(helperPlane.position)
//     document.addEventListener('pointerup', onPointerup)
//   }
// }

// const onPointermove = (e) => {
//   e.preventDefault()

//   mouse.x = (e.clientX / window.innerWidth) * 2 - 1
//   mouse.y = -(e.clientY / window.innerHeight) * 2 + 1
//   worldVector.x = mouse.x
//   worldVector.y = mouse.y
//   worldVector.z = -1.25

//   worldVector.unproject(camera)

//   raycaster.set(camera.position, worldVector.sub(camera.position).normalize())

//   if (currentSoundblock) {
//     tmpIntersects = raycaster.intersectObject(helperPlane)

//     currentSoundblock.position.x = tmpIntersects[0].point.x - offset.x
//     currentSoundblock.position.y = tmpIntersects[0].point.y - offset.y
//   } else {
//     // Update position of the plane if need
//     tmpIntersects = raycaster.intersectObjects(soundblocks)
//     if (tmpIntersects.length > 0) {
//       helperPlane.position.copy(tmpIntersects[0].object.position)
//       helperPlane.lookAt(camera.position)
//     }
//   }
// }

// const onPointerup = () => {
//   // Snap to grid
//   currentSoundblock.position.x = round(currentSoundblock.position.x, 1)
//   currentSoundblock.position.y = round(currentSoundblock.position.y, 1)

//   // Clear reference
//   currentSoundblock = null

//   // Update position of the plane if need
//   tmpIntersects = raycaster.intersectObjects(soundblocks)
//   if (tmpIntersects.length > 0) {
//     helperPlane.position.copy(tmpIntersects[0].object.position)
//     helperPlane.lookAt(camera.position)
//   }

//   document.removeEventListener('pointerup', onPointerup)
// }

const onResize = () => {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
}

// // Start game!!
// // directionalLight1.position.set(1, 1, 1).normalize()
// // directionalLight2.position.set(-1, -1, -1).normalize()

// helperPlane.position.z = -1.25
// // camera.position.z = 110
// scene.background = new THREE.Color(0xFFF6D8)
scene.background = new THREE.Color(0xffffff)
scene.add(ambientLight)
scene.add(pointLight)
// scene.add(directionalLight1)
// // scene.add(light3)
// // scene.add(directionalLight2)
// scene.add(helperPlane)

// // For Dev
// // scene.add(helper)

// loader.load('assets/3d_models/soundblock.gltf', (gltf) => {
//   let soundblockModel = find(gltf.scene.children, (child) => child.name === 'soundblock')

//   // soundblockModel.position.z = -101

//   for (let i = 5; i--;) {
//     let clone = soundblockModel.clone()
//     clone.scale.setScalar(0.1)
//     clone.position.x = -0.9 + (i * 0.3)
//     clone.position.y = 0
//     clone.position.z = -1.25
//     clone.material = new THREE.MeshStandardMaterial({
//       roughness: 0.9,
//       color: new THREE.Color(random(0, 1, 4), random(0, 1, 4), random(0, 1, 4))
//     })
//     scene.add(clone)
//     soundblocks.push(clone)
//   }

//   // gui.add(soundblocks[3].scale, 'x')
//   // gui.add(soundblocks[3].scale, 'y')
//   // gui.add(soundblocks[3].scale, 'z')
// })

renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

// // Bind events
// // document.addEventListener('pointermove', onPointermove)
// // document.addEventListener('pointerdown', onPointerdown)
window.addEventListener('resize', onResize, false)

const animate = () => {
  requestAnimationFrame(animate)
  renderer.render(scene, camera)
}

animate()

// // Dev stuff
// // let gui = new dat.GUI()
// // gui.add(camera.position, 'z')

// // Game Logic
// Game.init()

// const btnSetDifficultyEasy = document.getElementById('btn-difficulty-easy')
// const btnSetDifficultyNormal = document.getElementById('btn-difficulty-normal')
// const btnSetDifficultyHard = document.getElementById('btn-difficulty-hard')
// const btnPlay = document.getElementById('play')
// const lblDifficulty = document.getElementById('lbl-difficulty')

// const updateView = () => {
//   switch (Game.getDifficulty()) {
//     case 0:
//       lblDifficulty.innerHTML = 'Easy'
//       break
//       case 1:
//       lblDifficulty.innerHTML = 'Normal'
//       break
//       case 2:
//       lblDifficulty.innerHTML = 'Hard'
//   }

// }

// btnSetDifficultyEasy.addEventListener('click', () => {
//   Game.setDifficulty(0)
//   updateView()
// })

// btnSetDifficultyNormal.addEventListener('click', () => {
//   Game.setDifficulty(1)
//   updateView()
// })

// btnSetDifficultyHard.addEventListener('click', () => {
//   Game.setDifficulty(2)
//   updateView()
// })

// btnPlay.addEventListener('click', () => {
//   Game.prepareGame()
//   .then(() => {
//     console.log('start game!!')
//   })
// })

// updateView()

MainMenu.init(scene)
