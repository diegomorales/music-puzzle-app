import appSettings from '../app-settings'
import gameConfigs from '../game-configs'
import soundblock from './soundblock'
import audioSprite from './audio-sprite'
import global from '../modules/global'
import pubsub from '../modules/pubsub'
import { find, shuffle, compose, toGrid } from '../util/zorro'

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
  let sound

  // Private methods
  const prepareSoundblocks = (blocks) => {
    // Give each block an index
    for (let i = 0; i < blocks.length; i++) {
      blocks[i]._mp_index = i
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
    object.position.y = toGrid(object.position.y, settings.game.gridSize)
    object.position.z = appSettings.mainZ
    object.rotation.x = 0
    object.rotation.y = 0
    object.rotation.z = 0
  }

  const playSoundblock = () => {

  }

  const run = () => {
    subscriptions = [
      pubsub.on('vrcontroller.releaseobject', snapToGrid),
      pubsub.on('vrcontroller.clickobject', playSoundblock)
    ]
  }

  // Public methods
  instance.destroy = () => {
    for (let i = subscriptions.length; i--;) {
      pubsub.off(subscriptions[i])
    }
  }

  // Create as many soundblocks as defined in current game settings.
  for (let i = settings.game.count; i--;) {
    promises.push(soundblock({
      gridSize: settings.game.gridSize
    }))
  }

  promises.push(audioSprite())

  // Helper function
  initSoundblocks = compose(positionSoundblocks, prepareSoundblocks)

  // Show soundblocks
  Promise.all(promises)
    .then((items) => {
      sound = find(items, (item) => item.type === 'audioSprite')
      soundblocks = initSoundblocks(items.filter((item) => item.name === 'soundblock'))

      soundblocks.forEach((block) => {
        global.selectables.add(block)
      })

      run()
    })

  return instance
}
