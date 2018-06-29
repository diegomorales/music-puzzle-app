import * as THREE from 'three'

const defaults = {
  text: 'Button',
  size: 'normal'
}

export default (options = {}) => new Promise((resolve, reject) => {
  const settings = Object.assign({}, defaults, options)

  // Private vars
  let fontLoader = new THREE.FontLoader()
  let buttonTextGeometry
  let buttonTextMaterial
  let buttonText
  let buttonBoxGeometry
  let buttonBoxMaterial
  let buttonBox
  let button = new THREE.Group()

  fontLoader.load('assets/fonts/exo_bold.json', (font) => {
    // Button Text
    buttonTextGeometry = new THREE.TextBufferGeometry(settings.text, {
      font: font,
      size: 0.045,
      height: 0.0005
    })

    buttonTextMaterial = new THREE.MeshLambertMaterial({
      color: 0xffffff
    })

    buttonTextGeometry.computeBoundingBox()
    buttonTextGeometry.computeVertexNormals()

    buttonText = new THREE.Mesh(buttonTextGeometry, buttonTextMaterial)
    buttonText.name = 'button'
    buttonText.buttonId = settings.id

    // Button Box
    buttonBoxGeometry = new THREE.BoxBufferGeometry(0.33, 0.12, 0.12)
    buttonBoxMaterial = new THREE.MeshLambertMaterial({
      color: 0xFF8351
    })

    buttonBox = new THREE.Mesh(buttonBoxGeometry, buttonBoxMaterial)
    buttonBox.name = 'button'
    buttonBox.buttonId = settings.id

    // Center text place in front of box
    buttonText.position.x = -0.5 * (buttonTextGeometry.boundingBox.max.x - buttonTextGeometry.boundingBox.min.x)
    buttonText.position.y = -0.02
    buttonText.position.z = 0.06

    // Button
    button.add(buttonBox)
    button.add(buttonText)

    resolve(button)
  })
})
