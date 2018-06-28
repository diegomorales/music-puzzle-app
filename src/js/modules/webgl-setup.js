import * as THREE from 'three'
import global from './global'

const defaults = {
  enableVR: false
}
const instance = {}

// Private vars
let settings
let camera
let scene
let renderer

const onResize = () => {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
}

const render = () => {
  // cleanIntersected();
  // intersectObjects( controller1 );

  renderer.render(scene, camera)
}

const animate = () => {
  if (settings.enableVR) {
    renderer.setAnimationLoop(render)
  } else {
    requestAnimationFrame(animate)
    render()
  }
}

instance.init = (options = {}) => {
  settings = Object.assign({}, defaults, options)
  scene = new THREE.Scene()
  camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000)
  renderer = new THREE.WebGLRenderer({antialias: true})

  // Scene setup
  scene.background = new THREE.Color(0xffffff)

  // Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
  const pointLight = new THREE.PointLight(0xffffff, 0.75, 0)

  scene.add(ambientLight)
  scene.add(pointLight)

  // Renderer setup
  renderer.setSize(window.innerWidth, window.innerHeight)

  if (settings.enableVR) {
    renderer.vr.enabled = true
  }

  document.body.appendChild(renderer.domElement)
  window.addEventListener('resize', onResize, false)

  // Export vars to global
  global.scene = scene
  global.camera = camera
  global.renderer = renderer

  animate()
}

export default instance
