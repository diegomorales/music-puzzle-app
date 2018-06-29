import vrLayer from '../components/vr-layer'
import vrButton from '../components/vr-button'
import vrText from '../components/vr-text'

const instance = {}

// Private vars

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
        text: 'PLAY!'
      })
    })
    .then((button) => {
      button.position.y += 0.1
      introLayer.addToLayerSelectable(button)

      resolve(introLayer)
    })
})

// Public methods
instance.init = (options = {}) => {
  Promise.all([buildIntro()])
    .then((objects) => {
      objects[0].show()
    })

  return instance
}

export default instance
