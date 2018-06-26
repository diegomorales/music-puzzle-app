import * as THREE from 'three'
import soundblock from '../components/soundblock'

const instance = {}
let scene
let camera

// for testing
let blockCount = 5

let soundblocks = new THREE.Group()
let promises = []

const clearGroup = (group) => {
  for (let i = group.children.length; i--;) {
    group.remove(group.children[i]);
  }
}

const start = () => {
  // TODO: Get game settings

  // Create soundblocks
  clearGroup(soundblocks)

  for (let i = blockCount; i--;) {
    promises.push(soundblock().create())
  }

  // Show soundblocks
  Promise.all(promises)
    .then((items) => {
      items.forEach((item) => {
        soundblocks.add(item)
      })

      scene.add(soundblocks)
    })
}

instance.init = (scn, cam) => {
  scene = scn
  camera = cam
}

// Public methods
instance.start = start

export default instance
