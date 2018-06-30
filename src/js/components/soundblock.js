import * as THREE from 'three'
import gltfLoader from '../vendor/three/GLTFLoader'
import appSetings from '../app-settings'
import { find, random } from '../util/zorro'

gltfLoader(THREE)
const loader = new THREE.GLTFLoader()

export default (options) => new Promise((resolve, reject) => {
  loader.load('assets/3d_models/soundblock.gltf', (gltf) => {
    let model = find(gltf.scene.children, (child) => child.name === 'soundblock')

    model.scale.setScalar(options.gridSize / 2)
    model.position.y = appSetings.perceivedCenterY
    model.position.z = appSetings.mainZ
    model.material = new THREE.MeshStandardMaterial({
      roughness: 0.9,
      color: new THREE.Color(random(0.2, 1, 2), random(0.2, 1, 2), random(0.2, 1, 2))
    })

    resolve(model)
  })
})
