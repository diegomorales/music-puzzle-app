import * as THREE from 'three'

const instance = {}

let menuGroup
let scene

const createTitle = () => new Promise((resolve, reject) => {
  let fontLoader = new THREE.FontLoader()
  let titleText
  let titleMaterial = new THREE.MeshBasicMaterial()
  let title = new THREE.Mesh()

  fontLoader.load('assets/fonts/exo_bold.json', (response) => {
    titleText = new THREE.TextBufferGeometry('Music Puzzle', {
      font: response,
      size: 0.1,
      height: 0.02
    })

    titleText.computeBoundingBox()
    titleText.computeVertexNormals()

    titleMaterial.color = new THREE.Color(0xff9000)

    title.geometry = titleText
    title.material = titleMaterial

    // Center and position text
    title.position.x = -0.5 * (titleText.boundingBox.max.x - titleText.boundingBox.min.x)
    title.position.y = 0.4

    resolve(title)
  })
})

const buildMenu = () => Promise.all([createTitle()])

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
