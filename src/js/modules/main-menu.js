import * as THREE from 'three'
import { TweenLite, Power3, Back } from 'gsap/TweenMax'
import pubsub from './pubsub'
import {throwOut, fadeOut} from '../util/animations'

const instance = {}

let menuGroup
let scene
let camera
let pointer = new THREE.Vector2()
let raycaster = new THREE.Raycaster()
let btnPlay = new THREE.Group()

const createTitle = () => new Promise((resolve, reject) => {
  let fontLoader = new THREE.FontLoader()
  let titleText
  let titleMaterial = new THREE.MeshLambertMaterial()
  let title = new THREE.Mesh()

  fontLoader.load('assets/fonts/exo_bold.json', (font) => {
    titleText = new THREE.TextBufferGeometry('Music Puzzle', {
      font: font,
      size: 0.1,
      height: 0.02
    })

    titleText.computeBoundingBox()
    titleText.computeVertexNormals()

    titleMaterial.color = new THREE.Color(0xFF8351)
    titleMaterial.transparent = true

    title.geometry = titleText
    title.material = titleMaterial

    // Center and position text
    title.position.x = -0.5 * (titleText.boundingBox.max.x - titleText.boundingBox.min.x)
    title.position.y = 1.1
    title.position.z = -1

    resolve(title)
  })
})

const createPlayButton = () => new Promise((resolve, reject) => {
  let fontLoader = new THREE.FontLoader()
  let buttonTextGeometry
  let buttonText = new THREE.Mesh()
  let buttonGeometry = new THREE.BoxBufferGeometry(0.33, 0.12, 0.12)
  let buttonMaterial = new THREE.MeshLambertMaterial()
  let buttonTextMaterial = new THREE.MeshLambertMaterial()
  let buttonBox = new THREE.Mesh()

  buttonMaterial.color = new THREE.Color(0xFF8351)
  buttonMaterial.transparent = true
  buttonTextMaterial.color = new THREE.Color(0xFFFFFF)
  buttonTextMaterial.transparent = true

  buttonBox.geometry = buttonGeometry
  buttonBox.material = buttonMaterial
  buttonBox.name = 'btnPlay'

  btnPlay.add(buttonBox)

  // Position button
  btnPlay.position.y = -0.22

  fontLoader.load('assets/fonts/exo_bold.json', (font) => {
    buttonTextGeometry = new THREE.TextBufferGeometry('PLAY', {
      font: font,
      size: 0.045,
      height: 0.0005
    })

    buttonTextGeometry.computeBoundingBox()
    buttonTextGeometry.computeVertexNormals()

    buttonText.geometry = buttonTextGeometry
    buttonText.material = buttonTextMaterial

    // Center and position text
    buttonText.position.x = -0.5 * (buttonTextGeometry.boundingBox.max.x - buttonTextGeometry.boundingBox.min.x)
    buttonText.position.y = -0.007
    buttonText.position.z = 0.12
    buttonText.name = 'btnPlay'

    btnPlay.add(buttonText)

    resolve(btnPlay)
  })
})

const buildMenu = () => Promise.all([createTitle(), createPlayButton()])

const onPointerdown = (e) => {
  pointer.x = (e.clientX / window.innerWidth) * 2 - 1
  pointer.y = -(e.clientY / window.innerHeight) * 2 + 1

  raycaster.setFromCamera(pointer, camera)

  let intersects = raycaster.intersectObjects(scene.children, true)

  for (let i = intersects.length; i--;) {
    if (intersects[i].object.name === 'btnPlay') {
      // Animate button
      throwOut(btnPlay)
        .then(() => hide())
        .then(() => {
          pubsub.trigger('mainMenu.play')
        })

      break
    }
  }
}

const bindPointerEvents = () => {
  document.addEventListener('pointerdown', onPointerdown)
}

const unbindPointerEvents = () => {
  document.removeEventListener('pointerdown', onPointerdown)
}

/**
 * Show main menu with animation
 */
const show = () => {
  scene.add(menuGroup)

  let fadeInGroup = (group) => {
    group.children.forEach((child) => {
      fadeIn(child)
    })
  }

  let fadeIn = (child) => {
    if (child.type === 'Mesh' && child.material.transparent === true) {
      TweenLite.fromTo(child.material, 0.33, {
        opacity: 0
      },
      {
        opacity: 1,
        ease: Power3.easeInOut
      })

      TweenLite.fromTo(child.position, 0.33, {
        z: child.position.z - 0.008
      },
      {
        z: child.position.z,
        ease: Back.easeInOut
      })
    } else if (child.type === 'Group') {
      fadeInGroup(child)
    }
  }

  // Fade in
  fadeInGroup(menuGroup)

  bindPointerEvents()
}

/**
 * Hide main menu with animation
 */
const hide = () => new Promise((resolve, reject) => {
  fadeOut(menuGroup)
    .then(() => {
      scene.remove(menuGroup)
      unbindPointerEvents()
      resolve()
    })
})

// Public methods
instance.init = (scn, cam) => {
  scene = scn
  camera = cam
  menuGroup = new THREE.Group()

  menuGroup.position.z = -1

  buildMenu()
    .then((meshes) => {
      meshes.forEach((mesh) => {
        menuGroup.add(mesh)
      })

      instance.show()
    })
}

instance.show = show
instance.hide = hide

export default instance
