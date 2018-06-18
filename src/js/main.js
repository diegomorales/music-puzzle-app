import * as THREE from 'three'
import gltfLoader from './vendor/three/GLTFLoader'
import orbitControls from './vendor/three/OrbitControls'
// import config from './config'
import {find, random} from './util/zorro'

// Create audiocontext
window.audiocontext = new AudioContext()

gltfLoader(THREE)
orbitControls(THREE)
const loader = new THREE.GLTFLoader()
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(20, window.innerWidth / window.innerHeight, 100, 1000)
const ambientLight = new THREE.AmbientLight(0x404040, 4)
const directionalLight1 = new THREE.DirectionalLight(0xefefff, 0.8)
const directionalLight2 = new THREE.DirectionalLight(0xefefff, 0.2)
const light3 = new THREE.PointLight(0xefefff, 2, 20, 2)
const raycaster = new THREE.Raycaster()
const helperPlane = new THREE.Mesh(new THREE.PlaneBufferGeometry(1000, 1000, 8, 8), new THREE.MeshBasicMaterial({
  color: 0xffffff,
  transparent: true,
  opacity: 0
}))
const mouse = new THREE.Vector2()
const worldVector = new THREE.Vector3()
const offset = new THREE.Vector3()
const renderer = new THREE.WebGLRenderer()

// For Dev
// const helper = new THREE.CameraHelper(camera)
// const controls = new THREE.OrbitControls(camera)

let soundblocks = []
let currentSoundblock
let foundObjects
let tmpIntersects

const onPointerdown = (e) => {
  mouse.x = (e.clientX / window.innerWidth) * 2 - 1
  mouse.y = -(e.clientY / window.innerHeight) * 2 + 1
  worldVector.x = mouse.x
  worldVector.y = mouse.y
  worldVector.z = -101

  worldVector.unproject(camera)

  raycaster.set(camera.position, worldVector.sub(camera.position).normalize())

  // Get first found object
  foundObjects = raycaster.intersectObjects(soundblocks)

  if (foundObjects.length) {
    currentSoundblock = foundObjects[0].object

    // Get offset
    offset.copy(raycaster.intersectObject(helperPlane)[0].point).sub(helperPlane.position)
    document.addEventListener('pointerup', onPointerup)
  }
}

const onPointermove = (e) => {
  e.preventDefault()

  mouse.x = (e.clientX / window.innerWidth) * 2 - 1
  mouse.y = -(e.clientY / window.innerHeight) * 2 + 1
  worldVector.x = mouse.x
  worldVector.y = mouse.y
  worldVector.z = -101

  worldVector.unproject(camera)

  raycaster.set(camera.position, worldVector.sub(camera.position).normalize())

  if (currentSoundblock) {
    tmpIntersects = raycaster.intersectObject(helperPlane)

    currentSoundblock.position.x = tmpIntersects[0].point.x - offset.x
    currentSoundblock.position.y = tmpIntersects[0].point.y - offset.y
  } else {
    // Update position of the plane if need
    tmpIntersects = raycaster.intersectObjects(soundblocks)
    if (tmpIntersects.length > 0) {
      helperPlane.position.copy(tmpIntersects[0].object.position)
      helperPlane.lookAt(camera.position)
    }
  }
}

const onPointerup = () => {
  // Snap to grid
  currentSoundblock.position.x = Math.round(currentSoundblock.position.x)
  currentSoundblock.position.y = Math.round(currentSoundblock.position.y)

  // Clear reference
  currentSoundblock = null

  // Update position of the plane if need
  tmpIntersects = raycaster.intersectObjects(soundblocks)
  if (tmpIntersects.length > 0) {
    helperPlane.position.copy(tmpIntersects[0].object.position)
    helperPlane.lookAt(camera.position)
  }

  document.removeEventListener('pointerup', onPointerup)
}

// Start game!!
// directionalLight1.position.set(1, 1, 1).normalize()
// directionalLight2.position.set(-1, -1, -1).normalize()

helperPlane.position.z = -101
// camera.position.z = 110
scene.background = new THREE.Color(0xe3d2f3)
scene.add(ambientLight)
scene.add(directionalLight1)
scene.add(light3)
// scene.add(directionalLight2)
scene.add(helperPlane)

// For Dev
// scene.add(helper)

loader.load('assets/3d_models/soundblock.gltf', (gltf) => {
  let soundblockModel = find(gltf.scene.children, (child) => child.name === 'soundblock')

  soundblockModel.position.z = -101

  for (let i = 5; i--;) {
    let clone = soundblockModel.clone()
    clone.position.x = soundblockModel.position.x + (i * 3) - 7
    clone.material = new THREE.MeshStandardMaterial({
      roughness: 0.9,
      color: new THREE.Color(random(0, 1, 4), random(0, 1, 4), random(0, 1, 4))
    })
    scene.add(clone)
    soundblocks.push(clone)
  }
})

renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

// Bind events
document.addEventListener('pointermove', onPointermove)
document.addEventListener('pointerdown', onPointerdown)

const animate = () => {
  requestAnimationFrame(animate)

  // helper.update()

  renderer.render(scene, camera)
}

animate()
