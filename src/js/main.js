import WebVRSetup from './modules/webvr-setup'

import * as THREE from 'three'
import global from './modules/global'
import pubsub from './modules/pubsub'

WebVRSetup.init()

// For testing
let geometries = [
  new THREE.BoxBufferGeometry(0.2, 0.2, 0.2),
  new THREE.ConeBufferGeometry(0.2, 0.2, 64),
  new THREE.CylinderBufferGeometry(0.2, 0.2, 0.2, 64),
  new THREE.IcosahedronBufferGeometry(0.2, 3),
  new THREE.TorusBufferGeometry(0.2, 0.04, 64, 32)
]
for (let i = 0; i < 50; i++) {
  let geometry = geometries[Math.floor(Math.random() * geometries.length)]
  let material = new THREE.MeshStandardMaterial({
    color: Math.random() * 0xffffff,
    roughness: 0.7,
    metalness: 0.0
  })
  let object = new THREE.Mesh(geometry, material)
  object.position.x = Math.random() * 4 - 2
  object.position.y = Math.random() * 2
  object.position.z = Math.random() * 4 - 2
  object.rotation.x = Math.random() * 2 * Math.PI
  object.rotation.y = Math.random() * 2 * Math.PI
  object.rotation.z = Math.random() * 2 * Math.PI
  object.scale.setScalar(Math.random() + 0.5)
  object.castShadow = true
  object.receiveShadow = true
  global.selectables.add(object)
}

pubsub.on('vrcontroller.grabobject', (obj) => {
  obj.scale.setScalar(1.2)
})

pubsub.on('vrcontroller.releaseobject', (obj) => {
  obj.rotation.y += 0.3
})

pubsub.on('vrcontroller.clickobject', (obj) => {
  obj.position.y += 0.3
})
