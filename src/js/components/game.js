import * as THREE from 'three'
import appSettings from '../app-settings'
import gameConfigs from '../game-configs'
import soundblock from './soundblock'
import audioSprite from './audio-sprite'
import vrLayer from '../components/vr-layer'
import vrButton from '../components/vr-button'
import vrText from '../components/vr-text'
import global from '../modules/global'
import pubsub from '../modules/pubsub'
import { find, shuffle, compose, toGrid } from '../util/zorro'

import uniqBy from 'lodash/uniqBy'

const defaults = {
  difficulty: 'easy',
  category: 'sequence'
}

export default (options = {}) => {
  const instance = {}
  const settings = Object.assign({}, defaults, options)
  settings.game = gameConfigs[settings.difficulty]

  // Private vars
  let soundblocks
  let promises = []
  let initSoundblocks
  let subscriptions = []
  let sprite
  let trackWireframe
  let trackGeometry
  let trackMaterial
  let track
  let winLayer

  // Private methods
  const prepareSoundblocks = (blocks) => {
    // Give each block an index
    for (let i = 0; i < blocks.length; i++) {
      blocks[i].spriteIndex = i
      blocks[i].isDraggable = true
    }

    // Shuffle and return it
    return shuffle(blocks)
  }

  const positionSoundblocks = (blocks) => {
    let gridSize = settings.game.gridSize
    let offset = (blocks.length - 1) / 2

    for (let i = 0; i < blocks.length; i++) {
      blocks[i].position.x = -(offset * (2 * gridSize)) + (i * (2 * gridSize))
    }

    return blocks
  }

  const snapToGrid = (object) => {
    object.position.x = toGrid(object.position.x, settings.game.gridSize)
    object.position.y = toGrid(object.position.y, settings.game.gridSize, appSettings.perceivedCenterY % settings.game.gridSize)
    object.position.z = appSettings.mainZ
    object.rotation.x = 0
    object.rotation.y = 0
    object.rotation.z = 0

    requestAnimationFrame(checkResult)
  }

  const playSoundblock = (object) => {
    sprite.play(Number(object.spriteIndex))
  }

  const checkResult = () => {
    let origin = new THREE.Vector3(-0.5, appSettings.perceivedCenterY + (2 * settings.game.gridSize), appSettings.mainZ + 0.02)
    let direction = new THREE.Vector3(1, 0, 0)
    let ray = new THREE.Raycaster(origin, direction.normalize())

    requestAnimationFrame(() => {
      let intersections = ray.intersectObjects(global.selectables.children)

      // get only soundblocks
      intersections = uniqBy(intersections, (i) => i.object.spriteIndex)

      if (intersections.length < settings.game.count) {
        return
      }

      for (let i = 0; i < intersections.length; i++) {
        if (Number(intersections[i].object.spriteIndex) !== i) {
          // Order is not correct. stop
          return
        }
      }

      // Order is correct!!
      // Play entire clip
      global.scene.background = new THREE.Color(0xe3ffe3)
      // global.selectables.remove(...soundblocks)
      // global.scene.add(...soundblocks)
      sprite.play()
      winLayer.show()
    })
  }

  const addTrack = () => {
    trackGeometry = new THREE.BoxBufferGeometry(settings.game.count * settings.game.gridSize, settings.game.gridSize, settings.game.gridSize)
    trackWireframe = new THREE.EdgesGeometry(trackGeometry)
    trackMaterial = new THREE.LineBasicMaterial({
      color: 0x999999
    })

    track = new THREE.LineSegments(trackWireframe, trackMaterial)

    // Position track
    track.position.x = 0
    track.position.y = appSettings.perceivedCenterY + (2 * settings.game.gridSize)
    track.position.z = appSettings.mainZ
    global.scene.add(track)
  }

  const handleButtonClick = (object) => {
    if (object.buttonId === 'newgame') {
      instance.destroy()
    }
  }

  const onClickObject = (object) => {
    if (object.name === 'soundblock') {
      playSoundblock(object)
      return
    }

    if (object.name === 'button') {
      handleButtonClick(object)
    }
  }

  const run = () => {
    subscriptions = [
      pubsub.on('vrcontroller.releaseobject', snapToGrid),
      pubsub.on('vrcontroller.clickobject', onClickObject)
    ]
  }

  // Public methods
  instance.destroy = () => {
    for (let i = subscriptions.length; i--;) {
      pubsub.off(subscriptions[i])
    }

    sprite.stop()
    winLayer.hide()
    global.scene.remove(track)
    global.selectables.remove(...soundblocks)
    setTimeout(() => {
      pubsub.trigger('game.newgame')
    }, 100)
  }

  // Create as many soundblocks as defined in current game settings.
  for (let i = settings.game.count; i--;) {
    promises.push(soundblock({
      gridSize: settings.game.gridSize
    }))
  }

  promises.push(audioSprite({
    sections: settings.game.count
  }))

  // Helper function
  initSoundblocks = compose(positionSoundblocks, prepareSoundblocks)

  // Show soundblocks
  Promise.all(promises)
    .then((items) => {
      sprite = find(items, (item) => item.type === 'audioSprite')
      soundblocks = initSoundblocks(items.filter((item) => item.name === 'soundblock'))

      soundblocks.forEach((block) => {
        global.selectables.add(block)
      })

      addTrack()
      run()
    })

  // Win message
  winLayer = vrLayer()
  vrText({text: 'You solved it!'})
    .then((text) => {
      text.position.y += 0.55
      winLayer.addToLayer(text)

      return vrButton({
        text: 'New Game',
        id: 'newgame'
      })
    })
    .then((button) => {
      winLayer.addToLayerSelectable(button)
    })

  return instance
}
