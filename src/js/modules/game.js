import * as THREE from 'three'
import soundblock from '../components/soundblock'
import {shuffle, compose} from '../util/zorro'

const instance = {}
let scene
let camera

// for testing
let blockCount = 5

let soundblocks = new THREE.Group()
let soundblockPromises = []

const clearGroup = (group) => {
  for (let i = group.children.length; i--;) {
    group.remove(group.children[i])
  }

  return group
}

const prepareSoundblocks = (blocks) => {
  // Give each block an index
  for (let i = 0; i < blocks.length; i++) {
    blocks[i]._mp_index = i
  }

  // Shuffle and return it
  return shuffle(blocks)
}

const positionSoundblocks = (blocks) => {
  let gridSize = blocks[0]._mp_data.gridSize
  let offset = (blocks.length - 1) / 2

  for (let i = 0; i < blocks.length; i++) {
    blocks[i].position.x = -(offset * (2 * gridSize)) + (i * (2 * gridSize))
  }

  console.log(blocks)

  return blocks
}

const start = () => {
  // TODO: Get game settings

  // Create soundblocks
  soundblocks = clearGroup(soundblocks)
  soundblockPromises = []

  let initSoundblocks = compose(positionSoundblocks, prepareSoundblocks)

  // Create as many soundblocks as defined in current game settings.
  for (let i = blockCount; i--;) {
    soundblockPromises.push(soundblock().create())
  }

  // Show soundblocks
  Promise.all(soundblockPromises)
    .then((items) => {
      initSoundblocks(items)
        .forEach((item) => {
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
