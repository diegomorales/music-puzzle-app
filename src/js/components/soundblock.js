import * as THREE from 'three'
import gltfLoader from '../vendor/three/GLTFLoader'
import { find, random } from '../util/zorro'

gltfLoader(THREE)
const loader = new THREE.GLTFLoader()

const defaults = {}

export default (options = {}) => {
  const instance = {}
  const settings = Object.assign({}, defaults, options)

  instance.create = () => new Promise((resolve, reject) => {
    loader.load('assets/3d_models/soundblock.gltf', (gltf) => {
      let model = find(gltf.scene.children, (child) => child.name === 'soundblock')

      model.scale.setScalar(0.1)
      // model.position.x = -0.9 + (i * 0.3)
      model.position.y = 0
      model.position.z = -1.25
      model.material = new THREE.MeshStandardMaterial({
        roughness: 0.9,
        color: new THREE.Color(random(0, 1, 4), random(0, 1, 4), random(0, 1, 4))
      })

      resolve(model)
    })
  })

  return instance
}
