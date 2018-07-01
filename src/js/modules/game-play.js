import vrLayer from '../components/vr-layer'
import vrButton from '../components/vr-button'
import vrText from '../components/vr-text'
import game from '../components/game'
import pubsub from './pubsub'

const instance = {}

// Private vars
let intro

// Private methods
const buildIntro = () => new Promise((resolve, reject) => {
  let introLayer = vrLayer()

  vrText({
    text: 'Music Puzzle'
  })
    .then((title) => {
      title.position.y += 0.5
      introLayer.addToLayer(title)

      return vrButton({
        text: 'PLAY!',
        id: 'play'
      })
    })
    .then((button) => {
      button.position.y += 0.1
      introLayer.addToLayerSelectable(button)

      resolve(introLayer)
    })
})

const startGame = () => {
  intro.hide()
  game()
}

const onClickObject = (object) => {
  if (object.hasOwnProperty('buttonId')) {
    if (object.buttonId === 'play') {
      startGame()
    }

    // if (object.buttonId === 'newgame') {
    //   currentGame.destroy()
    //   startGame()
    // }
  }
}

// Public methods
instance.init = (options = {}) => {
  buildIntro()
    .then((object) => {
      intro = object
      intro.show()
    })

  // Subscriptions
  pubsub.on('vrcontroller.clickobject', onClickObject)
  pubsub.on('game.newgame', () => {
    startGame()
  })

  return instance
}

export default instance
