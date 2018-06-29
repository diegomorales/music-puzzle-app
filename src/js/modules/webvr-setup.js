import * as THREE from 'three'
import WEBVR from '../vendor/three/WebVR'
import global from './global'
import pubsub from './pubsub'

const defaults = {
  clickTimeout: 300 // ms
}
const instance = {}

// Private vars
let settings
let camera
let scene
let renderer
let raycaster
let tempMatrix
let selectables
let laserGeometry
let laser
let controller1
let intersected = []
let clickTimer

const initVR = () => {
  let div = document.createElement('div')

  div.appendChild(WEBVR.createButton(renderer))
  div.style.position = 'absolute'
  div.style.bottom = '0'
  div.style.width = '100%'
  div.style.height = '80px'
  div.style.backgroundColor = 'rgba(0,0,0,0.33)'

  renderer.vr.enabled = true

  document.body.appendChild(div)
}

const getIntersections = (controller) => {
  tempMatrix.identity().extractRotation(controller.matrixWorld)
  raycaster.ray.origin.setFromMatrixPosition(controller.matrixWorld)
  raycaster.ray.direction.set(0, 0, -1).applyMatrix4(tempMatrix)
  return raycaster.intersectObjects(selectables.children, true)
}

const onSelectStart = (e) => {
  let controller = e.target
  let intersections = getIntersections(controller)

  if (intersections.length > 0) {
    let intersection = intersections[0]
    let object = intersection.object

    if (object.isDraggable) {
      tempMatrix.getInverse(controller.matrixWorld)
      object.matrix.premultiply(tempMatrix)
      object.matrix.decompose(object.position, object.quaternion, object.scale)

      // 'Hover' effect
      object.material.emissive.r = 1
      object.material.emissive.g = 1
      object.material.emissive.b = 1

      controller.add(object)
      controller.userData.selected = object

      clickTimer = performance.now()
      pubsub.trigger('vrcontroller.grabobject', object)
    } else {
      pubsub.trigger('vrcontroller.clickobject', object)
    }
  }
}
const onSelectEnd = (e) => {
  let controller = e.target
  if (controller.userData.selected !== undefined) {
    let object = controller.userData.selected
    object.matrix.premultiply(controller.matrixWorld)
    object.matrix.decompose(object.position, object.quaternion, object.scale)
    object.material.emissive.r = 0
    object.material.emissive.g = 0
    object.material.emissive.b = 0

    selectables.add(object)

    if (performance.now() - clickTimer <= settings.clickTimeout) {
      pubsub.trigger('vrcontroller.clickobject', object)
    }

    pubsub.trigger('vrcontroller.releaseobject', object)
    controller.userData.selected = undefined
  }
}

const cleanIntersected = () => {
  while (intersected.length) {
    let object = intersected.pop()
    object.material.emissive.r = 0
    object.material.emissive.g = 0
    object.material.emissive.b = 0
  }
}

const intersectObjects = (controller) => {
  // Do not highlight when already selected
  if (controller.userData.selected !== undefined) {
    return
  }

  let line = controller.getObjectByName('laser')
  let intersections = getIntersections(controller)
  if (intersections.length > 0) {
    let intersection = intersections[0]
    let object = intersection.object
    object.material.emissive.r = 1
    object.material.emissive.g = 0
    object.material.emissive.b = 1
    intersected.push(object)
    line.scale.z = intersection.distance
  } else {
    line.scale.z = 5
  }
}

const onResize = () => {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
}

const render = () => {
  cleanIntersected()
  intersectObjects(controller1)
  renderer.render(scene, camera)
}

const animate = () => {
  renderer.setAnimationLoop(render)
}

const bindControllerEvents = () => {
  controller1.addEventListener('selectstart', onSelectStart)
  controller1.addEventListener('selectend', onSelectEnd)
}

const setupController = () => {
  // Laser
  laserGeometry = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, -1)])
  laser = new THREE.Line(laserGeometry)
  laser.name = 'laser'
  laser.scale.z = 5

  // // Get controller
  controller1 = renderer.vr.getController(0)
  controller1.add(laser.clone())
  scene.add(controller1)
  scene.add(selectables)

  bindControllerEvents()
}

instance.init = (options = {}) => {
  settings = Object.assign({}, defaults, options)
  scene = new THREE.Scene()
  camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000)
  renderer = new THREE.WebGLRenderer({ antialias: true })
  raycaster = new THREE.Raycaster()
  tempMatrix = new THREE.Matrix4()
  selectables = new THREE.Group()

  // Scene setup
  scene.background = new THREE.Color(0xffffff)

  // Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
  const pointLight = new THREE.PointLight(0xffffff, 0.75, 0)

  scene.add(ambientLight)
  scene.add(pointLight)

  // Renderer setup
  renderer.setSize(window.innerWidth, window.innerHeight)

  // Show scene
  document.body.appendChild(renderer.domElement)

  // Responsive
  window.addEventListener('resize', onResize, false)

  // Export vars to global
  global.scene = scene
  global.selectables = selectables
  // global.camera = camera
  // global.renderer = renderer

  initVR()
  setupController()

  animate()

  return instance
}

export default instance
