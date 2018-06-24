import * as THREE from 'three'

const instance = {}

let menuGroup
let scene

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

    title.geometry = titleText
    title.material = titleMaterial

    // Center and position text
    title.position.x = -0.5 * (titleText.boundingBox.max.x - titleText.boundingBox.min.x)
    title.position.y = 0.4

    resolve(title)
  })
})

const createPlayButton = () => new Promise((resolve, reject) => {
  let fontLoader = new THREE.FontLoader()
  let button = new THREE.Group()
  let buttonTextGeometry
  let buttonText = new THREE.Mesh()
  let buttonGeometry = new THREE.BoxBufferGeometry(0.33, 0.12, 0.12)
  let buttonMaterial = new THREE.MeshLambertMaterial()
  let buttonTextMaterial = new THREE.MeshLambertMaterial()
  let buttonBox = new THREE.Mesh()

  buttonMaterial.color = new THREE.Color(0xFF8351)
  buttonTextMaterial.color = new THREE.Color(0xFFFFFF)

  buttonBox.geometry = buttonGeometry
  buttonBox.material = buttonMaterial

  button.add(buttonBox)

  // Position button
  button.position.y = -0.22

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

    button.add(buttonText)

    resolve(button)
  })
})

const buildMenu = () => Promise.all([createTitle(), createPlayButton()])

instance.init = (scn) => {
  scene = scn
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

instance.show = () => {
  console.log('Show main menu', menuGroup)
  scene.add(menuGroup)
}

instance.hide = () => {
  scene.remove(menuGroup)
}

export default instance
