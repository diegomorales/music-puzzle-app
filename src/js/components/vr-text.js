import * as THREE from 'three'

const defaults = {
  color: 0xFF8351
}

export default (options = {}) => new Promise((resolve, reject) => {
  const settings = Object.assign({}, defaults, options)

  // Private vars
  let fontLoader = new THREE.FontLoader()
  let textGeometry
  let textMaterial
  let text

  // Private methods

  // Public methods

  // Initialisation
  fontLoader.load('assets/fonts/exo_bold.json', (font) => {
    textGeometry = new THREE.TextBufferGeometry(settings.text, {
      font: font,
      size: 0.1,
      height: 0.02
    })

    textGeometry.computeBoundingBox()
    textGeometry.computeVertexNormals()

    textMaterial = new THREE.MeshLambertMaterial({
      color: settings.color
    })

    text = new THREE.Mesh(textGeometry, textMaterial)

    // Center text
    text.position.x = -0.5 * (textGeometry.boundingBox.max.x - textGeometry.boundingBox.min.x)

    resolve(text)
  })
})
