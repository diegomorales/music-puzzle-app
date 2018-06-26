import * as THREE from 'three'
import gltfLoader from '../vendor/three/GLTFLoader'
import { find, random } from '../util/zorro'

gltfLoader(THREE)
const loader = new THREE.GLTFLoader()

// const defaults = {}

export default (options = {}) => {
  const instance = {}
  // const settings = Object.assign({}, defaults, options)

  instance.create = () => new Promise((resolve, reject) => {
    loader.load('assets/3d_models/soundblock.gltf', (gltf) => {
      let model = find(gltf.scene.children, (child) => child.name === 'soundblock')

      model.scale.setScalar(0.075)
      model.position.y = 0
      model.position.z = -1.25
      model.material = new THREE.MeshStandardMaterial({
        roughness: 0.9,
        color: new THREE.Color(random(0, 1, 4), random(0, 1, 4), random(0, 1, 4))
      })

      // Add meta data
      model._mp_data = {
        gridSize: 0.15 // is twice the scale ratio
      }

      // let box = new THREE.Box3().setFromObject( model );
      // let v = new THREE.Vector3()
      // box.getSize(v)
      // console.log(v)

      resolve(model)
    })
  })

  return instance
}
